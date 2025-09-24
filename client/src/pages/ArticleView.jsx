import { useState, useEffect } from 'react'

export default function ArticleView() {
  const [articles, setArticles] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch('http://localhost:5000/articles')
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error('Error fetching articles:', err))
  }, [])

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase()) ||
    article.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Top controls */}
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 px-4 py-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + New Document
        </button>
      </div>

      {/* Filters and sorting */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <span>Category: <select className="border px-2 py-1 rounded"><option>All</option></select></span>
        <span>Tags: <select className="border px-2 py-1 rounded"><option>All</option></select></span>
        <span>Date Updated: <select className="border px-2 py-1 rounded"><option>Any</option></select></span>
        <span>Sort by: <select className="border px-2 py-1 rounded"><option>Relevance</option></select></span>
      </div>

      {/* Article cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{article.content}</p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              {article.tags.map((tag) => (
                <span key={tag} className="bg-gray-200 px-2 py-1 rounded">{tag}</span>
              ))}
              <span className="ml-auto">Updated: {new Date(article.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (static for now) */}
      <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
        <button className="px-3 py-1 border rounded">← Prev</button>
        <span>Page 1 of 1</span>
        <button className="px-3 py-1 border rounded">Next →</button>
      </div>
    </div>
  )
}
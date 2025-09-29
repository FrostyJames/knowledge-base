import { useState, useEffect } from 'react';

export default function ArticleView() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formTags, setFormTags] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    fetch('http://localhost:5000/articles')
      .then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then(data => setArticles(data))
      .catch(err => console.error('Error fetching articles:', err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/articles/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetchArticles())
      .catch(err => console.error('Error deleting article:', err));
  };

  const handleEdit = (id) => {
    const payload = {
      title: newTitle.trim(),
      content: newContent.trim(),
      category_id: formCategory ? parseInt(formCategory) : null,
      tags: formTags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    fetch(`http://localhost:5000/articles/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(() => {
        setEditingId(null);
        setNewTitle("");
        setNewContent("");
        setFormCategory("");
        setFormTags("");
        fetchArticles();
      })
      .catch(err => console.error('Error editing article:', err));
  };

  const handleCreate = () => {
    const trimmedTitle = formTitle.trim();
    const trimmedContent = formContent.trim();

    if (!trimmedTitle || !trimmedContent) {
      alert("⚠️ Title and content are required.");
      return;
    }

    const payload = {
      title: trimmedTitle,
      content: trimmedContent,
      category_id: formCategory ? parseInt(formCategory) : null,
      tags: formTags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    fetch('http://localhost:5000/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(() => {
        setShowForm(false);
        setFormTitle("");
        setFormContent("");
        setFormCategory("");
        setFormTags("");
        fetchArticles();
      })
      .catch(err => console.error('Error creating article:', err));
  };

  const filteredArticles = articles.filter(article =>
    article.title?.toLowerCase().includes(search.toLowerCase()) ||
    article.content?.toLowerCase().includes(search.toLowerCase())
  );

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
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Article
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="bg-gray-50 p-4 rounded shadow space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            placeholder="Content"
            value={formContent}
            onChange={(e) => setFormContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Category ID"
            value={formCategory}
            onChange={(e) => setFormCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={formTags}
            onChange={(e) => setFormTags(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <button
            onClick={handleCreate}
            disabled={!formTitle.trim() || !formContent.trim()}
            className={`px-4 py-2 rounded ${
              formTitle.trim() && formContent.trim()
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit Article
          </button>
        </div>
      )}

      {/* Article cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white p-4 rounded shadow space-y-2">
            {editingId === article.id ? (
              <>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Category ID"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Tags (comma-separated)"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
                <button onClick={() => handleEdit(article.id)} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                <button onClick={() => {
                  setEditingId(null);
                  setNewTitle("");
                  setNewContent("");
                  setFormCategory("");
                  setFormTags("");
                }} className="text-gray-500 px-3 py-1">Cancel</button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.content}</p>
                <p className="text-xs text-gray-500">
                  <strong>Author:</strong> {article.author || "Unknown"} | <strong>Category:</strong> {article.category || "Uncategorized"}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  {(article.tags || []).filter(tag => tag.trim()).map(tag => (
                    <span key={tag} className="bg-gray-200 px-2 py-1 rounded">{tag}</span>
                  ))}
                  <span className="ml-auto">Created: {new Date(article.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => {
                    setEditingId(article.id);
                    setNewTitle(article.title);
                    setNewContent(article.content);
                    setFormCategory(article.category_id?.toString() || "");
                    setFormTags((article.tags || []).join(', '));
                  }} className="text-blue-600 text-sm">Edit</button>
                  <button onClick={() => handleDelete(article.id)} className="text-red-600 text-sm">Delete</button>
                </div>
              </>
            )}
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
  );
}
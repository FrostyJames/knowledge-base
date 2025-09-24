import { useState } from 'react'

const articles = [
  {
    title: "New Employee Onboarding Checklist",
    description: "Steps and resources to onboard a new employee.",
    tags: ["HR", "Team"],
    updated: "2 weeks ago",
  },
  {
    title: "Workspace Setup Guide for New Employees",
    description: "Guide to setting up software, hardware, and tools.",
    tags: ["IT"],
    updated: "3 months ago",
  },
  {
    title: "Team Introduction Best Practices",
    description: "How to introduce new employees to the team.",
    tags: ["HR", "Team"],
    updated: "4 months ago",
  },
  {
    title: "30-60-90 Day Plan Template",
    description: "Template for onboarding goals and milestones.",
    tags: ["Planning"],
    updated: "4 months ago",
  },
]

export default function ArticleView() {
  const [search, setSearch] = useState("")

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
        {articles.map((article, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{article.description}</p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              {article.tags.map((tag) => (
                <span key={tag} className="bg-gray-200 px-2 py-1 rounded">{tag}</span>
              ))}
              <span className="ml-auto">Updated: {article.updated}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
        <button className="px-3 py-1 border rounded">← Prev</button>
        <span>Page 2 of 10</span>
        <button className="px-3 py-1 border rounded">Next →</button>
      </div>
    </div>
  )
}
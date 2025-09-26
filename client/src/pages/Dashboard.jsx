import { useState, useEffect } from 'react';
import seedData from '../data/seed.json';

export default function Dashboard({ searchTerm }) {
  const [documents, setDocuments] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setDocuments(seedData.documents);
    setArticles(seedData.articles);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'mp4': return '🎥';
      default: return '📎';
    }
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArticles = articles.filter((art) =>
    art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-full">
      <h2 className="text-2xl font-bold mb-6">Hospital Dashboard</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Documents</h3>
        {filteredDocuments.length === 0 ? (
          <p>No matching documents found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
                <h4 className="text-lg font-semibold mb-2">
                  {getIcon(doc.media_type)} {doc.title}
                </h4>
                <p className="text-sm text-gray-400">{doc.media_type.toUpperCase()}</p>
                <a href={doc.url} className="text-indigo-400 hover:underline text-sm">{doc.filename}</a>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Articles</h3>
        {filteredArticles.length === 0 ? (
          <p>No matching articles found.</p>
        ) : (
          <ul className="space-y-3">
            {filteredArticles.map((art) => (
              <li key={art.id} className="bg-gray-800 p-3 rounded shadow hover:shadow-lg transition">
                <strong>{art.title}</strong> — <span className="text-gray-400">{art.category}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

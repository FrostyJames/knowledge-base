import React, { useEffect, useState } from 'react';

const BASE_URL = 'https://knowledge-base-production-543f.up.railway.app';

export default function Dashboard({ searchTerm = '' }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/documents`)
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching documents:', err);
        setLoading(false);
      });
  }, []);

  const getIcon = (type = '') => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'docx': return '📁';
      case 'mp4':
      case 'mov': return '🎥';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return '🖼️';
      default: return '📎';
    }
  };

  const safeSearch = searchTerm.toLowerCase();
  const filteredDocuments = documents.filter((doc) => {
    const title = doc.title ?? '';
    const filename = doc.filename ?? '';
    return title.toLowerCase().includes(safeSearch) || filename.toLowerCase().includes(safeSearch);
  });

  return (
    <div className="p-6">
      {/* Hero Banner */}
      <div className="relative w-full h-52 mb-10 rounded-xl overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1920&q=80"
          alt="Knowledge Center background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-700 bg-opacity-80 flex flex-col justify-center px-5 text-white">
          <h2 className="text-4xl font-bold flex items-center gap-2 drop-shadow-lg">📚 Knowledge Center</h2>
          <p className="text-sm mt-1 drop-shadow-md">Explore your curated media and documents</p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          <span className="ml-3 text-gray-600">Loading documents...</span>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <p className="text-gray-600 text-center">No matching documents found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocuments.map((doc, index) => (
            <div
              key={`${doc.article_id}-${doc.filename}-${index}`}
              className="bg-white/70 backdrop-blur-md rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">{getIcon(doc.media_type)}</span> {doc.title ?? 'Untitled'}
              </h3>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                {doc.media_type ?? 'unknown'}
              </p>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                {doc.filename ?? 'Unnamed file'}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
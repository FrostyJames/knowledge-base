import React, { useEffect, useState } from 'react';

export default function Dashboard({ searchTerm }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/documents')
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

  const getIcon = (type) => {
    switch (type) {
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

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {loading ? (
        <p className="text-gray-600">Loading documents...</p>
      ) : filteredDocuments.length === 0 ? (
        <p className="text-gray-600">No matching documents found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={`${doc.article_id}-${doc.filename}`} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">
                {getIcon(doc.media_type)} {doc.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{doc.media_type.toUpperCase()}</p>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                {doc.filename}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
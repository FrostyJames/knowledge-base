import React, { useEffect, useState } from 'react';

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDoc, setNewDoc] = useState({
    article_id: '',
    media_type: '',
    url: ''
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
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
  };

  const handleAdd = () => {
    const { article_id, media_type, url } = newDoc;
    if (!article_id || !media_type || !url) return;

    fetch('http://localhost:5000/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        article_id,
        media_type,
        url,
        metadata_json: { description: 'Linked via URL' }
      })
    })
      .then((res) => res.json())
      .then(() => {
        setNewDoc({ article_id: '', media_type: '', url: '' });
        fetchDocuments();
      })
      .catch((err) => console.error('Upload failed:', err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/media/${id}`, { method: 'DELETE' })
      .then(() => fetchDocuments())
      .catch((err) => console.error('Delete failed:', err));
  };

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

  return (
    <div className="h-full w-full bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Documents</h2>

      {/* Add New Document */}
      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Article ID"
          value={newDoc.article_id}
          onChange={(e) => setNewDoc({ ...newDoc, article_id: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Media Type (pdf, mp4, etc)"
          value={newDoc.media_type}
          onChange={(e) => setNewDoc({ ...newDoc, media_type: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Media URL (e.g. https://...)"
          value={newDoc.url}
          onChange={(e) => setNewDoc({ ...newDoc, url: e.target.value })}
          className="border p-2 w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!newDoc.article_id || !newDoc.media_type || !newDoc.url}
        >
          Add Document
        </button>
      </div>

      {/* Document List */}
      {loading ? (
        <p>Loading...</p>
      ) : documents.length === 0 ? (
        <p className="text-gray-600">No documents found.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li key={`${doc.article_id}-${doc.filename}`} className="flex justify-between items-center border-b pb-2">
              <div>
                <span className="text-2xl mr-2">{getIcon(doc.media_type)}</span>
                <strong>{doc.title}</strong> — {doc.media_type.toUpperCase()}
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:underline"
                >
                  {doc.filename}
                </a>
              </div>
              <button
                onClick={() => handleDelete(doc.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
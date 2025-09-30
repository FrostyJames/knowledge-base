import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://knowledge-base-production-543f.up.railway.app';

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
    axios.get(`${BASE_URL}/documents`)
      .then((res) => {
        setDocuments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching documents:', err.message);
        setLoading(false);
      });
  };

  const handleAdd = () => {
    const { article_id, media_type, url } = newDoc;
    if (!article_id || !media_type || !url) return;

    axios.post(`${BASE_URL}/media`, {
      article_id,
      media_type,
      url,
      metadata_json: { description: 'Linked via URL' }
    })
      .then(() => {
        setNewDoc({ article_id: '', media_type: '', url: '' });
        fetchDocuments();
      })
      .catch((err) => {
        console.error('Upload failed:', err.message);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/media/${id}`)
      .then(fetchDocuments)
      .catch((err) => {
        console.error('Delete failed:', err.message);
      });
  };

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

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow flex justify-between items-center">
        <h2 className="text-2xl font-bold">📁 Documents</h2>
        <span className="text-sm opacity-80">Manage linked media files</span>
      </div>

      {/* Add New Document */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow space-y-4 border border-gray-200">
        <input
          type="text"
          placeholder="Article ID"
          value={newDoc.article_id}
          onChange={(e) => setNewDoc({ ...newDoc, article_id: e.target.value })}
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Media Type (pdf, mp4, etc)"
          value={newDoc.media_type}
          onChange={(e) => setNewDoc({ ...newDoc, media_type: e.target.value })}
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Media URL (e.g. https://...)"
          value={newDoc.url}
          onChange={(e) => setNewDoc({ ...newDoc, url: e.target.value })}
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleAdd}
          disabled={!newDoc.article_id || !newDoc.media_type || !newDoc.url}
          className={`px-4 py-2 rounded font-semibold ${
            newDoc.article_id && newDoc.media_type && newDoc.url
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Add Document
        </button>
      </div>

      {/* Document List */}
      {loading ? (
        <p className="text-gray-500">Loading documents...</p>
      ) : documents.length === 0 ? (
        <p className="text-gray-600">No documents found.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc, index) => (
            <li
              key={`doc-${doc.id ?? index}`}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-2xl">{getIcon(doc.media_type)}</span>
                <div>
                  <strong className="text-gray-800">{doc.title ?? 'Untitled'}</strong>{' '}
                  <span className="text-xs text-gray-500">({(doc.media_type ?? 'unknown').toUpperCase()})</span>
                  <br />
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {doc.filename ?? 'Unnamed file'}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleDelete(doc.id)}
                className="text-red-600 hover:underline text-sm"
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
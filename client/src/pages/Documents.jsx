import { useState, useEffect } from 'react';
import seedData from '../data/seed.json';
import Modal from '../components/Modal';

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({ title: '', filename: '', media_type: '', url: '' });

  useEffect(() => setDocuments(seedData.documents), []);

  const handleAdd = () => {
    setDocuments([...documents, { id: documents.length + 1, ...newDoc }]);
    setNewDoc({ title: '', filename: '', media_type: '', url: '' });
    setIsModalOpen(false);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'mp4': return '🎥';
      default: return '📎';
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Documents</h2>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Document
        </button>
      </div>

      <ul className="space-y-4">
        {documents.map((doc) => (
          <li key={doc.id} className="flex justify-between items-center bg-gray-800 p-3 rounded shadow hover:shadow-lg transition">
            <div>
              {getIcon(doc.media_type)} <strong>{doc.title}</strong> — {doc.media_type.toUpperCase()}
              <a href={doc.url} className="ml-2 text-indigo-400 hover:underline">{doc.filename}</a>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Document">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={newDoc.title}
            onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
            className="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-600"
          />
          <input
            type="text"
            placeholder="Filename"
            value={newDoc.filename}
            onChange={(e) => setNewDoc({ ...newDoc, filename: e.target.value })}
            className="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-600"
          />
          <input
            type="text"
            placeholder="Media Type (pdf, mp4)"
            value={newDoc.media_type}
            onChange={(e) => setNewDoc({ ...newDoc, media_type: e.target.value })}
            className="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-600"
          />
          <input
            type="text"
            placeholder="URL"
            value={newDoc.url}
            onChange={(e) => setNewDoc({ ...newDoc, url: e.target.value })}
            className="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-600"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

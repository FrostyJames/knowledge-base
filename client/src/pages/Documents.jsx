import React, { useEffect, useState } from 'react';

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDoc, setNewDoc] = useState({
    article_id: '',
    media_type: '',
    url: ''
  });
  const [isAdding, setIsAdding] = useState(false);

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

  const handleAdd = async () => {
    const { article_id, media_type, url } = newDoc;
    if (!article_id || !media_type || !url) return;

    setIsAdding(true);
    try {
      const response = await fetch('http://localhost:5000/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article_id,
          media_type,
          url,
          metadata_json: { description: 'Linked via URL' }
        })
      });

      if (!response.ok) throw new Error('Upload failed');
      
      setNewDoc({ article_id: '', media_type: '', url: '' });
      fetchDocuments();
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;
    
    try {
      await fetch(`http://localhost:5000/media/${id}`, { method: 'DELETE' });
      fetchDocuments();
    } catch (err) {
      console.error('Delete failed:', err);
    }
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

  const getTypeColor = (type) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-800';
      case 'docx': return 'bg-blue-100 text-blue-800';
      case 'mp4':
      case 'mov': return 'bg-purple-100 text-purple-800';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Library</h1>
          <p className="text-gray-600">Manage and organize your media files</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Add Document Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Add New Document
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Article ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter article ID..."
                    value={newDoc.article_id}
                    onChange={(e) => setNewDoc({ ...newDoc, article_id: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Media Type
                  </label>
                  <select
                    value={newDoc.media_type}
                    onChange={(e) => setNewDoc({ ...newDoc, media_type: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select type...</option>
                    <option value="pdf">PDF</option>
                    <option value="docx">Word Document</option>
                    <option value="mp4">Video (MP4)</option>
                    <option value="mov">Video (MOV)</option>
                    <option value="jpg">Image (JPG)</option>
                    <option value="png">Image (PNG)</option>
                    <option value="gif">Image (GIF)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Media URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com/document.pdf"
                    value={newDoc.url}
                    onChange={(e) => setNewDoc({ ...newDoc, url: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <button
                  onClick={handleAdd}
                  disabled={!newDoc.article_id || !newDoc.media_type || !newDoc.url || isAdding}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {isAdding ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Document...
                    </span>
                  ) : (
                    'Add Document'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Document List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Documents ({documents.length})
                </h2>
                
                <button
                  onClick={fetchDocuments}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : documents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📁</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                  <p className="text-gray-500">Get started by adding your first document</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {documents.map((doc) => (
                    <div
                      key={`${doc.article_id}-${doc.filename}`}
                      className="group border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="text-3xl p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-200">
                            {getIcon(doc.media_type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {doc.title}
                              </h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(doc.media_type)}`}>
                                {doc.media_type.toUpperCase()}
                              </span>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-2">
                              Article ID: {doc.article_id}
                            </p>
                            
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              {doc.filename}
                            </a>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ml-2"
                          title="Delete document"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
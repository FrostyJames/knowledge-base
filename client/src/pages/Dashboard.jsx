import React, { useEffect, useState } from 'react';

export default function Dashboard({ searchTerm }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    byType: {}
  });

  useEffect(() => {
    fetch('http://localhost:5000/documents')
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
        calculateStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching documents:', err);
        setLoading(false);
      });
  }, []);

  const calculateStats = (docs) => {
    const byType = {};
    docs.forEach(doc => {
      byType[doc.media_type] = (byType[doc.media_type] || 0) + 1;
    });
    
    setStats({
      total: docs.length,
      byType
    });
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
      case 'pdf': return 'bg-red-100 text-red-800 border-red-200';
      case 'docx': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mp4':
      case 'mov': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeGradient = (type) => {
    switch (type) {
      case 'pdf': return 'from-red-500 to-red-600';
      case 'docx': return 'from-blue-500 to-blue-600';
      case 'mp4':
      case 'mov': return 'from-purple-500 to-purple-600';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.title?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    doc.filename?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Document Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and overview all your documents</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Documents Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>

          {/* PDF Count */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">PDF Files</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.byType.pdf || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
            </div>
          </div>

          {/* Images Count */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Images</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {(stats.byType.jpg || 0) + (stats.byType.jpeg || 0) + (stats.byType.png || 0) + (stats.byType.gif || 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🖼️</span>
              </div>
            </div>
          </div>

          {/* Videos Count */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Videos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {(stats.byType.mp4 || 0) + (stats.byType.mov || 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Documents</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {filteredDocuments.length} of {documents.length} documents
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading documents...</p>
              </div>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {documents.length === 0 ? "No documents yet" : "No matching documents found"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {documents.length === 0 
                  ? "Get started by uploading your first document" 
                  : "Try adjusting your search terms"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <div
                  key={`${doc.article_id}-${doc.filename}`}
                  className="group border border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800"
                >
                  {/* Document Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${getTypeColor(doc.media_type)} border`}>
                      {getIcon(doc.media_type)}
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(doc.media_type)} border`}>
                      {doc.media_type.toUpperCase()}
                    </span>
                  </div>

                  {/* Document Content */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {doc.title}
                    </h3>
                    
                    {doc.article_id && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Article ID: <span className="font-medium">{doc.article_id}</span>
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View File
                      </a>
                      
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                        {doc.filename}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          {!loading && documents.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Upload New
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Bulk Actions
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
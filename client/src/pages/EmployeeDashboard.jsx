import React from 'react';

export default function EmployeeDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>
      <p className="mb-4">Access knowledge base articles and resources.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Document {item}</h2>
            <p className="text-sm text-gray-600">Brief description of the document goes here.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

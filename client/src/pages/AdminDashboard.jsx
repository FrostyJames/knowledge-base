import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">Full administrative access to manage users, roles, and content.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Admin Task {item}</h2>
            <p className="text-sm text-gray-600">Administrative actions and oversight.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

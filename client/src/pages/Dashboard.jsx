export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((doc) => (
        <div key={doc} className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Document Title {doc}</h2>
          <p className="text-sm text-gray-600">Brief description of the document goes here.</p>
        </div>
      ))}
    </div>
  )
}
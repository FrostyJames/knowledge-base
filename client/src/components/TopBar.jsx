export default function TopBar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <input
        type="text"
        placeholder="search..."
        className="border rounded px-3 py-1 w-64"
      />
    </header>
  )
}
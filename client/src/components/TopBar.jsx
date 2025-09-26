export default function TopBar({ searchTerm, setSearchTerm }) {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded px-4 py-2 w-full max-w-xl focus:outline-none focus:ring focus:border-blue-300"
      />
    </header>
  );
}
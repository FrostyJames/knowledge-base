import { FiSearch } from 'react-icons/fi';

export default function TopBar({ searchTerm, setSearchTerm }) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center bg-white rounded-full px-4 py-2 shadow-lg">
        <FiSearch className="text-gray-500 text-xl mr-3" />
        <input
          type="text"
          placeholder="Search your knowledge..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
    </header>
  );
}
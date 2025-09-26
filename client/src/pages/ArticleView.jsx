import { useState, useEffect } from 'react';
import seedData from '../data/seed.json';

export default function ArticleView() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(seedData.articles);
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-full">
      <h2 className="text-2xl font-bold mb-6">Articles</h2>
      <ul className="space-y-3">
        {articles.map((art) => (
          <li key={art.id} className="bg-gray-800 p-3 rounded shadow hover:shadow-lg transition">
            <strong>{art.title}</strong> — <span className="text-gray-400">{art.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


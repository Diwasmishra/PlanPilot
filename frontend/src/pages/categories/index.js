import { useEffect, useState } from 'react';

export default function CategoriesPage() {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    fetch('http://localhost:8000/api/categories/')
      .then(res => res.json())
      .then(data => setCategories(data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/api/categories/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setName('');
    fetchCategories();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-lime-100 to-teal-100 px-6 py-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">📂 Manage Categories</h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="flex-1 border rounded px-3 py-2"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id} className="px-4 py-2 bg-green-100 rounded">{cat.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

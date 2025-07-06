import { useEffect, useState } from 'react';

export default function ContextsPage() {
  const [name, setName] = useState('');
  const [contexts, setContexts] = useState([]);

  const fetchContexts = () => {
    fetch('http://localhost:8000/api/contexts/')
      .then(res => res.json())
      .then(data => setContexts(data));
  };

  useEffect(() => {
    fetchContexts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/api/contexts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setName('');
    fetchContexts();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 px-6 py-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center text-orange-700 mb-6">🔁 Manage Context Entries</h1>
        
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter context name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="flex-1 border rounded px-3 py-2"
          />
          <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {contexts.map((ctx) => (
            <li key={ctx.id} className="px-4 py-2 bg-orange-100 rounded">{ctx.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

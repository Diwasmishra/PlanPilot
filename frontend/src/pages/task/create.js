import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateTask() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [context_text, setContextText] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        context_text,
        is_completed: false,
        completion_date: completionDate || null,
      }),
    });

    if (response.ok) {
      router.push('/task/list');
    } else {
      console.error('Failed to create task');
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center px-4 py-12 overflow-hidden">
      <SoftBlobs />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/40 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center drop-shadow">
          ➕ Create a New Task
        </h2>

        <input
          type="text"
          placeholder="Task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80 placeholder-gray-500"
          required
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80 placeholder-gray-500"
          rows={3}
        />

        <textarea
          placeholder="Paste your notes, messages, or emails here (optional)"
          value={context_text}
          onChange={(e) => setContextText(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80 placeholder-gray-500"
          rows={4}
        />

       <p className="text-2xl font-bold text-purple-900 mb-2 text-left drop-shadow">
          Set Deadline
        </p>
        <input
          type="date"
          value={completionDate}
          onChange={(e) => setCompletionDate(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80"
        />

        <button
          type="submit"
          className="w-full bg-purple-300 text-purple-900 font-semibold py-2 rounded-lg hover:bg-purple-400 transition shadow"
        >
          Create Task
        </button>
      </form>
    </main>
  );
}

function SoftBlobs() {
  return (
    <>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl animate-blob" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-300 rounded-full opacity-30 blur-3xl animate-blob animation-delay-4000" />
    </>
  );
}

import { useEffect, useState } from 'react';
import { FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import Link from 'next/link';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/tasks/')
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const markAsComplete = async (id) => {
    const res = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_completed: true }),
      
    });


    if (res.ok) {
      const updatedTask = await res.json();
      setTasks(prev => prev.map(t => (t.id === id ? updatedTask : t)));
    }
  };

  const deleteTask = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    const res = await fetch(`http://localhost:8000/api/tasks/${id}/`, { method: 'DELETE' });

    if (res.ok) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 px-6 py-12 overflow-hidden">
      <SoftBlobs />

      <div className="relative z-10 max-w-4xl mx-auto bg-white/40 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10">
        <h1 className="text-4xl font-bold text-purple-900 mb-6 text-center drop-shadow">📝 Your Task List</h1>

        {loading ? (
          <div className="text-center text-gray-600 text-lg">Loading your tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-700 text-lg">
            <p className="mb-4">No tasks found. Add your first task!</p>
            <Link href="/task/create" className="text-blue-600 hover:underline text-base">➕ Create Task</Link>
          </div>
        ) : (
          <ul className="space-y-6">
            {tasks.map((task) => (
              <li key={task.id} className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200">
                <div className="flex justify-between items-start gap-4 flex-col sm:flex-row">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{task.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{task.description || 'No description'}</p>
                    <div className="mt-3 space-y-1 text-sm text-gray-500">
                      <p>Context: {task.context_name || 'None'}</p>
                      <p>Category: {task.category_name || 'None'}</p>
                      <p>Priority: <PriorityBadge priority={task.priority || "Low"} /></p>
                      <p>Completion Deadline: {task.completion_date || 'Not set'}</p>
                    </div>

                    <div className="mt-4 flex gap-3 flex-wrap">
                      {!task.is_completed && (
                        <>
                          <button onClick={() => markAsComplete(task.id)} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200">
                            ✅ Mark as Complete
                          </button>
                          <Link href={`/task/edit/${task.id}`}>
                            <button className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                              ✏️ Edit
                            </button>
                          </Link>
                        </>
                      )}
                      <button onClick={() => deleteTask(task.id)} className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200">
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                  <StatusBadge completed={task.is_completed} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function StatusBadge({ completed }) {
  return (
    <span className={`flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full ${completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
      {completed ? <FaCheckCircle className="text-green-500" /> : <FaHourglassHalf className="text-yellow-500" />}
      {completed ? 'Completed' : 'Pending'}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const base = 'inline-block text-xs font-semibold px-2 py-1 rounded-full';
  const colors = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-green-100 text-green-700',
  };
  return <span className={`${base} ${colors[priority] || 'bg-gray-200 text-gray-600'}`}>{priority || 'None'}</span>;
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

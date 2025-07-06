import Link from 'next/link'
import { FaListAlt, FaPlus } from 'react-icons/fa'

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 overflow-hidden">
      {/* Abstract Blobs */}
      <SoftBlobs />

      {/* Glass Panel */}
      <div className="relative z-10 bg-white/40 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-4xl">
        <h1 className="text-5xl font-extrabold text-center text-purple-900 drop-shadow mb-4">Plan Pilot</h1>
        <p className="text-center text-gray-700 mb-10 text-lg">Organize intelligently. Prioritize smartly. ✨</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           <Card
            icon={<FaPlus />}
            label="Add Task"
            href="/task/create"
            color="bg-gradient-to-r from-green-100 to-teal-200"
          />
          <Card
            icon={<FaListAlt />}
            label="View Tasks"
            href="/task/list"
            color="bg-gradient-to-r from-indigo-100 to-purple-200"
          />
         
        </div>
      </div>
    </main>
  )
}

function Card({ icon, label, href, color }) {
  return (
    <Link href={href} className={`group flex items-center gap-4 p-5 rounded-xl text-gray-800 ${color} shadow-sm hover:shadow-md transition-transform hover:scale-105`}>
      <div className="bg-white/50 p-3 rounded-full text-xl shadow-sm group-hover:rotate-6 transition-transform duration-300">
        {icon}
      </div>
      <span className="text-lg font-semibold tracking-wide">{label}</span>
    </Link>
  )
}

function SoftBlobs() {
  return (
    <>
      <div className="absolute -top-20 -left-32 w-96 h-96 bg-purple-300 opacity-30 blur-3xl rounded-full animate-blob" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-200 opacity-30 blur-3xl rounded-full animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-indigo-300 opacity-30 blur-3xl rounded-full animate-blob animation-delay-4000" />
    </>
  )
}

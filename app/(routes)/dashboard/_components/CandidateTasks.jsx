'use client';

import { useRouter } from 'next/navigation';

export default function CandidateTasks() {
  const router = useRouter();

  const tasks = [
    { id: 'resume-assessment', name: 'Resume Assessment', status: 'completed' },
    { id: 'job-criteria', name: 'Job Criteria Evaluation', status: 'pending' },
    { id: 'statistics-analysis', name: 'Statistics Analysis', status: 'in progress' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'in progress':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  };

  return (
    <div className="bg-gray-200 col-span-2 p-6 shadow-sm w-210">
      <h2 className="font-bold text-lg mb-6">Candidate Tasks</h2>

      <ul className="space-y-6">
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => router.push(`/tasks/${task.id}`)}
            className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-3 py-2 rounded transition"
          >
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${
                task.status === 'completed'
                  ? 'bg-green-600'
                  : task.status === 'pending'
                  ? 'bg-yellow-500'
                  : 'bg-blue-500'
              }`} />
              <span className="text-sm text-gray-800 font-medium">{task.name}</span>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}


'use client';

import { useState } from 'react';
import { BarChart, FileText, PieChart, Users, Filter, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CandidateDirectory() {
  const router = useRouter();

  const allItems = [
    {
      id: 'ranking',
      icon: <Share2 className="w-4 h-4" />,
      label: 'Candidate Ranking Analysis',
      tag: 'analytics',
      avatars: 2,
    },
    {
      id: 'top',
      icon: <FileText className="w-4 h-4" />,
      label: 'Top candidates AI ranked',
      tag: 'ai',
      avatars: 1,
    },
    {
      id: 'screening',
      icon: <PieChart className="w-4 h-4" />,
      label: 'AI screening process',
      tag: 'ai',
      avatars: 3,
    },
    {
      id: 'overview',
      icon: <BarChart className="w-4 h-4" />,
      label: 'Candidate analytics overview',
      tag: 'analytics',
      avatars: 3,
    },
    {
      id: 'future',
      icon: <Users className="w-4 h-4" />,
      label: 'Future talent predictions',
      tag: 'forecast',
      avatars: 2,
    },
  ];

  const [filter, setFilter] = useState(null);

  const filteredItems = filter ? allItems.filter(item => item.tag === filter) : allItems;

  return (
    <div className="bg-gray-200  p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Candidate Directory</h2>
        <button
          onClick={() => setFilter(prev => (prev ? null : 'ai'))}
          className="border border-gray-400 px-4 py-2 rounded-md text-sm hover:bg-gray-200 flex items-center gap-1"
        >
          <Filter className="w-4 h-4" />
          {filter ? 'Clear Filter' : 'AI Only'}
        </button>
      </div>

      <ul className="space-y-6">
        {filteredItems.map(item => (
          <ListItem key={item.id} {...item} onClick={() => router.push(`/candidates/${item.id}`)} />
        ))}
      </ul>
    </div>
  );
}

// Reusable ListItem inside same file
function ListItem({ icon, label, avatars = 1, onClick }) {
  return (
    <li
      className="flex justify-between items-center cursor-pointer hover:bg-white/60 px-2 py-1 rounded transition"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 text-sm">
        {icon}
        {label}
      </div>
      <div className="flex -space-x-2">
        {Array.from({ length: avatars }).map((_, i) => (
          <img
            key={i}
            src={`https://i.pravatar.cc/30?img=${i + 1}`}
            alt="avatar"
            className="w-6 h-6 rounded-full border-2 border-white"
          />
        ))}
      </div>
    </li>
  );
}

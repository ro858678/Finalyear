'use client';

import { useState } from 'react';
import { getCalendarDays } from '@/utils/useCalendar';

export default function DashboardCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const calendarDays = getCalendarDays(year, month);
  const currentDay = today.getDate();

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  return (
    <div className="bg-gray-200  p-4 max-w-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">
          {new Date(year, month).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <div className="space-x-2">
          <button onClick={prevMonth} className="text-sm bg-white border px-2 py-1 rounded">
            &lt;
          </button>
          <button onClick={nextMonth} className="text-sm bg-white border px-2 py-1 rounded">
            &gt;
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-xs text-gray-500 font-semibold mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-2 text-sm text-center">
        {calendarDays.map((day, idx) => (
          <div
            key={idx}
            className={`py-2 rounded-full ${
              day &&
              day === currentDay &&
              month === today.getMonth() &&
              year === today.getFullYear()
                ? 'bg-slate-600 text-white'
                : day
                ? 'hover:bg-gray-300'
                : ''
            }`}
          >
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
}

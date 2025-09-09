'use client';

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { formatDate } from '@fullcalendar/core';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChevronLeft } from 'lucide-react';

export default function CalendarPage() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState('recruiter');

  // Fetch user info from /api/user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user');
      const user = await res.json();
      setUserId(user.id);
      setRole(user.role);
    };
    fetchUser();
  }, []);

  // Firestore listener
  useEffect(() => {
    if (!userId) return;
    const q =
      role === 'admin'
        ? query(collection(db, 'events'))
        : query(collection(db, 'events'), where('userId', '==', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const events = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCurrentEvents(events);
    });

    return () => unsubscribe();
  }, [userId, role]);

  const handleDateClick = (selected) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleEventClick = async ({ event }) => {
    if (role !== 'admin' && event.extendedProps.userId !== userId) {
      alert('You can only delete your own events.');
      return;
    }

    if (window.confirm(`Delete "${event.title}"?`)) {
      await deleteDoc(doc(db, 'events', event.id));
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (newEventTitle && selectedDate && userId) {
      const newEvent = {
        title: newEventTitle,
        start: selectedDate.start.toISOString(),
        end: selectedDate.end?.toISOString() || selectedDate.start.toISOString(),
        allDay: selectedDate.allDay,
        userId,
      };

      await addDoc(collection(db, 'events'), newEvent);
      setNewEventTitle('');
      setIsDialogOpen(false);
    }
  };

  const router = useRouter();

  return (
     <div>
      <div className='p-4'>
      <h2 className='flex gap-2 text-xl'>
        <span
          onClick={() => router.push('/dashboard')}
          className='hover:cursor-pointer p-1'
        >
          <ChevronLeft />
        </span>
        Dashboard
      </h2>
    </div>

    <div className="flex w-full px-10 gap-8">
      <div className="w-3/12">
        <h2 className="py-10 text-2xl font-extrabold px-7">
          {role === 'admin' ? 'All Events (Admin)' : 'My Events'}
        </h2>
        <ul className="space-y-4">
          {currentEvents.length === 0 && (
            <div className="italic text-center text-gray-400">No Events Present</div>
          )}
          {currentEvents.map((event) => (
            <li key={event.id} className="border px-4 py-2 rounded-md text-blue-800">
              {event.title}
              <br />
              <span className="text-slate-950">
                {formatDate(new Date(event.start), {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-9/12 mt-8">
        <FullCalendar
          height="85vh"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable
          editable
          select={handleDateClick}
          eventClick={handleEventClick}
          events={currentEvents.map((e) => ({
            ...e,
            start: new Date(e.start),
            end: new Date(e.end),
          }))}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEvent} className="space-x-5 mb-4">
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Event Title"
              required
              className="border p-3 rounded-md text-lg"
            />
            <button type="submit" className="bg-gray-500 text-white p-3 mt-5 rounded-md">
              Add
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
}

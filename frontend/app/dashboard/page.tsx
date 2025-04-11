'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface Task { _id: string; title: string; dueDate: string; }
interface Note { _id: string; title: string; createdAt: string; }
interface VoiceNote { _id: string; title: string; createdAt: string; }

export default function DashboardHome() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ fullname: string }>({ fullname: 'User' });

  const today = format(new Date(), 'MMMM d, yyyy');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [taskRes, noteRes, voiceRes] = await Promise.all([
  //         fetch('/api/task/today'),
  //         fetch('/api/note/today'),
  //         fetch('/api/voice/today')
  //       ]);

  //       const tasksData = await taskRes.json();
  //       const notesData = await noteRes.json();
  //       const voiceData = await voiceRes.json();

  //       setTasks(tasksData);
  //       setNotes(notesData);
  //       setVoiceNotes(voiceData);

  //       // Simulate logged in user name (replace with actual logic)
  //       const u = sessionStorage.getItem('user');
  //       if (u) setUser(JSON.parse(u));
  //     } catch (err) {
  //       console.error("Dashboard load failed:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);


  useEffect(() => {
    const mockData = () => {
      // Fake user
      setUser({ fullname: 'Avani Agrawal' });
  
      // Fake tasks
      setTasks([
        { _id: '1', title: 'Finish SyncBee UI', dueDate: '2025-04-07' },
        { _id: '2', title: 'Team catchup at 6 PM', dueDate: '2025-04-07' },
      ]);
  
      // Fake notes
      setNotes([
        { _id: '1', title: 'Ideas for new features', createdAt: '2025-04-07T10:00:00Z' },
      ]);
  
      // Fake voice notes
      setVoiceNotes([
        { _id: '1', title: 'Meeting Summary', createdAt: '2025-04-07T12:00:00Z' },
      ]);
  
      setLoading(false);
    };
  
    mockData();
  }, []);
  

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  const nothingToShow = tasks.length === 0 && notes.length === 0 && voiceNotes.length === 0;

  return (
    <div className="w-full flex items-center flex-col gap-14 px-4 py-6 md:px-8">
      {/* 📅 Date */}
      <h2 className="w-full text-purple-900 text-2xl font-bold">{today}</h2>

      {/* 👋 Greeting */}
      {nothingToShow ? (
        <div className="mt-6 w-[50%] flex flex-col gap-6 justify-center">
          <h3 className="text-5xl font-bold text-purple-700">
            Hi {user.fullname} 👋
          </h3>
          
          <p className="mt-2 text-2xl text-purple-600">
            You don’t have any tasks, notes, or voice notes for today. Start by adding something!
          </p>
        </div>
      ):(
        <div className="flex flex-row gap-6">
          {/* Left: Tasks */}
          {tasks.length > 0 && (
            <div className="flex-1 bg-white/50 backdrop-blur-md rounded-xl p-5 shadow-md">
              <h3 className="text-lg font-semibold text-purple-700 mb-3">🗂 Tasks for Today</h3>
              <ul className="space-y-2">
                {tasks.map(task => (
                  <li key={task._id} className="bg-purple-100 px-4 py-2 rounded-lg">
                    {task.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Right: Notes + Voice Notes */}
          <div className="flex-1 flex flex-col gap-6">
            {notes.length > 0 && (
              <div className="bg-white/50 backdrop-blur-md rounded-xl p-5 shadow-md">
                <h3 className="text-lg font-semibold text-purple-700 mb-3">📝 Notes</h3>
                <ul className="space-y-2">
                  {notes.map(note => (
                    <li key={note._id} className="bg-purple-100 px-4 py-2 rounded-lg">
                      {note.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {voiceNotes.length > 0 && (
              <div className="bg-white/50 backdrop-blur-md rounded-xl p-5 shadow-md">
                <h3 className="text-lg font-semibold text-purple-700 mb-3">🎤 Voice Notes</h3>
                <ul className="space-y-2">
                  {voiceNotes.map(vn => (
                    <li key={vn._id} className="bg-purple-100 px-4 py-2 rounded-lg">
                      {vn.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

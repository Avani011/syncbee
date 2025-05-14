'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import TaskCard from '@/components/task/TaskCard';
import TaskDetail from '@/components/task/TaskDetail';

import NoteExpandedModal from '@/components/notes/NoteExpandedModal';
import FolderTabs from '@/components/task/FolderTabs';
import mockNotes from '@/data/mockNotes';
import { mockTasks } from '@/data/taskMock';
import NoteCard from '@/components/notes/NoteCard';
import VoiceNoteCard from '@/components/notes/VoiceNoteCard';

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

   const [selectedCategory, setSelectedCategory] = useState('work');
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
    const defaultCategories = ['work', 'personal'];
    const taskCategories = Array.from(
      new Set([...defaultCategories, ...mockTasks.map((task) => task.type)])
    );
  
    const filteredTasks = mockTasks.filter((task) => task.type === selectedCategory);
    const selectedTask = mockTasks.find((task) => task.id === selectedTaskId);

    const [expandedNote, setExpandedNote] = useState(null);

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

      setNotes(mockNotes);

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
    <div className="w-full h-full flex items-center flex-col gap-6 px-4 py-2">
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
        <div className="flex w-full h-full flex-row gap-6">
          {/* Left: Tasks */}
          {tasks.length > 0 && (
            <div className="flex-1 backdrop-blur-md rounded-xl shadow-md">
              {/* Folder Tabs at Top */}
              <FolderTabs
                categories={taskCategories}
                defaultCategory="work"
                onSelect={(cat) => {
                  setSelectedCategory(cat);
                  setSelectedTaskId(null); // Reset task detail view when changing category
                }}
              />

              {/* Task Grid */}
              <div className="flex flex-wrap gap-8 px-6 py-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div key={task.id} className="w-full">
                      <TaskCard
                        id={task.id}
                        title={task.title}
                        priority={task.priority}
                        bgColor={task.bgColor}
                        onClick={() => setSelectedTaskId(task.id)}
                      />

                      {/* Detail view for this card if selected */}
                      {selectedTaskId === task.id && (
                        <div className="mt-4">
                          <TaskDetail
                            title={task.title}
                            description={task.description}
                            priority={task.priority}
                            type={task.type}
                            subtasks={task.subtasks}
                            onEdit={() => console.log('Edit clicked')}
                            onAddSubtask={() => console.log('Add subtask')}
                          />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-purple-700 font-medium">No tasks in this category yet.</p>
                )}
              </div>
            </div>
          )}

          {/* Right: Notes + Voice Notes */}
          <div className="flex-1 flex flex-col gap-6">
            {notes.length > 0 && (
              <div className="backdrop-blur-md rounded-xl p-2 h-1/2 shadow-md overflow-auto scrollbar-hide">
                <h3 className='text-lg text-purple-900'>Notes</h3>
                <div className="flex flex-wrap gap-4 p-2">
                  {mockNotes.map((note) => (
                    <NoteCard key={note.id} note={note} onClick={() => setExpandedNote(note)}/>
                  ))}
                </div>
              </div>
            )}

            {voiceNotes.length > 0 && (
              <div className="h-1/2 backdrop-blur-md rounded-xl p-2 shadow-md overflow-auto scrollbar-hide">
                <h3 className='text-lg text-purple-900'>Voice Notes</h3>
                <VoiceNoteCard />
              </div>
            )}
          </div>

          {expandedNote && (
            <NoteExpandedModal
              note={expandedNote}
              onClose={() => setExpandedNote(null)}
            />
          )}
        </div>
      )}
    </div>
  );
}

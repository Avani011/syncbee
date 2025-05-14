import React, { useEffect, useState } from 'react';
import { fetchFocusHistory, deleteFocusSession } from '@/services/focus'; // adjust if path differs

const FocusHistory = ({
  deleteSession,
  showHistory,
  updated,
}: {
  deleteSession: (id: string) => void;
  showHistory: boolean;
  updated: boolean;
}) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  deleteSession = async (id: string) => {
    try {
      await deleteFocusSession(id);
      setHistory(prev => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("❌ Deletion failed", err);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs} sec${secs === 1 ? '' : 's'}`;
    if (secs === 0) return `${mins} min${mins === 1 ? '' : 's'}`;
    return `${mins} min${mins === 1 ? '' : 's'} ${secs} sec${secs === 1 ? '' : 's'}`;
  };
  

  useEffect(() => {
    const getTodayFocusHistory = async () => {
      try {
        const res = await fetchFocusHistory();
        console.log('📦 Raw response from backend:', res);

        setHistory(res?.data);
      } catch (err) {
        console.error('❌ Failed to fetch today’s focus sessions', err);
        setError('Failed to load sessions');
      } finally {
        setLoading(false);
      }
    };

    getTodayFocusHistory();
  }, [updated]);

  return (
    <div
      className="rounded-lg shadow-md h-full p-6 ml-4 mr-4 overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        width: showHistory ? 'calc(100% - 320px - 1rem)' : '0',
        opacity: showHistory ? 1 : 0,
        padding: showHistory ? '1.5rem' : '1.5rem 0',
        minWidth: showHistory ? '300px' : '0',
      }}
    >
      <h2 className="text-xl font-semibold text-purple-700 mb-4">Today's Sessions</h2>

      <div className="overflow-y-auto max-h-80 scrollbar-hide">
        {loading ? (
          <p>Loading sessions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : history.length === 0 ? (
          <p>No sessions yet today</p>
        ) : (
          <ul className="space-y-2">
            {history.map((session, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2">
                <p className="font-medium">⏱️ {formatDuration(session.duration)}</p>
                <button
                  onClick={() => deleteSession(session._id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {history.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h3 className="font-medium mb-2">Summary</h3>
          <div className="flex justify-between text-sm">
            <span>Total Sessions: {history.length}</span>
            <span>
              Total Time: {history.reduce((acc, h) => acc + h.duration, 0)} min
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusHistory;

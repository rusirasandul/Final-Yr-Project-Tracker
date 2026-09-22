import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from './components/TaskCard';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to load tasks', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Final Year Project Milestone Tracker</h1>
          <p className="text-slate-400 text-sm mt-1">Research Progression & Assessment Portal Dispatch</p>
          
          <div className="mt-4 bg-slate-900 border border-slate-800 p-4 rounded-lg">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Overall Progress</span>
              <span>{completedCount} of {tasks.length} Completed ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-sky-500 h-full transition-all duration-300" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>
        </header>

        {loading ? (
          <div className="text-center text-slate-500 text-sm py-12">Loading roadmap...</div>
        ) : (
          <div>
            {tasks.map(task => (
              <TaskCard key={task._id} task={task} onRefresh={fetchTasks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

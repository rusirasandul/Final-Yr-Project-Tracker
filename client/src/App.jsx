import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModuleLanding from './components/ModuleLanding';
import ModulePage from './components/ModulePage';
import { getModule } from './modules';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const readHash = () => {
  const id = window.location.hash.replace('#/', '');
  return getModule(id) ? id : null;
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moduleId, setModuleId] = useState(readHash());

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/tasks`)
      .then(res => setTasks(res.data))
      .catch(err => console.error('Failed to load tasks', err))
      .finally(() => setLoading(false));

    const onHash = () => setModuleId(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const open = (id) => { window.location.hash = `#/${id}`; };
  const back = () => { window.location.hash = ''; };

  const replaceTask = (t) => setTasks(prev => prev.map(x => x._id === t._id ? t : x));
  const removeTask = (id) => setTasks(prev => prev.filter(x => x._id !== id));
  const addTask = (t) => setTasks(prev => [...prev, t]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-8">
      {loading ? (
        <div className="text-center text-slate-500 text-sm py-12">Loading modules...</div>
      ) : moduleId ? (
        <ModulePage
          moduleId={moduleId}
          tasks={tasks}
          onBack={back}
          onTaskChange={replaceTask}
          onTaskRemove={removeTask}
          onTaskAdd={addTask}
        />
      ) : (
        <ModuleLanding tasks={tasks} onOpen={open} />
      )}
    </div>
  );
}

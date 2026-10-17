import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Plus } from 'lucide-react';
import WeekItem from './WeekItem';
import { getModule } from '../modules';
import Calendar from './Calendar';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ModulePage({ moduleId, tasks, onBack, onTaskChange, onTaskRemove, onTaskAdd }) {
  const mod = getModule(moduleId);
  const [adding, setAdding] = useState(false);
  const Icon = mod.icon;
  const unit = mod.unit || 'Week';

  const list = tasks.filter(t => t.module === moduleId).sort((a, b) => a.stepNumber - b.stepNumber);
  const started = list.filter(t => t.status !== 'Pending').length;
  const pct = list.length ? Math.round((started / list.length) * 100) : 0;

  const addWeek = async () => {
    setAdding(true);
    try {
      const res = await axios.post(`${API}/api/tasks`, {
        module: moduleId,
        title: `${unit} ${list.length + 1}`,
        category: unit
      });
      onTaskAdd(res.data);
    } finally { setAdding(false); }
  };

  const remove = async (id) => {
    await axios.delete(`${API}/api/tasks/${id}`);
    onTaskRemove(id);
  };

  return (
    <div className="max-w-4xl mx-auto fade-up">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-4 transition hover:-translate-x-0.5">
        <ArrowLeft className="w-4 h-4" /> All modules
      </button>

      <div className="glass rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative flex items-start gap-4 p-6"
          style={{ background: `linear-gradient(135deg, ${mod.from}55, ${mod.to}22)` }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${mod.from}, ${mod.to})` }}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-500 font-mono">{mod.code}.2026</div>
            <h1 className="font-bold text-lg text-white">{mod.name}</h1>
            <p className="text-xs text-slate-400">Learning resources 26-27 — track each {unit.toLowerCase()} below.</p>
            <div className="flex items-center justify-end gap-3 mt-4 text-xs text-slate-300">
              <span>{started} of {list.length} started</span>
              <div className="w-32 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${mod.from}, ${mod.to})` }} />
              </div>
            </div>
          </div>
        </div>

        {mod.assessments && (
          <div className="border-t border-slate-800 p-4 overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="text-slate-500">
                <tr><th className="pr-3 pb-1">Assessment</th><th className="pr-3 pb-1">Weight</th><th className="pr-3 pb-1">Qualifying</th><th className="pb-1">Due</th></tr>
              </thead>
              <tbody>
                {mod.assessments.map(a => (
                  <tr key={a.name} className="align-top">
                    <td className="pr-3 py-1"><div className="font-semibold text-slate-100">{a.name}</div><div className="text-slate-500">{a.note}</div></td>
                    <td className="pr-3 py-1">{a.weight}</td>
                    <td className="pr-3 py-1">{a.qualifying}</td>
                    <td className="py-1">{a.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="border-t border-slate-800 p-4">
          <Calendar tasks={list} title={`${mod.code} Calendar`} assessments />
        </div>

        <div className="border-t border-slate-800">
          {list.map(task => (
            <WeekItem key={task._id} task={task} onChange={onTaskChange} onDelete={remove} />
          ))}
        </div>

        <div className="p-3">
          <button onClick={addWeek} disabled={adding}
            className="flex items-center gap-1.5 text-xs text-sky-300 hover:text-white bg-sky-400/10 hover:bg-sky-400/20 border border-sky-400/20 rounded-lg px-3 py-2 font-semibold transition">
            <Plus className="w-4 h-4" /> Add {unit}
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';
import { ChevronDown, Folder, Circle, CircleDot, CheckCircle2, Plus, Trash2, Link2, Paperclip, X } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const NEXT = { 'Pending': 'In Progress', 'In Progress': 'Completed', 'Completed': 'Pending' };

const StatusIcon = ({ status }) => {
  if (status === 'Completed') return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
  if (status === 'In Progress') return <CircleDot className="w-5 h-5 text-amber-400" />;
  return <Circle className="w-5 h-5 text-slate-500" />;
};

export default function WeekItem({ task, onChange, onDelete }) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(task.notes || '');
  const [newAction, setNewAction] = useState('');
  const [linkLabel, setLinkLabel] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const url = `${API}/api/tasks/${task._id}`;
  const run = async (req) => {
    try { const res = await req; onChange(res.data); }
    catch (err) { console.error(err); alert(err.response?.data?.message || err.message); }
  };

  const done = task.actions.filter(a => a.isCompleted).length;
  const subtitle = task.actions.length ? `${done}/${task.actions.length} checklist items done` : 'No items yet — open to add notes, links, files and a checklist';

  return (
    <div className="border-b border-slate-800">
      <div className="flex items-start gap-3 py-4 px-2 cursor-pointer hover:bg-slate-900/60" onClick={() => setOpen(!open)}>
        <button
          title={`${task.status} — click to change`}
          onClick={(e) => { e.stopPropagation(); run(axios.patch(`${url}/status`, { status: NEXT[task.status] })); }}
          className="mt-0.5"
        >
          <StatusIcon status={task.status} />
        </button>
        <Folder className="w-5 h-5 text-slate-300 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-100">{task.title}</div>
          <div className="text-xs text-slate-400 mt-0.5">{subtitle}</div>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>

      {open && (
        <div className="px-4 pb-5 pt-1 space-y-5 text-sm bg-slate-900/40">
          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => notes !== task.notes && run(axios.patch(`${url}/notes`, { notes }))}
              placeholder="Write notes for this week..."
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Checklist */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Checklist</label>
            <ul className="space-y-1">
              {task.actions.map(a => (
                <li key={a._id} className="flex items-center gap-2 group">
                  <input type="checkbox" checked={a.isCompleted} onChange={() => run(axios.patch(`${url}/actions/${a._id}/toggle`))} />
                  <span className={a.isCompleted ? 'line-through text-slate-500' : 'text-slate-200'}>{a.label}</span>
                  <button onClick={() => run(axios.delete(`${url}/actions/${a._id}`))} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
            <form
              className="flex gap-2 mt-2"
              onSubmit={(e) => { e.preventDefault(); if (!newAction.trim()) return; run(axios.post(`${url}/actions`, { label: newAction.trim() })); setNewAction(''); }}
            >
              <input value={newAction} onChange={(e) => setNewAction(e.target.value)} placeholder="Add checklist item"
                className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500" />
              <button className="px-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"><Plus className="w-4 h-4" /></button>
            </form>
          </div>

          {/* Links */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Links</label>
            <ul className="space-y-1">
              {task.links.map(l => (
                <li key={l._id} className="flex items-center gap-2 group">
                  <Link2 className="w-3.5 h-3.5 text-sky-400" />
                  <a href={l.url} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline truncate">{l.label}</a>
                  <button onClick={() => run(axios.delete(`${url}/links/${l._id}`))} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
            <form
              className="flex flex-col sm:flex-row gap-2 mt-2"
              onSubmit={(e) => { e.preventDefault(); run(axios.post(`${url}/links`, { label: linkLabel || linkUrl, url: linkUrl })); setLinkLabel(''); setLinkUrl(''); }}
            >
              <input value={linkLabel} onChange={(e) => setLinkLabel(e.target.value)} placeholder="Label"
                className="sm:w-1/3 bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500" />
              <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://..." required type="url"
                className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500" />
              <button className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs">Add link</button>
            </form>
          </div>

          {/* Files */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Files</label>
            <ul className="space-y-1">
              {task.files.map(f => (
                <li key={f._id} className="flex items-center gap-2 group">
                  <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`${API}/uploads/${f.filename}`} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline truncate">{f.originalName}</a>
                  <button onClick={() => run(axios.delete(`${url}/files/${f._id}`))} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="file"
              className="mt-2 text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-slate-800 file:text-slate-200"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const fd = new FormData(); fd.append('file', file);
                run(axios.post(`${url}/files`, fd));
                e.target.value = '';
              }}
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => confirm(`Delete "${task.title}"?`) && onDelete(task._id)}
              className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function TaskCard({ task, onRefresh }) {
  const [submitting, setSubmitting] = useState(false);
  const [notes, setNotes] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [submissionReference, setSubmissionReference] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('notes', notes);
    formData.append('externalUrl', externalUrl);
    formData.append('submissionReference', submissionReference);
    if (file) formData.append('evidenceFile', file);

    try {
      await axios.post(`${API_BASE_URL}/api/tasks/${task._id}/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onRefresh();
    } catch (err) {
      console.error('Error submitting proof:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const isCompleted = task.status === 'Completed';

  return (
    <div className={`border rounded-lg p-5 mb-4 transition-all ${
      isCompleted ? 'bg-slate-900/60 border-emerald-500/40' : 'bg-slate-900 border-slate-800'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-500/20 text-sky-400">
            {task.category} • Step {task.stepNumber}
          </span>
          <h3 className="text-lg font-bold text-white mt-1">{task.title}</h3>
          <p className="text-sm text-slate-400 mt-1">{task.description}</p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded font-medium ${
          isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
        }`}>
          {task.status}
        </span>
      </div>

      <div className="text-xs text-slate-500 mt-3">
        Deadline: <span className="text-slate-300 font-mono">{new Date(task.deadline).toLocaleDateString()}</span>
      </div>

      {isCompleted ? (
        <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded text-xs space-y-1">
          <div className="text-emerald-400 font-semibold">✓ Submitted to Portal</div>
          <div className="text-slate-400">Ref: <span className="font-mono text-slate-200">{task.portalSubmission?.submissionReference}</span></div>
          {task.evidence?.externalUrl && (
            <div className="truncate">
              Link: <a href={task.evidence.externalUrl} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">{task.evidence.externalUrl}</a>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2 border-t border-slate-800 pt-3">
          <input
            type="text"
            placeholder="Evidence / GitHub / Overleaf URL"
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            required
          />
          <input
            type="text"
            placeholder="Portal Reference / Turnitin Receipt ID"
            value={submissionReference}
            onChange={(e) => setSubmissionReference(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            required
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-slate-800 file:text-slate-200"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-sky-600 hover:bg-sky-500 text-white rounded py-1.5 text-xs font-semibold transition"
          >
            {submitting ? 'Registering Evidence...' : 'Record Portal Submission & Complete'}
          </button>
        </form>
      )}
    </div>
  );
}

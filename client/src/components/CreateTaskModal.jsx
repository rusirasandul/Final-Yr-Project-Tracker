import React, { useState } from 'react';
import axios from 'axios';
import { X, Plus, Calendar, BookOpen, Layers } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function CreateTaskModal({ isOpen, onClose, onCreated, defaultModuleId = 'fyp', modules = [] }) {
  const [selectedModule, setSelectedModule] = useState(defaultModuleId);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [actionsText, setActionsText] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);

    // Parse actions if provided line by line
    const parsedActions = actionsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(label => ({
        label,
        category: 'compulsory',
        isCompleted: false,
        isDefault: false
      }));

    try {
      const res = await axios.post(`${API_BASE_URL}/api/tasks`, {
        module: selectedModule,
        title,
        category: category || (selectedModule === 'applied-ai' ? 'Weekly Lecture & Lab' : 'Milestone Task'),
        description,
        deadline: new Date(deadline),
        actions: parsedActions
      });

      // If actions were created, we can add them
      if (parsedActions.length > 0 && res.data?._id) {
        for (const act of parsedActions) {
          try {
            await axios.post(`${API_BASE_URL}/api/tasks/${res.data._id}/actions`, {
              label: act.label,
              category: act.category
            });
          } catch (err) {
            console.error('Action add err:', err);
          }
        }
      }

      // Reset
      setTitle('');
      setCategory('');
      setDescription('');
      setActionsText('');
      onCreated();
      onClose();
    } catch (err) {
      console.error('Failed to create task:', err);
      alert('Error creating task: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
              <Plus className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Add New Module Task / Milestone</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Target Module Selection */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              Target Academic Module
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500 font-medium"
            >
              {modules.map(mod => (
                <option key={mod.id} value={mod.id}>
                  {mod.name} ({mod.code}) — {mod.credits} UK Credits
                </option>
              ))}
            </select>
          </div>

          {/* Task Title */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              Task / Milestone Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Week 13: Transformer Fine-Tuning or Interim Evaluation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          {/* Category / Phase & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Category / Week Tag
              </label>
              <input
                type="text"
                placeholder="e.g. Lab Exercise, Coursework 1"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" /> Target Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              Description & Learning Objectives
            </label>
            <textarea
              rows={2}
              placeholder="Brief summary of required topics, deliverables, or criteria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Action Checklist (Line separated) */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
              <span>Sub-Tasks / Checklist (one per line)</span>
              <span className="text-slate-500 text-[11px] font-normal">Optional</span>
            </label>
            <textarea
              rows={3}
              placeholder="Step 1: Review lecture slides&#10;Step 2: Run Colab notebook&#10;Step 3: Complete worksheet questions"
              value={actionsText}
              onChange={(e) => setActionsText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500 font-mono text-[11px]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

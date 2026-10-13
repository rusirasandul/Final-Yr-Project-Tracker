import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { 
  ChevronDown, ChevronUp, Plus, CheckCircle2, Clock, 
  ExternalLink, BookOpen, Sparkles, Filter, Search,
  GraduationCap, Cpu, Eye, Terminal, Shield, ArrowUpRight
} from 'lucide-react';

const moduleIcons = {
  'fyp': GraduationCap,
  'applied-ai': Cpu,
  'usability-testing': Eye,
  'devops': Terminal,
  'cyber-security': Shield,
};

const moduleThemes = {
  'fyp': {
    accent: 'sky',
    border: 'border-sky-500/30',
    headerBg: 'from-sky-950/40 via-slate-900 to-slate-900/60',
    badge: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    progress: 'bg-sky-500',
    btn: 'bg-sky-600 hover:bg-sky-500',
  },
  'applied-ai': {
    accent: 'indigo',
    border: 'border-indigo-500/30',
    headerBg: 'from-indigo-950/40 via-slate-900 to-slate-900/60',
    badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    progress: 'bg-indigo-500',
    btn: 'bg-indigo-600 hover:bg-indigo-500',
  },
  'usability-testing': {
    accent: 'amber',
    border: 'border-amber-500/30',
    headerBg: 'from-amber-950/40 via-slate-900 to-slate-900/60',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    progress: 'bg-amber-500',
    btn: 'bg-amber-600 hover:bg-amber-500',
  },
  'devops': {
    accent: 'teal',
    border: 'border-teal-500/30',
    headerBg: 'from-teal-950/40 via-slate-900 to-slate-900/60',
    badge: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    progress: 'bg-teal-500',
    btn: 'bg-teal-600 hover:bg-teal-500',
  },
  'cyber-security': {
    accent: 'rose',
    border: 'border-rose-500/30',
    headerBg: 'from-rose-950/40 via-slate-900 to-slate-900/60',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    progress: 'bg-rose-500',
    btn: 'bg-rose-600 hover:bg-rose-500',
  },
};

export default function ModuleSection({ 
  moduleConfig, 
  tasks = [], 
  onRefresh, 
  onOpenAddModal 
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showRoutine, setShowRoutine] = useState(false);

  const IconComponent = moduleIcons[moduleConfig.id] || BookOpen;
  const theme = moduleThemes[moduleConfig.id] || moduleThemes['fyp'];

  // Metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Categories list
  const categories = ['All', ...Array.from(new Set(tasks.map(t => t.category).filter(Boolean)))];

  // Filtered tasks
  const filteredTasks = tasks.filter(t => {
    const matchesSearch = search === '' || 
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section 
      id={`module-${moduleConfig.id}`}
      className={`rounded-2xl border bg-slate-900/90 shadow-xl overflow-hidden mb-10 transition-all duration-300 ${theme.border}`}
    >
      {/* Section Header Banner */}
      <div className={`p-6 bg-gradient-to-r ${theme.headerBg} border-b border-slate-800`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner ${theme.badge}`}>
              <IconComponent className="w-7 h-7" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                  {moduleConfig.code}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
                  {moduleConfig.credits} UK Credits
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
                  {moduleConfig.duration}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                {moduleConfig.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                {moduleConfig.tagline}
              </p>
            </div>
          </div>

          {/* Quick Metrics & Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 self-stretch lg:self-auto justify-between lg:justify-end">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 min-w-[200px]">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-slate-400">Module Progress</span>
                <span className="font-mono font-bold text-white">{completedTasks}/{totalTasks} ({progressPercent}%)</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${theme.progress}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
                <span>⚡ {inProgressTasks} In Progress</span>
                <span>⏳ {pendingTasks} Pending</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onOpenAddModal(moduleConfig.id)}
                className={`flex-1 sm:flex-initial text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition ${theme.btn}`}
              >
                <Plus className="w-4 h-4" /> Add Task
              </button>

              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title={isCollapsed ? "Expand module section" : "Collapse module section"}
              >
                {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Applied AI Specific: Master External Resource Matrix & Weekly Workflow Tip */}
        {moduleConfig.id === 'applied-ai' && !isCollapsed && (
          <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Curated External Learning Hub & Roadmap Links
              </span>
              <button
                onClick={() => setShowRoutine(!showRoutine)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 underline self-start transition"
              >
                {showRoutine ? "Hide 4-Step Study Routine" : "View Weekly 4-Step Routine"}
              </button>
            </div>

            {/* Quick Link Pills mapped directly from the uploaded PDF */}
            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href="https://aima.cs.berkeley.edu"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/50 text-indigo-200 transition font-medium"
              >
                <span>📖 AIMA (Russell & Norvig, 4th Ed.)</span>
                <ArrowUpRight className="w-3 h-3 text-indigo-400" />
              </a>

              <a
                href="https://colab.research.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/50 text-indigo-200 transition font-medium"
              >
                <span>☁️ Google Colab Cloud GPU</span>
                <ArrowUpRight className="w-3 h-3 text-indigo-400" />
              </a>

              <a
                href="https://ai.google.dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/50 text-indigo-200 transition font-medium"
              >
                <span>✨ Google Gemini API Docs</span>
                <ArrowUpRight className="w-3 h-3 text-indigo-400" />
              </a>

              <a
                href="https://huggingface.co/learn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/50 text-indigo-200 transition font-medium"
              >
                <span>🤗 Hugging Face LLM Course</span>
                <ArrowUpRight className="w-3 h-3 text-indigo-400" />
              </a>

              <a
                href="https://scikit-learn.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/50 text-indigo-200 transition font-medium"
              >
                <span>🌲 Scikit-Learn Guide</span>
                <ArrowUpRight className="w-3 h-3 text-indigo-400" />
              </a>

              <a
                href="https://playground.tensorflow.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/50 text-indigo-200 transition font-medium"
              >
                <span>🧠 TF Neural Net Playground</span>
                <ArrowUpRight className="w-3 h-3 text-indigo-400" />
              </a>

              <a
                href="https://poloclub.github.io/cnn-explainer/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/50 text-indigo-200 transition font-medium"
              >
                <span>👁️ CNN Explainer 3D</span>
                <ArrowUpRight className="w-3 h-3 text-indigo-400" />
              </a>

              <a
                href="https://gymnasium.farama.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/50 text-indigo-200 transition font-medium"
              >
                <span>🎮 Gymnasium (OpenAI Gym)</span>
                <ArrowUpRight className="w-3 h-3 text-indigo-400" />
              </a>
            </div>

            {/* 4-Step Routine from Syllabus Sheet */}
            {showRoutine && (
              <div className="p-3 bg-slate-950/90 border border-indigo-900/40 rounded-xl text-xs space-y-2 text-slate-300">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <span>📌 Recommended Weekly 4-Step Study Routine (from Syllabus Plan):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-semibold text-white block">Step 1: Theory Review</span>
                    <span className="text-slate-400">Study primary lecture slides for mathematical definitions & algorithms.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-semibold text-white block">Step 2: Guided Lab</span>
                    <span className="text-slate-400">Run guided lab tutorials in Google Colab to build Python fluency.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-semibold text-white block">Step 3: Worksheet Exercises</span>
                    <span className="text-slate-400">Solve student worksheet problems independently; verify with solution sheets.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-semibold text-white block">Step 4: Deep Dive</span>
                    <span className="text-slate-400">Consult mapped external textbooks (AIMA, Sutton & Barto) to solidify mastery.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Body Section with Filters & Task Cards */}
      {!isCollapsed && (
        <div className="p-6">
          {/* Internal Search & Category Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder={`Search ${moduleConfig.name} tasks...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-slate-600"
              />
            </div>

            {categories.length > 2 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <span className="text-xs text-slate-500 shrink-0 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Category:
                </span>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-2.5 py-1 rounded-lg shrink-0 font-medium transition ${
                      selectedCategory === cat
                        ? `${theme.badge} font-bold`
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Task Cards List */}
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/40">
              <p className="text-slate-400 text-sm">No tasks found matching your filters.</p>
              <button
                onClick={() => onOpenAddModal(moduleConfig.id)}
                className="mt-3 text-xs text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add First Task for {moduleConfig.name}
              </button>
            </div>
          ) : (
            <div>
              {filteredTasks.map(task => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  onRefresh={onRefresh} 
                  moduleColor={theme.accent}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

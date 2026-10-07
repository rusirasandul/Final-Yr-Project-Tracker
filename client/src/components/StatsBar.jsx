import React from 'react';
import { 
  CheckCircle, Circle, Clock, FileText, Link, 
  Search, Plus, Sparkles, Filter 
} from 'lucide-react';

export default function StatsBar({ 
  tasks, 
  selectedCategory, 
  setSelectedCategory, 
  selectedStatus, 
  setSelectedStatus, 
  searchQuery, 
  setSearchQuery,
  onOpenAddModal 
}) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const overallPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Aggregate actions
  let totalActions = 0;
  let completedActions = 0;
  let compulsoryTotal = 0;
  let compulsoryCompleted = 0;
  let totalFiles = 0;
  let totalLinks = 0;

  tasks.forEach(t => {
    if (t.actions && Array.isArray(t.actions)) {
      t.actions.forEach(a => {
        totalActions++;
        if (a.isCompleted) completedActions++;
        if (a.category === 'compulsory' || a.category === 'mandatory') {
          compulsoryTotal++;
          if (a.isCompleted) compulsoryCompleted++;
        }
      });
    }
    if (t.files && Array.isArray(t.files)) totalFiles += t.files.length;
    if (t.links && Array.isArray(t.links)) totalLinks += t.links.length;
  });

  const categories = [
    'All Phases',
    'Research Formulation',
    'PPRS',
    'IPD',
    'Dissertation',
    'Viva Prep'
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: Overall Progress */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-2">
            <span>Overall Milestone Completion</span>
            <span className="text-emerald-400 font-mono font-bold">{overallPercent}%</span>
          </div>
          <div className="text-2xl font-black text-white mb-2">
            {completedTasks} <span className="text-slate-500 text-sm font-normal">/ {totalTasks} Steps</span>
          </div>
          <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Compulsory Requirements */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-2">
            <span>Compulsory & Mandatory</span>
            <span className="text-rose-400 font-mono font-bold">
              {compulsoryTotal > 0 ? Math.round((compulsoryCompleted / compulsoryTotal) * 100) : 0}%
            </span>
          </div>
          <div className="text-2xl font-black text-white mb-2">
            {compulsoryCompleted} <span className="text-slate-500 text-sm font-normal">/ {compulsoryTotal} Met</span>
          </div>
          <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-500 to-rose-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${compulsoryTotal > 0 ? (compulsoryCompleted / compulsoryTotal) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Attached Proof & Artifacts */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-2">
            <span>Artifacts & Files Uploaded</span>
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400 mb-1">
            {totalFiles} <span className="text-slate-500 text-sm font-normal">Stored Evidence</span>
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            PDFs, LaTeX sources & reports
          </div>
        </div>

        {/* Metric 4: Pinned Links */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-2">
            <span>External Research Links</span>
            <Link className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-indigo-400 mb-1">
            {totalLinks} <span className="text-slate-500 text-sm font-normal">Active Resources</span>
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            Overleaf, GitHub & Portals
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 shadow-md">
        {/* Search input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search milestone title, requirements, tags or descriptions..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
          >
            <option value="All">All Statuses ({totalTasks})</option>
            <option value="Pending">Pending ({pendingTasks})</option>
            <option value="In Progress">In Progress ({inProgressTasks})</option>
            <option value="Completed">Completed ({completedTasks})</option>
          </select>

          {/* Add New Milestone Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-600/25 transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Step</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = cat === 'All Phases' 
            ? tasks.length 
            : tasks.filter(t => t.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-medium px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

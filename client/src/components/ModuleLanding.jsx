import React from 'react';
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { MODULES } from '../modules';

export default function ModuleLanding({ tasks, onOpen }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const overall = total ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: 'Modules', value: MODULES.length, icon: Layers },
    { label: 'In progress', value: inProgress, icon: ArrowRight },
    { label: 'Completed', value: completed, icon: CheckCircle2 }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10 fade-up">
        <span className="inline-block text-[11px] tracking-widest uppercase font-semibold text-sky-300 bg-sky-400/10 border border-sky-400/20 rounded-full px-3 py-1">
          Academic Year 2026 / 27
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 gradient-text">Final Year Tracker</h1>
        <p className="text-slate-400 mt-2">Select a module to open its weekly plan, notes, links and checklist.</p>

        <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
          {stats.map(s => (
            <div key={s.label} className="glass rounded-xl px-4 py-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400"><s.icon className="w-3.5 h-3.5" />{s.label}</div>
              <div className="text-2xl font-bold text-white mt-1">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 max-w-xl">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5"><span>Overall completion</span><span>{overall}%</span></div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 transition-all duration-700" style={{ width: `${overall}%` }} />
          </div>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((mod, i) => {
          const list = tasks.filter(t => t.module === mod.id);
          const started = list.filter(t => t.status !== 'Pending').length;
          const pct = list.length ? Math.round((started / list.length) * 100) : 0;
          const Icon = mod.icon;
          return (
            <button
              key={mod.id}
              onClick={() => onOpen(mod.id)}
              style={{ animationDelay: `${i * 80}ms` }}
              className="fade-up group relative text-left glass rounded-2xl overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-slate-500/50"
            >
              <div
                className="relative h-32 flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${mod.from}, ${mod.to})` }}
              >
                <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10 blur-xl" />
                <div className="absolute -left-8 -bottom-10 w-32 h-32 rounded-full bg-black/20 blur-xl" />
                <Icon className="relative w-14 h-14 text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
              </div>
              <div className="p-5">
                <div className="text-[11px] text-slate-500 font-mono tracking-wide">{mod.code}</div>
                <div className="font-bold text-white mt-1 leading-snug text-lg">{mod.name}</div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                    <span>{started} of {list.length} started</span>
                    <span className="font-semibold text-slate-200">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${mod.from}, ${mod.to})` }} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-sky-300 group-hover:gap-2 transition-all">
                  Open module <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { MODULES } from '../modules';

export default function ModuleLanding({ tasks, onOpen }) {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Final Year Tracker</h1>
        <p className="text-slate-400 text-sm mt-1">2026 — select a module to open its weekly plan</p>
      </header>

      <h2 className="text-sm font-semibold text-slate-300 mb-3">2026</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map(mod => {
          const list = tasks.filter(t => t.module === mod.id);
          const started = list.filter(t => t.status !== 'Pending').length;
          const pct = list.length ? Math.round((started / list.length) * 100) : 0;
          const Icon = mod.icon;
          return (
            <button
              key={mod.id}
              onClick={() => onOpen(mod.id)}
              className="text-left bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-lg overflow-hidden transition shadow-lg hover:-translate-y-0.5"
            >
              <div
                className="h-28 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${mod.from}, ${mod.to})` }}
              >
                <Icon className="w-12 h-12 text-white/90" />
              </div>
              <div className="p-4">
                <div className="text-xs text-slate-500 font-mono">{mod.code}.2026</div>
                <div className="font-semibold text-white mt-1 leading-snug">MODULE: {mod.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">Open</div>
                <div className="mt-3 pt-3 border-t border-slate-800">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>{started} of {list.length} started</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

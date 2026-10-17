import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Flag } from 'lucide-react';
import { getModule } from '../modules';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const key = (d) => {
  const x = new Date(d);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
};

// Build events from tasks: task deadlines + checklist item due dates
export function buildEvents(tasks) {
  const events = [];
  tasks.forEach(t => {
    const mod = getModule(t.module);
    const color = mod?.from || '#38bdf8';
    if (t.deadline) {
      events.push({
        id: `d-${t._id}`, date: key(t.deadline), kind: 'deadline',
        title: t.title, sub: mod?.code || t.module, done: t.status === 'Completed', color
      });
    }
    (t.actions || []).forEach(a => {
      if (a.dueDate) {
        events.push({
          id: `a-${a._id}`, date: key(a.dueDate), kind: 'todo',
          title: a.label, sub: `${mod?.code || t.module} · ${t.title}`, done: a.isCompleted, color
        });
      }
    });
  });
  return events;
}

export default function Calendar({ tasks, title = 'Calendar', compact = false }) {
  const [cursor, setCursor] = useState(() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), 1); });
  const [selected, setSelected] = useState(key(new Date()));
  const events = useMemo(() => buildEvents(tasks), [tasks]);
  const byDate = useMemo(() => {
    const m = {};
    events.forEach(e => { (m[e.date] ||= []).push(e); });
    return m;
  }, [events]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const today = key(new Date());
  const shift = (n) => setCursor(new Date(year, month + n, 1));
  const dayEvents = byDate[selected] || [];

  const upcoming = events.filter(e => !e.done && e.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
  const overdue = events.filter(e => !e.done && e.date < today).length;

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-bold text-white">{title}</div>
          <div className="text-[11px] text-slate-400">
            {events.length} dated item{events.length === 1 ? '' : 's'}{overdue > 0 && <span className="text-rose-400"> · {overdue} overdue</span>}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => shift(-1)} className="p-1 rounded hover:bg-white/10 text-slate-300"><ChevronLeft className="w-4 h-4" /></button>
          <div className="text-sm font-semibold text-slate-100 w-32 text-center">
            {cursor.toLocaleString('default', { month: 'long' })} {year}
          </div>
          <button onClick={() => shift(1)} className="p-1 rounded hover:bg-white/10 text-slate-300"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wide text-slate-500 mb-1">
        {DAYS.map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const k = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const evs = byDate[k] || [];
          const isToday = k === today;
          const isSel = k === selected;
          const late = evs.some(e => !e.done) && k < today;
          return (
            <button key={i} onClick={() => setSelected(k)}
              className={`${compact ? 'h-9' : 'h-12'} rounded-lg text-xs flex flex-col items-center justify-start pt-1 transition border
                ${isSel ? 'border-sky-400 bg-sky-400/15' : 'border-transparent hover:bg-white/5'}
                ${isToday ? 'text-sky-300 font-bold' : 'text-slate-300'}`}>
              {d}
              {evs.length > 0 && (
                <div className="flex gap-0.5 mt-0.5">
                  {evs.slice(0, 3).map(e => (
                    <span key={e.id} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: e.done ? '#34d399' : late ? '#fb7185' : e.color }} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 border-t border-slate-800 pt-3 space-y-1.5">
        <div className="text-[11px] text-slate-500">{new Date(selected + 'T00:00').toDateString()}</div>
        {dayEvents.length === 0 && <div className="text-xs text-slate-500">Nothing scheduled.</div>}
        {dayEvents.map(e => (
          <div key={e.id} className="flex items-start gap-2 text-xs">
            {e.kind === 'deadline' ? <Flag className="w-3.5 h-3.5 mt-0.5" style={{ color: e.color }} />
              : e.done ? <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5 mt-0.5 text-slate-500" />}
            <div className="min-w-0">
              <div className={e.done ? 'line-through text-slate-500' : 'text-slate-100'}>{e.title}</div>
              <div className="text-slate-500">{e.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {!compact && upcoming.length > 0 && (
        <div className="mt-3 border-t border-slate-800 pt-3">
          <div className="text-[11px] text-slate-500 mb-1">Upcoming</div>
          {upcoming.map(e => (
            <div key={e.id} className="flex justify-between gap-2 text-xs text-slate-300 py-0.5">
              <span className="truncate">{e.title}</span><span className="text-slate-500 shrink-0">{e.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

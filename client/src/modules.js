import { GraduationCap, Cpu, Eye, Terminal, Shield, BookOpen } from 'lucide-react';

// Edit names / codes here. Ids must match server/modules.js.
export const MODULES = [
  { id: 'applied-ai',        code: '6COSC020C.1', name: 'Applied AI',                          icon: Cpu,           from: '#4f46e5', to: '#0ea5e9',
    assessments: [
      { name: 'Coursework', weight: '50%', qualifying: 30, due: 'Wed, 7th Jan, 1pm', note: 'Research, implement, and evaluate an AI application.' },
      { name: 'In-Class Test (Blackboard)', weight: '50%', qualifying: 30, due: 'Week 12, from 8th Dec 2025', note: 'Attend in person or seek MC. Multiple choice and short answer, covers weeks 1–11, 90 minutes.' }
    ] },
  { id: 'fyp',               code: '6COSC023C.Y', name: 'Computer Science Final Project',      icon: GraduationCap, from: '#0f172a', to: '#475569', unit: 'Milestone' },
  { id: 'usability-testing', code: '6MMCS009C.1', name: 'Usability Testing and Evaluation',    icon: Eye,           from: '#d97706', to: '#f43f5e' },
  { id: 'devops',            code: 'CODE',        name: 'DevOps',                              icon: Terminal,      from: '#0d9488', to: '#22c55e' },
  { id: 'cyber-security',    code: 'CODE',        name: 'Cyber Security',                      icon: Shield,        from: '#e11d48', to: '#7c3aed' },
  { id: 'module-6',          code: 'CODE',        name: 'Module 6 (rename in client/src/modules.js)', icon: BookOpen, from: '#2563eb', to: '#9333ea' }
];

export const getModule = (id) => MODULES.find(m => m.id === id);

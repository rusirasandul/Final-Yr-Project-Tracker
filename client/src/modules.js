import { GraduationCap, Cpu, Eye, Terminal, Shield } from 'lucide-react';

// Edit names / codes here. Ids must match server/modules.js.
export const MODULES = [
  { id: 'applied-ai',        code: '6COSC020C.1', name: 'Applied AI',                          icon: Cpu,           from: '#4f46e5', to: '#0ea5e9',
    assessments: [
      { name: 'Coursework', weight: '50%', qualifying: 30, due: 'Wed, 7th Jan, 1pm', note: 'Research, implement, and evaluate an AI application.' },
      { name: 'In-Class Test (Blackboard)', weight: '50%', qualifying: 30, due: 'Week 12, from 8th Dec 2025', note: 'Attend in person or seek MC. Multiple choice and short answer, covers weeks 1–11, 90 minutes.' }
    ] },
  { id: 'fyp',               code: '6COSC023C.Y', name: 'Computer Science Final Project',      icon: GraduationCap, from: '#0f172a', to: '#475569', unit: 'Milestone' },
  { id: 'usability-testing', code: '6MMCS009C.1', name: 'Usability Testing and Evaluation',    icon: Eye,           from: '#d97706', to: '#f43f5e',
    assessments: [
      { name: 'Group Coursework – Usability Study', weight: '40%', qualifying: '–', due: '19 Nov 2026, 1:00 pm (online)', note: 'LO1–LO3' },
      { name: 'Group Presentation – Methods & Contributions', weight: '10%', qualifying: '–', due: 'Slides 19 Nov 2026, 1:00 pm; presented 23 Nov 2026', note: '20-minute presentation. LO5' },
      { name: 'Individual Report – Statistical Analysis & Recommendations', weight: '50%', qualifying: '–', due: '6 Jan 2027, 1:00 pm (online)', note: 'LO1, LO4. Student vacation 12 Dec 2026 – 3 Jan 2027: complete the report.' }
    ] },
  { id: 'devops',            code: '6COSC022W',   name: 'Distributed Systems and DevOps Engineering', icon: Terminal, from: '#0d9488', to: '#22c55e',
    assessments: [
      { name: 'Coursework 1 – Microservice with UI', weight: '40%', qualifying: 30, due: 'Date TBC', note: 'Standalone microservice with its own UI, Docker, CI/CD, plus vodcast (up to 15 min). LO1, LO2, LO3.' },
      { name: 'Coursework 2 – Microservice Integration', weight: '60%', qualifying: 30, due: 'Date TBC', note: 'Orchestration, service communication and TDD in a distributed environment, plus reflective vodcast (up to 15 min). LO1–LO5.' }
    ] },
  { id: 'cyber-security',    code: '6COSC019W',   name: 'Cyber Security',                      icon: Shield,        from: '#e11d48', to: '#7c3aed',
    assessments: [
      { name: 'In Class Test', weight: '50%', qualifying: 30, due: 'Date TBC', note: '90 minutes, exam conditions. Assesses LO1, LO2.' },
      { name: 'Lab Based Portfolio', weight: '50%', qualifying: 30, due: 'Date TBC', note: '2250–2500 words, up to six attack components, labelled screenshots. GenAI not permitted in summative tasks. Assesses LO3, LO4, LO5.' }
    ] }
];

export const getModule = (id) => MODULES.find(m => m.id === id);

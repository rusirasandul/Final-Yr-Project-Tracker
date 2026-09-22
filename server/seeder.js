import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from './models/Task.js';

dotenv.config();

const initialMilestones = [
  {
    stepNumber: 1,
    title: "Domain Problem Definition",
    category: "Research Formulation",
    deadline: new Date("2026-09-28"),
    description: "Define the core computing challenge without assuming tools or libraries beforehand."
  },
  {
    stepNumber: 10,
    title: "Literature Survey Matrix",
    category: "Research Formulation",
    deadline: new Date("2026-10-06"),
    description: "Review 15+ papers categorised by Problem, Dataset, Method, Evaluation, and Gaps."
  },
  {
    stepNumber: 16,
    title: "Methodology vs Methods Specification",
    category: "Research Formulation",
    deadline: new Date("2026-10-12"),
    description: "Select overarching research methodology (e.g., Quantitative Experimental / DSR) and methods."
  },
  {
    stepNumber: 39,
    title: "PPRS Formative Submission",
    category: "PPRS",
    deadline: new Date("2026-10-19"),
    description: "Submit proposal draft, early slides, and objectives to supervisor for feedback."
  },
  {
    stepNumber: 40,
    title: "PPRS Summative Submission (Final Proposal)",
    category: "PPRS",
    deadline: new Date("2026-11-05"),
    description: "Submit finalised PPRS Report, LESP/EDI, and slide deck to portal."
  },
  {
    stepNumber: 41,
    title: "Interim Project Demonstration (IPD)",
    category: "IPD",
    deadline: new Date("2027-01-28"),
    description: "Demonstrate baseline evaluation against proposed ML/software pipeline prototype."
  },
  {
    stepNumber: 42,
    title: "Final Project Submission",
    category: "Dissertation",
    deadline: new Date("2027-04-05"),
    description: "Final report, source code repository link, and recorded video demonstration."
  },
  {
    stepNumber: 43,
    title: "Final Viva Voce Defence",
    category: "Viva Prep",
    deadline: new Date("2027-04-19"),
    description: "Oral defence and live examination answering theoretical and technical justifications."
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Task.deleteMany({});
    await Task.insertMany(initialMilestones);
    console.log('Milestone tasks seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();

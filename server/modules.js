import Task from './models/Task.js';

// Edit this list to rename modules / change week counts.
// (Keep the ids in sync with client/src/modules.js)
export const MODULES = [
  { id: 'applied-ai', topics: [
    'Introduction and History of AI',
    'Agents and Environments',
    'Search',
    'Adversarial Games',
    'Knowledge representation and planning',
    'Engagement week',
    'Machine Learning',
    'Neural Networks',
    'Computer Vision / Deep Learning',
    'LLMs',
    'Reinforcement Learning',
    'Revision session'
  ] },
  { id: 'fyp',               milestones: ['Research Formulation', 'PPRS', 'IPD', 'Dissertation', 'Viva Prep'] },
  { id: 'usability-testing', weeks: 12 },
  { id: 'devops',            weeks: 12 },
  { id: 'cyber-security',    weeks: 12 },
  { id: 'module-6',          weeks: 12 }
];

const topicTitle = (mod, i) => `Week ${String(i + 1).padStart(2, '0')} : ${mod.topics[i]}`;

const buildEntries = (mod) => {
  if (mod.topics) {
    return mod.topics.map((_, i) => ({
      module: mod.id, stepNumber: i + 1, title: topicTitle(mod, i), category: 'Week'
    }));
  }
  if (mod.milestones) {
    return mod.milestones.map((title, i) => ({
      module: mod.id, stepNumber: i + 1, title, category: 'Milestone'
    }));
  }
  return Array.from({ length: mod.weeks }, (_, i) => ({
    module: mod.id, stepNumber: i + 1, title: `Week ${i + 1}`, category: 'Week'
  }));
};

/** Creates empty weeks/milestones for any module that has no tasks yet. */
export const ensureStructure = async () => {
  for (const mod of MODULES) {
    const count = await Task.countDocuments({ module: mod.id });
    if (count === 0) await Task.insertMany(buildEntries(mod));
    else if (mod.topics) {
      // Sync titles of existing weeks with the teaching schedule
      for (let i = 0; i < mod.topics.length; i++) {
        await Task.updateOne(
          { module: mod.id, stepNumber: i + 1 },
          { title: topicTitle(mod, i) }
        );
      }
    }
  }
};

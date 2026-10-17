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
  { id: 'usability-testing', topics: [
    '21 Sep – Introduction to Usability Testing',
    '28 Sep – Usability Testing Methods and Strategies (Practical 1: Scenarios, methods and metrics)',
    '05 Oct – Research Questions and Experimental Design (Practical 2: Select a testing approach)',
    '12 Oct – Planning and Conducting a Usability Study (Practical 3) – GROUP DEADLINE 1:00 pm',
    '19 Oct – Ethics, Accessibility, Data Management and Responsible AI (Practical 4)',
    '26 Oct – Data Preparation and Descriptive Statistics (Industry Engagement / Catch-up week)',
    '02 Nov – Inferential Statistics I: Two Conditions (Practical 6: SPSS data preparation)',
    '09 Nov – Inferential Statistics II: Multiple Conditions (Practical 7: SPSS t-tests)',
    '16 Nov – Correlation and the Individual Dataset (Practical 8: ANOVA) – CW & slides due 19 Nov 1:00 pm',
    '23 Nov – Group Presentations: Methods & Contributions',
    '30 Nov – Reporting Findings and Recommendations (Practical 9: SPSS correlation)',
    '07 Dec – Practical 10: Individual Report clinic'
  ] },
  { id: 'devops',            weeks: 12 },
  { id: 'cyber-security',    weeks: 12 }
];

const topicTitle = (mod, i) => `Week ${String(i + 1).padStart(2, '0')} : ${mod.topics[i]}`;

const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
// Reads a leading "21 Sep – ..." date from a topic (teaching year starts Sep 2026)
const topicDate = (topic) => {
  const m = /^(\d{1,2}) ([A-Za-z]{3}) /.exec(topic);
  if (!m || !(m[2] in MONTHS)) return null;
  const month = MONTHS[m[2]];
  return new Date(Date.UTC(month >= 8 ? 2026 : 2027, month, Number(m[1])));
};

const buildEntries = (mod) => {
  if (mod.topics) {
    return mod.topics.map((t, i) => ({
      module: mod.id, stepNumber: i + 1, title: topicTitle(mod, i), category: 'Week',
      deadline: topicDate(t) || undefined
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
        const d = topicDate(mod.topics[i]);
        if (d) {
          await Task.updateOne(
            { module: mod.id, stepNumber: i + 1, deadline: { $exists: false } },
            { deadline: d }
          );
        }
      }
    }
  }
};

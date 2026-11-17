import Task from './models/Task.js';

// 6MMCS009W Usability Testing and Evaluation (2026/27) – CW1 (40%) and CW2 (10%) submission checklists.
// Seeded once per title into the 'usability-testing' module; the deliverables table (rubric) is kept in sync.

const MODULE = 'usability-testing';
const day = (d) => new Date(Date.UTC(2026, 10, d)); // November 2026
const SUBMIT = day(19);     // Blackboard: 19 Nov 2026, 1:00 pm (CW1 + CW2 files)
const PRESENT = day(23);    // Live online presentation: 23 Nov 2026

const item = (tag, category, text, due) => ({ label: `[${tag}] ${text}`, category, isDefault: true, dueDate: due });

export const USABILITY_COURSEWORK = [
  {
    title: 'CW1 – Group Usability Study Submission (40%) – due 19 Nov 2026, 1:00 pm',
    deadline: SUBMIT,
    rubric: [
      { tag: 'Report', criterion: '1. CW1 Group Report', weight: '.docx / .pdf (template)',
        descriptor: '2,700–3,000 words; all 4 individual sections + student contribution table + decision log + AI statement complete.' },
      { tag: 'Ethics', criterion: '2. Ethics & participant materials', weight: '.pdf / .docx (or appendices)',
        descriptor: 'Institutional ethics documentation, Participant Information Sheet, Informed Consent forms, recruitment/screening materials.' },
      { tag: 'Instruments', criterion: '2. Study tasks & research instruments', weight: '.pdf / .docx (or appendices)',
        descriptor: 'Standardised session instructions, neutral task/scenario scripts, post-task questionnaires (SUS / SEQ), observation & error-logging sheets.' },
      { tag: 'Data', criterion: '3. Raw data spreadsheet + data dictionary', weight: '.xlsx / .csv',
        descriptor: 'Anonymised P01–P20, raw values exactly as recorded – no cleaning, transformation, exclusion or statistics. Data Dictionary in report Section 6.1.' },
      { tag: 'Videos', criterion: '4. Participant recordings', weight: '20 × .mp4',
        descriptor: 'Privacy-protected screen + audio only (no faces / identifiers) for P01–P20, collected with consent, uploaded via the approved secure method (no public links).' },
      { tag: 'Submit', criterion: 'Final submission', weight: 'Blackboard',
        descriptor: 'All electronic files for CW1 and CW2 uploaded by 19 Nov 2026, 1:00 pm.' }
    ],
    notes:
`CW1 – GROUP COURSEWORK (40%) – 6MMCS009W Usability Testing and Evaluation 2026/27. Product evaluated: Maze.co.
DEADLINE: all electronic files (CW1 + CW2 deck) on Blackboard by 19 Nov 2026, 1:00 pm. Live presentation 23 Nov 2026.

REPORT (2,700–3,000 words) – official template 6MMCS009W_UT&E_Groupwork_CW1_Report_Template; remove ALL orange italic prompts.
Shared group sections: Context/Aim · Experimental Design · Ethics/Conduct · Reflection.
Individual sections ×4 students: Research Question · Hypothesis · Metric/Variables/Scales · Statistical Analysis Plan · Named Instrument Contribution · Data-Collection Role.
Also: student-by-student question/contribution table · concise group decision log · AI-use statement / prompt log (how outputs were checked, refined and verified – or state plainly no AI was used).

RAW DATA: labelled .xlsx/.csv, codes P01–P20, values exactly as recorded. NO cleaning, transformation, exclusion or statistical analysis.
DATA DICTIONARY (report Section 6.1): every column → research question, hypothesis, usability metric, measurement scale, planned statistical method, coverage / missing-data status.

VIDEOS: 20 recordings (P01–P20) of participants using Maze.co – consented, screen + audio only, no faces or personal identifiers, approved secure upload only (no public links).`,
    actions: [
      // Group report
      item('Report', 'compulsory', 'Write the report in the official CW1 Word template (6MMCS009W_UT&E_Groupwork_CW1_Report_Template)', day(18)),
      item('Report', 'compulsory', 'Shared section: Context / Aim (product = Maze.co)', day(18)),
      item('Report', 'compulsory', 'Shared section: Experimental Design (design rationale, 20 participants, tasks)', day(18)),
      item('Report', 'compulsory', 'Shared section: Ethics / Conduct (how the study ran in practice)', day(18)),
      item('Report', 'compulsory', 'Shared section: Reflection (limitations and improvements)', day(18)),
      item('Report', 'compulsory', 'MY individual section: Research Question + Hypothesis', day(18)),
      item('Report', 'compulsory', 'MY individual section: Metric, Variables & Measurement Scales', day(18)),
      item('Report', 'compulsory', 'MY individual section: Statistical Analysis Plan (planned test + justification)', day(18)),
      item('Report', 'compulsory', 'MY individual section: Named Instrument Contribution + Data-Collection Role', day(18)),
      item('Report', 'compulsory', 'All 4 students\' individual sections complete', day(18)),
      item('Report', 'compulsory', 'Student-by-student question / contribution table', day(18)),
      item('Report', 'compulsory', 'Concise group decision log', day(18)),
      item('Report', 'compulsory', 'AI-use statement / prompt log (how AI output was checked, refined, verified – or "no AI tools used")', day(18)),
      item('Report', 'compulsory', 'Word count 2,700–3,000 words', day(18)),
      item('Report', 'compulsory', 'Remove ALL orange italic template prompts', day(18)),
      item('Report', 'mandatory', 'Proofread, check references and export final .docx / .pdf', day(18)),

      // Ethics & participant materials
      item('Ethics', 'compulsory', 'Completed institutional ethics documentation', day(18)),
      item('Ethics', 'compulsory', 'Participant Information Sheet', day(18)),
      item('Ethics', 'compulsory', 'Signed Informed Consent forms for all 20 participants (P01–P20)', day(18)),
      item('Ethics', 'compulsory', 'Recruitment / screening materials (anonymous screening Google Form)', day(18)),

      // Study tasks & instruments
      item('Instruments', 'compulsory', 'Standardised session instructions', day(18)),
      item('Instruments', 'compulsory', 'Neutral task / scenario scripts', day(18)),
      item('Instruments', 'compulsory', 'Post-task questionnaires (System Usability Scale / Single Ease Question)', day(18)),
      item('Instruments', 'compulsory', 'Behavioural observation / error-logging sheets', day(18)),
      item('Instruments', 'mandatory', 'Bundle ethics + instruments as a .pdf/.docx pack or report appendices', day(18)),

      // Raw data + dictionary
      item('Data', 'compulsory', 'Raw-data spreadsheet (.xlsx / .csv) with labelled columns', day(18)),
      item('Data', 'compulsory', 'Anonymous participant codes P01–P20 only – no names, emails or identifiers', day(18)),
      item('Data', 'compulsory', 'Values entered EXACTLY as recorded – no cleaning, transformation, exclusion or statistics', day(18)),
      item('Data', 'compulsory', 'Data Dictionary in report Section 6.1: every column → RQ, hypothesis, metric, scale, planned test, coverage/missing status', day(18)),

      // Videos
      item('Videos', 'compulsory', '20 recordings of participants using Maze.co (P01–P20)', day(18)),
      item('Videos', 'compulsory', 'Files named by participant code (P01.mp4 … P20.mp4)', day(18)),
      item('Videos', 'compulsory', 'Privacy check: screen + audio only, no faces or personal identifiers visible/audible', day(18)),
      item('Videos', 'compulsory', 'Upload via the approved secure course method (no public links)', SUBMIT),

      // Submission
      item('Submit', 'compulsory', 'Submit CW1 report + appendices + raw data on Blackboard by 19 Nov, 1:00 pm', SUBMIT),
      item('Submit', 'mandatory', 'Save the Blackboard submission receipt / confirmation', SUBMIT)
    ]
  },
  {
    title: 'CW2 – Group Presentation (10%) – deck 19 Nov, live 23 Nov 2026',
    deadline: PRESENT,
    rubric: [
      { tag: 'Deck', criterion: '5. CW2 presentation deck', weight: '.pptx (one per group)',
        descriptor: 'Submitted on Blackboard by 19 Nov 2026, 1:00 pm.' },
      { tag: 'Live', criterion: 'Live online presentation', weight: '≤ 20 min incl. Q&A',
        descriptor: '23 Nov 2026 during scheduled teaching time, recorded for moderation. Every student must speak and defend their own part.' }
    ],
    notes:
`CW2 – GROUP PRESENTATION (10%) – 6MMCS009W 2026/27.
Deck: ONE .pptx per group on Blackboard by 19 Nov 2026, 1:00 pm.
Live: 23 Nov 2026, online, max 20 minutes TOTAL including Q&A, recorded for moderation.

DECK MUST COVER: product evaluated (Maze.co) · overall aim · how the 4 RQs fit together · experimental design rationale · 20 participants & recruitment · tasks & instruments · ethics · how the study ran in practice · dataset structure & video evidence · methodological limitations & improvements.

EVERY STUDENT SPEAKS – explain and defend: own research question · usability metric · variables · planned statistical test · named instrument contribution · session role · limitations.`,
    actions: [
      item('Deck', 'compulsory', 'Slide: Product evaluated (Maze.co) + overall aim', day(18)),
      item('Deck', 'compulsory', 'Slide: How the 4 research questions fit together', day(18)),
      item('Deck', 'compulsory', 'Slide: Experimental design rationale', day(18)),
      item('Deck', 'compulsory', 'Slide: 20 participants & recruitment', day(18)),
      item('Deck', 'compulsory', 'Slide: Tasks & instruments (scripts, SUS/SEQ, observation sheets)', day(18)),
      item('Deck', 'compulsory', 'Slide: Ethics (information sheet, consent, privacy)', day(18)),
      item('Deck', 'compulsory', 'Slide: How the study ran in practice', day(18)),
      item('Deck', 'compulsory', 'Slide: Dataset structure & video evidence', day(18)),
      item('Deck', 'compulsory', 'Slide: Methodological limitations & improvements', day(18)),
      item('Deck', 'compulsory', 'MY slides: RQ, metric, variables, planned test, instrument contribution, session role', day(18)),
      item('Deck', 'compulsory', 'Submit ONE .pptx for the group on Blackboard by 19 Nov, 1:00 pm', SUBMIT),

      item('Live', 'compulsory', 'Agree speaker order – all 4 students speak', day(20)),
      item('Live', 'compulsory', 'Timed group rehearsal – finish well under 20 min to leave time for Q&A', day(22)),
      item('Live', 'compulsory', 'Prepare to defend MY RQ, metric, variables, statistical test, instrument, role and limitations', day(22)),
      item('Live', 'mandatory', 'Test the online setup (mic, screen share, slides) before the session', day(22)),
      item('Live', 'compulsory', 'Deliver the live online presentation on 23 Nov 2026', PRESENT)
    ]
  }
];

/** Adds the CW1/CW2 checklist tasks to the usability module (once per title) and keeps their deliverables table in sync. */
export const ensureUsabilityCoursework = async () => {
  const existing = await Task.find({ module: MODULE }).select('title stepNumber');
  let step = existing.reduce((max, t) => Math.max(max, t.stepNumber), 0);

  for (const cw of USABILITY_COURSEWORK) {
    const found = await Task.findOne({ module: MODULE, title: cw.title });
    if (found) {
      found.rubric = cw.rubric;
      await found.save();
      continue;
    }
    await Task.create({
      module: MODULE,
      stepNumber: ++step,
      title: cw.title,
      category: 'Coursework',
      deadline: cw.deadline,
      notes: cw.notes,
      actions: cw.actions,
      rubric: cw.rubric,
      portalSubmission: { portalName: 'Blackboard' }
    });
  }
};


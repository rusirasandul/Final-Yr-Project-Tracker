import Task from './models/Task.js';

// Project Proposal (PP) presentation – marking criteria (6COSC023W rubric 2026/27)
// and a checklist of every important task, grouped by criterion.
// Source: PP Detailed Student Guide 2026/27 V2 + PP Marking Rubric 2026-2027.

export const PP_TITLE = 'Project Proposal Presentation (5 Nov 2026)';
export const PP_DEADLINE = new Date(Date.UTC(2026, 10, 5)); // 5 Nov 2026
export const PP_GUIDANCE_VERSION = 2;

const day = (d) => new Date(Date.UTC(2026, 10, d)); // November 2026

export const PP_RUBRIC = [
  { tag: 'Problem', weight: '10%', criterion: 'Problem statement, aims & objectives',
    descriptor: 'Clarity of the overall aim, its purpose and what the project intends to achieve. Objectives must be specific, measurable and realistic; the problem must be detailed and well articulated.' },
  { tag: 'Background', weight: '10%', criterion: 'Background review, similar applications & proposed solution',
    descriptor: 'Understanding of existing literature, systems or technologies. Critical analysis of key sources highlighting trends, gaps and how they inform the project. Concise, well organised, supports the aims. Existing solutions researched and a gap analysis justifies the proposed solution.' },
  { tag: 'Tools', weight: '10%', criterion: 'Tools and technologies',
    descriptor: 'Identification of the hardware/software tools and technologies essential to the project, how each supports development, and alternative solutions.' },
  { tag: 'Method', weight: '10%', criterion: 'Methodology and methods',
    descriptor: 'A well-thought-out methodological approach suitable for achieving the objectives; technically feasible and appropriate for the project scope.' },
  { tag: 'LESP', weight: '10%', criterion: 'Ethical, legal, social, EDI & sustainability',
    descriptor: 'Critical consideration of ethical, legal, social and EDI implications. Explicit engagement with relevant UN Sustainable Development Goals (SDGs) and sustainability.' },
  { tag: 'Schedule', weight: '5%', criterion: 'Time schedule',
    descriptor: 'Project timeline with milestones, major tasks, sub-tasks, deadlines and risk management.' },
  { tag: 'References', weight: '5%', criterion: 'References / bibliography',
    descriptor: 'Complete, well-curated list of all sources used and cited in the presentation, using an appropriate citation style.' },
  { tag: 'Slides', weight: '10%', criterion: 'Presentation slides quality',
    descriptor: 'Completeness and clarity of the slides so that they effectively summarise the key points of the presentation.' },
  { tag: 'Delivery', weight: '30%', criterion: 'Presentation delivery & answering questions',
    descriptor: 'Clarity, engagement and adherence to the time limit. Demonstrate ownership of the proposal by explaining the content and responding appropriately to questions.' },
  { tag: 'Ethics', weight: '0% (pass/fail)', criterion: 'Signed Ethics Application',
    descriptor: 'Completed Ethics Application, discussed with the supervisor, must be included in the submission. No Ethics Application OR not attending the presentation = whole assignment marked 0 (supervisor still gives feedback).' }
];

const item = (tag, category, text, due) => ({
  label: `[${tag}] ${text}`, category, isDefault: true, dueDate: due
});

export const PP_ACTIONS = [
  // Problem statement, aims & objectives – 10%
  item('Problem', 'compulsory', 'Write an evidence-based problem statement: context → limitation → consequence → research need (with citations)', day(3)),
  item('Problem', 'compulsory', 'Write ONE overarching aim (investigate, develop and evaluate …)', day(3)),
  item('Problem', 'compulsory', 'Write 4–6 SMART objectives (investigate/analyse/design/develop/evaluate), each with the evidence it produces', day(3)),
  item('Problem', 'mandatory', 'Define scope / out-of-scope and check the working title does not overclaim (no "novel", "first", "state-of-the-art")', day(3)),
  item('Problem', 'mandatory', 'Build the Objective → Method → Evidence alignment map', day(3)),

  // Background review, similar applications & proposed solution – 10%
  item('Background', 'compulsory', 'Document the search strategy: databases, search strings, inclusion/exclusion criteria, screening counts', day(3)),
  item('Background', 'compulsory', 'Complete the Literature Survey Matrix (citation, problem, data, method, evaluation, findings, limitations, relevance)', day(3)),
  item('Background', 'compulsory', 'Synthesise the literature by THEMES (trends, agreements, disagreements) – not paper-by-paper', day(3)),
  item('Background', 'compulsory', 'Compare existing / similar applications in a features-vs-limitations table', day(3)),
  item('Background', 'compulsory', 'Gap analysis: gap supported by several papers and still unresolved → justifies the proposed solution', day(3)),
  item('Background', 'compulsory', 'Derive proposal-stage requirements (functional, research, evaluation, privacy, EDI) traceable to the evidence', day(3)),
  item('Background', 'mandatory', 'Describe the proposed solution as a high-level pipeline / architecture diagram', day(4)),

  // Tools and technologies – 10%
  item('Tools', 'compulsory', 'List the hardware and software tools and explain how EACH supports development', day(3)),
  item('Tools', 'compulsory', 'Technology comparison matrix: alternatives, selection criteria and justified choice (familiarity alone is not a justification)', day(3)),
  item('Tools', 'mandatory', 'Feasibility evidence: compute, data access, licences and API/library terms', day(4)),

  // Methodology and methods – 10%
  item('Method', 'compulsory', 'Name the research methodology (e.g. Design Science / quantitative experimental / mixed) and why it fits the research question', day(3)),
  item('Method', 'compulsory', 'Distinguish methodology vs methods vs development process (e.g. Agile / CRISP-DM)', day(3)),
  item('Method', 'compulsory', 'Methods table: data, preprocessing, experiments, validation strategy – each linked to an objective', day(3)),
  item('Method', 'compulsory', 'Evaluation plan: baselines, metrics (and why each), success criteria', day(3)),
  item('Method', 'mandatory', 'Dataset comparison: relevance, size, class balance, quality, licence, population', day(4)),
  item('Method', 'mandatory', 'State methodology strengths, limitations and assumptions', day(4)),

  // Ethical, legal, social, EDI & sustainability – 10%
  item('LESP', 'compulsory', 'Legal: data protection (GDPR / Sri Lanka PDPA), licences, copyright/IP – specific to MY project', day(3)),
  item('LESP', 'compulsory', 'Ethical: potential harm, consent, sensitive data, over-reliance, transparency', day(3)),
  item('LESP', 'compulsory', 'Social & professional: who benefits / who is disadvantaged, misuse, honest reporting of results', day(3)),
  item('LESP', 'compulsory', 'EDI analysis: representation in data, bias, accessibility, performance differences across groups', day(3)),
  item('LESP', 'compulsory', 'LESP + EDI + sustainability matrix mapped to the 4 BCS Code of Conduct principles, with mitigations', day(4)),
  item('LESP', 'compulsory', 'Link relevant UN SDG(s) and explain specifically how they shape the problem / approach (not just listed)', day(4)),
  item('LESP', 'mandatory', 'Sustainability: compute/environmental cost, maintainable reproducible code, social sustainability', day(4)),

  // Time schedule – 5%
  item('Schedule', 'compulsory', 'Work breakdown structure: major tasks → sub-tasks with clear outputs', day(4)),
  item('Schedule', 'compulsory', 'Gantt chart with milestones and deadlines (PP, PPRS, IPD, Dissertation, Viva)', day(4)),
  item('Schedule', 'compulsory', 'Risk register: likelihood, impact, mitigation, contingency', day(4)),
  item('Schedule', 'mandatory', 'Show task dependencies and a contingency buffer', day(4)),

  // References / bibliography – 5%
  item('References', 'compulsory', 'Consistent Harvard (Westminster) referencing: in-slide citations + reference slide', day(4)),
  item('References', 'mandatory', 'Use high-quality peer-reviewed sources (IEEE, ACM, Scopus, ScienceDirect) – recent plus seminal', day(4)),
  item('References', 'mandatory', 'Cross-check: every in-slide citation is in the reference list and vice versa', day(4)),

  // Presentation slides quality – 10%
  item('Slides', 'compulsory', 'Build the deck (~16 slides) following the guide structure – see Notes', day(4)),
  item('Slides', 'compulsory', 'One main message per slide; diagrams/tables over paragraphs; readable fonts, high contrast', day(4)),
  item('Slides', 'mandatory', 'Backup slides: literature matrix, gap analysis, tech comparison, dataset comparison, risk register', day(4)),
  item('Slides', 'mandatory', 'Export the final slides to PDF and attach them here', day(4)),

  // Presentation delivery & answering questions – 30%
  item('Delivery', 'compulsory', 'Timed rehearsal ×3 within the official time limit', day(4)),
  item('Delivery', 'compulsory', 'Prepare answers to the 20 examiner questions in the guide (Stage L)', day(4)),
  item('Delivery', 'compulsory', 'Practise the answer pattern: direct answer → evidence → limitation → decision', day(4)),
  item('Delivery', 'mandatory', 'Explain every slide without reading from it (ownership)', day(4)),
  item('Delivery', 'optional', 'Mock presentation to a friend or the supervisor', day(4)),

  // Signed Ethics Application – pass/fail
  item('Ethics', 'compulsory', 'Complete the Ethics Application so it matches the methods in the slides', day(3)),
  item('Ethics', 'compulsory', 'Discuss the Ethics Application with the supervisor and get it signed', day(4)),
  item('Ethics', 'compulsory', 'Submit the signed Ethics Application with the slides (missing = 0 for the whole PP)', day(5)),
  item('Ethics', 'compulsory', 'Attend the presentation on 5 Nov 2026 (absence = 0)', day(5))
];

const PP_NOTES_MARKER = 'PP MARKING CRITERIA';
export const PP_NOTES =
`${PP_NOTES_MARKER} (6COSC023W, 2026/27) – see the Marking Criteria table above; every checklist item is tagged with its criterion.
Weights: Problem/aims/objectives 10% · Background review & proposed solution 10% · Tools & technologies 10% · Methodology & methods 10% · LESP/EDI/SDGs 10% · Time schedule 5% · References 5% · Slides quality 10% · Delivery & Q&A 30% · Signed Ethics Application 0% but PASS/FAIL.
!! No signed Ethics Application OR not attending the presentation = whole assignment marked 0.

Assessment = proposal PRESENTATION + Ethics Form on 5 Nov 2026. No separate written proposal report – but do the research at report depth and communicate it concisely.
Own slide design is fine (Q2) – but never remove academically important content for looks.
Golden rule: every later decision must trace back to something earlier (problem → evidence → literature → gap → aim/objectives → requirements → solution → tools → methodology → evaluation → LESP → schedule).

SLIDE STRUCTURE (guide Stage K):
1 Title, student, supervisor, one-sentence focus · 2 Problem context & significance · 3 Evidence-based problem statement & constraints · 4 Aim & measurable objectives · 5 LR method (databases, search themes, scope) · 6 Literature synthesis · 7 Existing/similar solutions & limitations · 8 Gap & implication · 9 Proposed solution requirements · 10 Proposed solution / pipeline · 11 Tools/technologies: alternatives & justification · 12 Research methodology & why it fits · 13 Methods, data & evaluation plan · 14 LESP + EDI + sustainability (BCS + SDGs) · 15 Schedule, milestones & risks · 16 Expected contribution, feasibility & alignment · + References · + Backup slides.

Q&A pattern: answer directly → evidence/rationale → acknowledge limitations → state the project decision.`;

// Checklist labels from the original seed – mapped onto the new items so completion state is kept.
const OLD_TO_NEW = {
  'Build proposal presentation slides (own design allowed, follow marking guide)': '[Slides] Build the deck (~16 slides) following the guide structure – see Notes',
  'Submit Ethics Application / Ethics Form': '[Ethics] Submit the signed Ethics Application with the slides (missing = 0 for the whole PP)',
  'Slide: Problem + evidence that the problem exists': '[Problem] Write an evidence-based problem statement: context → limitation → consequence → research need (with citations)',
  'Slide: Literature synthesis + research gap': '[Background] Gap analysis: gap supported by several papers and still unresolved → justifies the proposed solution',
  'Slide: Aim, objectives, research question(s), contribution': '[Problem] Write 4–6 SMART objectives (investigate/analyse/design/develop/evaluate), each with the evidence it produces',
  'Slide: Requirements (traceable to the gap)': '[Background] Derive proposal-stage requirements (functional, research, evaluation, privacy, EDI) traceable to the evidence',
  'Slide: Methodology + technology justification': '[Method] Name the research methodology (e.g. Design Science / quantitative experimental / mixed) and why it fits the research question',
  'Slide: Evaluation plan with baselines and metrics': '[Method] Evaluation plan: baselines, metrics (and why each), success criteria',
  'Slide: Ethics / responsible computing': '[LESP] LESP + EDI + sustainability matrix mapped to the 4 BCS Code of Conduct principles, with mitigations',
  'Slide: Risks, feasibility and project plan': '[Schedule] Risk register: likelihood, impact, mitigation, contingency',
  'Prepare backup slides: literature table, gap analysis, dataset comparison, architecture, PoC evidence, references': '[Slides] Backup slides: literature matrix, gap analysis, tech comparison, dataset comparison, risk register',
  'Rehearse answering "What evidence supports this?" for every claim': '[Delivery] Prepare answers to the 20 examiner questions in the guide (Stage L)'
};
const OLD_DROP = ['Check the Project Proposal sample template for expected structure'];

/** One-time upgrade of the PP presentation task: rubric, notes and the full criterion checklist. */
export const ensureProposalPresentation = async () => {
  const task = await Task.findOne({ module: 'fyp', title: PP_TITLE });
  if (!task) return;

  // Rubric is reference data – always keep it in sync.
  task.rubric = PP_RUBRIC;

  if ((task.guidanceVersion || 0) < PP_GUIDANCE_VERSION) {
    const existing = task.actions.map(a => a.toObject());
    const byLabel = new Map();
    const extras = [];
    for (const a of existing) {
      if (OLD_TO_NEW[a.label]) {
        const target = OLD_TO_NEW[a.label];
        const prev = byLabel.get(target);
        // Keep completion if either the old or an already-mapped item was done
        byLabel.set(target, prev ? { ...prev, isCompleted: prev.isCompleted || a.isCompleted } : { ...a, label: target });
      } else if (OLD_DROP.includes(a.label) && !a.isCompleted) {
        // obsolete default item – drop
      } else if (PP_ACTIONS.some(n => n.label === a.label)) {
        byLabel.set(a.label, a);
      } else {
        extras.push(a); // user-added or completed items are preserved
      }
    }
    // Rebuild in rubric order, then keep any custom items at the end
    task.actions = [
      ...PP_ACTIONS.map(n => {
        const found = byLabel.get(n.label);
        return found
          ? { ...found, category: n.category, isDefault: true, dueDate: found.dueDate || n.dueDate }
          : { ...n };
      }),
      ...extras
    ];

    if (!(task.notes || '').includes(PP_NOTES_MARKER)) {
      // Untouched original seed notes are superseded by PP_NOTES; anything edited by the user is kept below.
      const old = (task.notes || '').trim();
      const untouchedSeed = old.startsWith('Q1/Q11/Q12/Q16: Assessment = proposal PRESENTATION') && old.endsWith('PoC evidence, references.');
      task.notes = old && !untouchedSeed ? `${PP_NOTES}\n\n--- Earlier notes ---\n${old}` : PP_NOTES;
    }
    if (!task.deadline) task.deadline = PP_DEADLINE;
    task.guidanceVersion = PP_GUIDANCE_VERSION;
  }
  await task.save();
};

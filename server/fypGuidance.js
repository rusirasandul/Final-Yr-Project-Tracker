import Task from './models/Task.js';

// FYP tasks derived from the lecturer's Q&A email (6 Oct 2026).
// Seeded once per title – existing tasks (and any notes you've edited) are never overwritten.

const PROPOSAL_DEADLINE = new Date(Date.UTC(2026, 10, 5)); // 5 Nov 2026

const c = (label) => ({ label, category: 'compulsory', isDefault: true });
const m = (label) => ({ label, category: 'mandatory', isDefault: true });
const o = (label) => ({ label, category: 'optional', isDefault: true });

export const FYP_GUIDANCE_TASKS = [
  {
    title: 'Guidance: Overall FYP Approach & Marking Logic (read first)',
    notes:
`CORE CHAIN (Q23/Q17): Problem → Evidence → Literature Review → Existing Approaches → Critical Comparison → Limitations → Research Gap → Research Question(s) → Contribution/Novelty → Requirements → Methodological Review → Proposed Methodology → PoC/Implementation → Benchmarking & Evaluation → Results → Critical Analysis → Evidence of Contribution → Conclusion.
- Never start with "I want to use LSTM/Transformer/LLM/Blockchain" and then hunt for a gap.
- Low mark = "I built something". High mark = can defend: why this problem, why this gap, why this contribution, why this methodology, why these experiments, what the evidence shows.
- Complexity ≠ marks. Research quality + evidence = marks. ML is NOT required (Q19); strong non-ML projects can outscore weak ML ones.
- Contribution can be a framework/tool/architecture/algorithm/dataset/benchmark etc. (Q21) but "I created a framework" is not enough: state what is new, which gap, how it differs, why justified, how evaluated, against which baselines, what evidence.
- Marking guide > visual template. CS and SE are separate modules with different criteria (SE stresses Initial Requirements, Indicative Solution, architecture, software artefact).`,
    actions: [
      c('Write my chain in one page: problem → gap → contribution → methodology → evaluation'),
      m('Check every project claim against the marking guide criteria'),
      m('Confirm contribution statement: what is new / which gap / baselines / evidence'),
      o('Re-read the chain monthly and update it as the research evolves')
    ]
  },
  {
    title: 'Project Proposal Presentation (5 Nov 2026)',
    deadline: PROPOSAL_DEADLINE,
    notes:
`Q1/Q11/Q12/Q16: Assessment = proposal PRESENTATION + Ethics Form on 5 Nov 2026. There is NO separate dissertation-style proposal report (no separate Intro/LR/Methodology document).
But the research work (literature, methodology) must still be done and synthesised into slides – do the research at report depth, communicate it concisely.
Suggested flow: Problem → Evidence → Literature → Gap → Aim/Objectives → Requirements → Proposed Solution → Methodology/Technology → Evaluation → Ethics/Responsible Computing → Risks/Plan → Contribution/Feasibility.
Own slide design is fine (Q2) – but do not remove academically important content for looks. Prepare BACKUP slides to defend evidence ("What supports this?"): literature table, gap analysis, dataset comparison, method justification, requirements, architecture, evaluation plan, PoC evidence, references.`,
    actions: [
      c('Build proposal presentation slides (own design allowed, follow marking guide)'),
      c('Submit Ethics Application / Ethics Form'),
      c('Slide: Problem + evidence that the problem exists'),
      c('Slide: Literature synthesis + research gap'),
      c('Slide: Aim, objectives, research question(s), contribution'),
      c('Slide: Requirements (traceable to the gap)'),
      c('Slide: Methodology + technology justification'),
      c('Slide: Evaluation plan with baselines and metrics'),
      c('Slide: Ethics / responsible computing'),
      c('Slide: Risks, feasibility and project plan'),
      m('Prepare backup slides: literature table, gap analysis, dataset comparison, architecture, PoC evidence, references'),
      m('Rehearse answering "What evidence supports this?" for every claim'),
      o('Check the Project Proposal sample template for expected structure')
    ]
  },
  {
    title: 'Literature Search Strategy & Search Log',
    deadline: PROPOSAL_DEADLINE,
    notes:
`Q10: You cannot prove nobody has ever solved something – demonstrate a rigorous, defensible search instead.
Document: Databases → Search strings → Keywords/synonyms → Inclusion/exclusion criteria → Publication period → Screening → Backward snowballing → Forward snowballing → Recent literature search.
Sources: IEEE Xplore, ACM DL, ScienceDirect, SpringerLink, Scopus, Web of Science; Google Scholar as supplementary. Also check recent review papers, highly cited papers and papers citing key work.
Wording to use: "Based on the literature reviewed and the search strategy undertaken, limited evidence was identified addressing X under Y conditions." Avoid "Nobody has ever solved this."
60 papers ≠ valid gap; quality and coverage matter, not counts.`,
    actions: [
      c('List databases used and the exact search strings / synonyms'),
      c('Define inclusion/exclusion criteria and publication period'),
      c('Record screening results (found → screened → included)'),
      m('Backward snowballing on key papers (important cited references)'),
      m('Forward snowballing on key papers (newer papers citing them)'),
      m('Search recent literature and recent review papers'),
      o('Use Google Scholar as a supplementary source only')
    ]
  },
  {
    title: 'Literature Survey Matrix & Staged Paper Reading',
    deadline: PROPOSAL_DEADLINE,
    notes:
`Q5: Don't read every paper word-by-word. Use a staged approach.
First pass: Title → Abstract → Introduction → Problem → Contribution → Results → Conclusion → Limitations/Future Work. Decide relevance.
Second pass (relevant papers only): Dataset → Preprocessing → Methodology → Architecture → Experimental Setup → Baselines → Metrics → Results → Limitations.
Immediately record each paper in the matrix: Paper ID | Problem | Dataset | Method | Contribution | Results | Limitations | Relevance | Possible Gap.
Don't wait until "everything is read" to start the review. 2 papers can suggest a direction but not establish a gap.`,
    actions: [
      c('Create Literature Survey Matrix (Paper ID, Problem, Dataset, Method, Contribution, Results, Limitations, Relevance, Possible Gap)'),
      m('First-pass every candidate paper (abstract → intro → conclusion → limitations)'),
      m('Second-pass relevant papers (dataset, method, baselines, metrics, limitations)'),
      m('Add each paper to the matrix right after reading it'),
      o('Target a broad, current and critically analysed set of papers')
    ]
  },
  {
    title: 'Research Gap Validation (multi-paper, still unresolved)',
    deadline: PROPOSAL_DEADLINE,
    notes:
`Q4/Q6/Q13: A gap should come from critical synthesis of a body of literature, not one paper's "future work".
Chain: Literature evidence → limitation/problem → unresolved issue → research gap → contribution.
Old gap + limitation ≠ new gap. Process: Original gap → proposed solution → limitation → subsequent literature → is the limitation STILL UNRESOLVED? → formulate current gap. (e.g. "tested only on Dataset X" is not a gap if later papers tested many datasets.)
2–3 papers reveal a *candidate* gap only. No magic number – evidence must be relevant + sufficiently broad + sufficiently current + critically analysed.`,
    actions: [
      c('Write the gap statement and cite the several papers that support it'),
      c('For each limitation, check subsequent literature: is it still unresolved?'),
      m('Draw the chain: evidence → limitation → unresolved issue → gap → contribution'),
      m('Ask: has anybody subsequently solved this?'),
      m('Phrase the gap with defensible wording (no absolute claims)')
    ]
  },
  {
    title: 'Requirements Traceability (Evidence → Gap → Requirement)',
    deadline: PROPOSAL_DEADLINE,
    notes:
`Q22: Requirements have NOT disappeared – don't wait for a new template.
For research projects requirements can come from: Problem evidence + Literature + Research gap + Stakeholder needs + Technical constraints + Dataset constraints + Research objectives.
Example: Gap "unreliable under distribution shift" → FR-04: The system shall detect or quantify changes in the input distribution before producing a reliability-sensitive prediction.
Keep traceability: Research evidence → gap → requirement → proposed solution.`,
    actions: [
      c('Write functional and non-functional requirements with IDs (FR-xx / NFR-xx)'),
      c('Map every requirement to evidence / gap / objective'),
      m('Add stakeholder, technical and dataset constraints'),
      o('SE students: emphasise Initial Requirements and Indicative Solution')
    ]
  },
  {
    title: 'Dataset Validation (if creating own dataset)',
    deadline: PROPOSAL_DEADLINE,
    notes:
`Q3: If you create your own dataset you MUST show it is reliable and appropriate. Dataset validation ≠ model validation (95% accuracy doesn't prove the dataset is valid).
Consider: provenance, collection procedure, inclusion/exclusion criteria, annotation/labelling procedure, expert/domain validation (e.g. medical labels need clinical justification), inter-annotator agreement, missing values, duplicates, corrupted/impossible values, inconsistent labels, class distribution, representativeness, bias, train/test leakage, pilot validation, ethics & consent, privacy, licensing, versioning & reproducibility.
Skip this task if you use an established public dataset (mark actions not needed).`,
    actions: [
      c('Document provenance, collection procedure and inclusion/exclusion criteria'),
      c('Document annotation/labelling procedure and domain-expert justification'),
      m('Check inter-annotator agreement where relevant'),
      m('Check missing, duplicate, corrupted and impossible values'),
      m('Check class distribution, representativeness and bias'),
      m('Check train/test leakage'),
      m('Run a pilot validation'),
      m('Address ethics, consent, privacy and licensing'),
      o('Version the dataset for reproducibility')
    ]
  },
  {
    title: 'Methodology, Evaluation Plan & Baselines',
    deadline: PROPOSAL_DEADLINE,
    notes:
`Q17/Q21/Q23: Justify the methodology via a methodological review, then plan rigorous evaluation.
Define: what is being evaluated, appropriate baselines, metrics, experimental setup, how results will be interpreted critically, and what evidence will show the contribution.
Technology choice must follow the problem/gap – not the other way round.`,
    actions: [
      c('Methodological review: compare alternative methods and justify the chosen one'),
      c('Define baselines and evaluation metrics'),
      m('Define experimental setup and success criteria'),
      m('Plan PoC / implementation scope that is feasible in the remaining time'),
      m('Plan critical analysis of results (what the evidence actually shows)')
    ]
  },
  {
    title: 'Supervisor Engagement & Meeting Preparation',
    notes:
`Q8/Q14/Q15/Q7/Q20: Supervisor is the first point for research/technical direction but won't do the research for you.
Never go to a meeting just saying "I'm stuck". Prepare: What I am trying to do → What I tried → What happened → Evidence I found → Alternatives considered → Exact question/problem.
Supervision expectation: at least 2 meetings/month when the student engages. The student initiates and maintains engagement.
No reply for ~1 month despite several attempts: keep email evidence and escalate to FYP admin team – Ms. Dulani / Ms. Hasanthika.
Changing topic is possible (even later) but possible ≠ advisable: discuss with supervisor and weigh evidence + novelty + feasibility + datasets + complexity + remaining time + evaluation + ethics. Changing topic usually does not change supervisor; re-check ethics if data/participants change.
Mixed feedback from other academics: identify the exact issue (gap, novelty, scope, dataset, already solved, methodology, evaluation, too much dev vs research) and respond with evidence.
Assessment-rule/marking questions go via the FYP academic/module structure.`,
    actions: [
      c('Prepare meeting note: tried / happened / evidence / alternatives / exact question'),
      m('Arrange at least 2 supervisor meetings per month'),
      m('Keep email evidence of all supervisor contact attempts'),
      o('Escalate to Ms. Dulani / Ms. Hasanthika if no reply for ~1 month'),
      o('Before any topic change: assess evidence, novelty, feasibility, data, time, ethics with supervisor'),
      o('Re-evaluate ethics application if data collection or participants change')
    ]
  },
  {
    title: 'Admin Notes: Timetable & Lecture Materials',
    notes:
`Q9: Follow the currently published FYP lecture timetable. Don't assume a 6:30 pm start unless officially announced.
Q18: Lecture notes/Word document are shared via BB / Google Drive: https://drive.google.com/drive/folders/1ijRBVGJNus41os2iYJpfnhGFKwwfQnqt?usp=drive_link – use them to support (not replace) attending lectures.`,
    actions: [
      m('Check the published timetable before each FYP lecture'),
      o('Download the lecture notes from BB / Google Drive')
    ]
  }
];

/** Adds any missing FYP guidance tasks (matched by title) to the 'fyp' module. */
export const ensureFypGuidance = async () => {
  const existing = await Task.find({ module: 'fyp' }).select('title stepNumber');
  const titles = new Set(existing.map(t => t.title));
  let step = existing.reduce((max, t) => Math.max(max, t.stepNumber), 0);

  for (const g of FYP_GUIDANCE_TASKS) {
    if (titles.has(g.title)) continue;
    await Task.create({
      module: 'fyp',
      stepNumber: ++step,
      title: g.title,
      category: 'Milestone',
      deadline: g.deadline,
      notes: g.notes,
      actions: g.actions
    });
  }
  await ensurePprsEvidence();
};

// Evidence required for the PP/PPRS submission – merged into the existing 'PPRS' milestone (not separate milestones).
const PPRS_EVIDENCE_MARKER = 'PP EVIDENCE PACK';
const PPRS_EVIDENCE_NOTES =
`${PPRS_EVIDENCE_MARKER} (incomplete work is acceptable – submit what exists and mark what is missing):
1) Current PP slides  2) Literature review evidence (papers, survey matrix, comparisons)  3) Problem & gap analysis  4) Research & technical investigations (datasets, technology/algorithm comparisons, feasibility)  5) R&D methodology justification  6) Other supporting evidence (designs, experiments, prototype, source code, initial results).`;
const PPRS_EVIDENCE_ACTIONS = [
  c('Evidence 1 – Current PP slides: export the slides prepared so far (PDF) and attach/link them'),
  c('Evidence 2 – Literature review: reviewed papers, literature survey matrix, comparative analysis, key findings'),
  c('Evidence 3 – Problem & gap: evidence the problem exists, research gaps, proposed contribution'),
  c('Evidence 4 – Technical investigations: dataset investigation, technology/algorithm comparisons, feasibility study'),
  c('Evidence 5 – Methodology: work done identifying and justifying the R&D methodology'),
  o('Evidence 6 – Supporting: preliminary designs, experiments, prototype, source code (repo link), initial results')
];
// Titles of the separate milestones seeded earlier – removed (only if still untouched) in favour of PPRS.
const OLD_EVIDENCE_TITLES = [
  'PP Evidence Pack: Index & Submission Checklist',
  'PP Slides: Current Draft',
  'Technical Investigations & Feasibility',
  'Supporting Evidence: Designs, Prototype & Initial Results'
];

/** Adds the PP evidence checklist to the PPRS milestone and removes the earlier separate tasks. */
export const ensurePprsEvidence = async () => {
  await Task.deleteMany({
    module: 'fyp',
    title: { $in: OLD_EVIDENCE_TITLES },
    'files.0': { $exists: false },
    'links.0': { $exists: false },
    status: 'Pending'
  });

  const pprs = await Task.findOne({ module: 'fyp', title: 'PPRS' });
  if (!pprs) return;
  const labels = new Set(pprs.actions.map(a => a.label));
  PPRS_EVIDENCE_ACTIONS.filter(a => !labels.has(a.label)).forEach(a => pprs.actions.push(a));
  if (!(pprs.notes || '').includes(PPRS_EVIDENCE_MARKER)) {
    pprs.notes = pprs.notes ? `${pprs.notes}\n\n${PPRS_EVIDENCE_NOTES}` : PPRS_EVIDENCE_NOTES;
  }
  if (!pprs.deadline) pprs.deadline = PROPOSAL_DEADLINE;
  await pprs.save();
};


import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from './models/Task.js';

dotenv.config();

const initialMilestones = [
  {
    stepNumber: 1,
    title: "Research Domain & Problem Formulation",
    category: "Research Formulation",
    deadline: new Date("2026-09-28"),
    description: "Formulate the core computing research challenge, define fundamental research questions, and establish domain boundaries without assuming tools prematurely.",
    status: "Completed",
    notes: "Initial problem formulation reviewed with supervisor. Focus narrowed to automated evaluation pipelines.",
    links: [
      { label: "Overleaf: Formulation Draft", url: "https://www.overleaf.com", linkType: "overleaf" },
      { label: "Google Drive: Research Notes", url: "https://drive.google.com", linkType: "googledocs" }
    ],
    files: [],
    actions: [
      { label: "Draft initial problem statement & research questions", category: "compulsory", isCompleted: true, completedAt: new Date("2026-09-25"), isDefault: true },
      { label: "Identify key research beneficiaries & academic/industry impact", category: "mandatory", isCompleted: true, completedAt: new Date("2026-09-27"), isDefault: true },
      { label: "Conduct preliminary stakeholder interview or domain expert consult", category: "optional", isCompleted: false, isDefault: true },
      { label: "Formal patent search & freedom-to-operate inquiry", category: "not_needed", isCompleted: false, isDefault: true }
    ],
    portalSubmission: {
      portalName: "Blackboard",
      isSubmitted: true,
      submittedAt: new Date("2026-09-28"),
      submissionReference: "PR-2026-0928-OK"
    }
  },
  {
    stepNumber: 2,
    title: "Systematic Literature Review & Gap Analysis Matrix",
    category: "Research Formulation",
    deadline: new Date("2026-10-06"),
    description: "Critically review 20+ peer-reviewed papers (IEEE, ACM, Springer, arXiv), compile a comparative matrix, and identify explicit research gaps.",
    status: "In Progress",
    notes: "14 papers surveyed so far. Need 6 more papers focusing on transformer evaluation benchmarks.",
    links: [
      { label: "Google Sheets: Lit Survey Matrix", url: "https://docs.google.com/spreadsheets", linkType: "googledocs" },
      { label: "Overleaf: Lit Review Chapter", url: "https://www.overleaf.com", linkType: "overleaf" }
    ],
    files: [],
    actions: [
      { label: "Survey 20+ peer-reviewed Q1/Q2 journal and conference papers", category: "compulsory", isCompleted: true, completedAt: new Date("2026-10-04"), isDefault: true },
      { label: "Synthesize comparative matrix (Dataset, Method, Metric, Limitations)", category: "mandatory", isCompleted: true, completedAt: new Date("2026-10-05"), isDefault: true },
      { label: "Formulate explicit Research Gap statement", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Setup shared Zotero / Mendeley BibTeX reference library", category: "optional", isCompleted: true, completedAt: new Date("2026-10-01"), isDefault: true },
      { label: "Register systematic PRISMA protocol with Cochrane/PROSPERO", category: "not_needed", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    stepNumber: 3,
    title: "Research Methodology, Hypotheses & Experimental Design",
    category: "Research Formulation",
    deadline: new Date("2026-10-12"),
    description: "Specify overarching methodology (Quantitative Experimental vs Design Science Research), declare verifiable research hypotheses, and design rigorous evaluation metrics.",
    status: "Pending",
    notes: "",
    links: [
      { label: "GitHub: Experimental Framework Design", url: "https://github.com", linkType: "github" }
    ],
    files: [],
    actions: [
      { label: "Select research methodology paradigm (e.g. Design Science / Empirical)", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Formulate primary hypotheses (H0 / H1) and quantitative validation metrics", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Specify state-of-the-art baselines for comparative evaluation", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Design ablation study protocol for model components", category: "optional", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    stepNumber: 4,
    title: "Ethical Approval, LESP & Data Governance",
    category: "PPRS",
    deadline: new Date("2026-10-16"),
    description: "Complete university Legal, Ethical, Social, Professional (LESP) review, ensure GDPR data compliance, and sign EDI statements.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Blackboard: University Ethics Portal", url: "https://blackboard.leicester.ac.uk", linkType: "blackboard" }
    ],
    files: [],
    actions: [
      { label: "Submit university LESP risk assessment questionnaire", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Verify GDPR compliance & data licensing terms for all external corpora", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Complete Equality, Diversity & Inclusion (EDI) checklist", category: "optional", isCompleted: false, isDefault: true },
      { label: "NHS / Clinical human trials ethics board submission", category: "not_needed", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    stepNumber: 5,
    title: "PPRS Formative Submission & Supervisor Interim Critique",
    category: "PPRS",
    deadline: new Date("2026-10-19"),
    description: "Submit preliminary project proposal draft, presentation slide outline, and initial Gantt chart to supervisor for formative critique.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Overleaf: PPRS Proposal Draft", url: "https://www.overleaf.com", linkType: "overleaf" },
      { label: "Google Slides: Pitch Deck Draft", url: "https://docs.google.com/presentation", linkType: "slides" }
    ],
    files: [],
    actions: [
      { label: "Submit 5-page formative proposal document draft to supervisor", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Include detailed Work Breakdown Structure (WBS) & Gantt chart", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Schedule and complete supervisor critique discussion session", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Log formative feedback revisions into track changes document", category: "optional", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    stepNumber: 6,
    title: "PPRS Summative Submission (Final Proposal)",
    category: "PPRS",
    deadline: new Date("2026-11-05"),
    description: "Submit finalized PPRS Report, LESP/EDI approvals, work schedule, and pitch slides through the official university portal.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Blackboard: PPRS Summative Dropbox", url: "https://blackboard.leicester.ac.uk", linkType: "blackboard" },
      { label: "Turnitin: Similarity Check", url: "https://www.turnitin.com", linkType: "turnitin" }
    ],
    files: [],
    actions: [
      { label: "Finalize PPRS proposal document incorporating formative critique", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Perform Turnitin plagiarism similarity check (< 15% threshold)", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Submit official PDF to Blackboard assessment portal", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Record portal submission receipt number in tracking system", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Prepare backup copy of submission archive on cloud storage", category: "optional", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    stepNumber: 7,
    title: "Dataset Acquisition, Preprocessing & EDA",
    category: "IPD",
    deadline: new Date("2026-12-08"),
    description: "Acquire raw benchmark datasets, execute cleaning, tokenization, stratified train/val/test splits, and conduct exploratory statistical distribution analysis.",
    status: "Pending",
    notes: "",
    links: [
      { label: "GitHub: Data Cleaning Pipeline", url: "https://github.com", linkType: "github" },
      { label: "OneDrive: Raw Dataset Archive", url: "https://onedrive.live.com", linkType: "onedrive" }
    ],
    files: [],
    actions: [
      { label: "Acquire and verify checksum of raw benchmark datasets", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Implement reproducible preprocessing & pipeline script", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Generate Exploratory Data Analysis (EDA) visualizations & summary statistics", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Apply data augmentation / synthetic balancing techniques", category: "optional", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    stepNumber: 8,
    title: "Core Prototype Architecture & Pipeline Implementation",
    category: "IPD",
    deadline: new Date("2027-01-15"),
    description: "Implement core algorithm/architecture, establish Git version control workflow, and train initial functional baseline models.",
    status: "Pending",
    notes: "",
    links: [
      { label: "GitHub: Core System Repo", url: "https://github.com", linkType: "github" }
    ],
    files: [],
    actions: [
      { label: "Implement core architecture / algorithm prototype in code", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Establish version-controlled repository with clean branch strategy", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Train baseline model and achieve non-trivial convergence metrics", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Setup automated experiment logging (WandB / MLflow / TensorBoard)", category: "optional", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    stepNumber: 9,
    title: "Interim Project Demonstration (IPD)",
    category: "IPD",
    deadline: new Date("2027-01-28"),
    description: "Conduct live interim software/pipeline demonstration before academic panel, proving working prototype feasibility against initial baselines.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Google Slides: IPD Presentation", url: "https://docs.google.com/presentation", linkType: "slides" },
      { label: "Blackboard: IPD Progress Submission", url: "https://blackboard.leicester.ac.uk", linkType: "blackboard" }
    ],
    files: [],
    actions: [
      { label: "Prepare 15-minute live working demonstration of core pipeline", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Present preliminary empirical benchmarks comparing proposed method vs baselines", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Submit IPD interim progress report to portal", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Secure formal supervisor interim demonstration signoff", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Record offline backup screencast video of demo in case of live failure", category: "optional", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    stepNumber: 10,
    title: "Rigorous Benchmarking, Ablation Studies & Statistical Testing",
    category: "Dissertation",
    deadline: new Date("2027-02-28"),
    description: "Execute comprehensive benchmarking suite on held-out evaluation datasets, conduct deep ablation studies, and perform statistical hypothesis testing.",
    status: "Pending",
    notes: "",
    links: [
      { label: "GitHub: Benchmarking Notebooks", url: "https://github.com", linkType: "github" }
    ],
    files: [],
    actions: [
      { label: "Run repeated benchmark evaluations across multiple test folds/seeds", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Execute component-level ablation studies to isolate individual contributions", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Perform statistical significance tests (p-values, paired t-tests, Wilcoxon)", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Document qualitative error analysis and systematic failure case studies", category: "optional", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    stepNumber: 11,
    title: "Dissertation Drafting, Plagiarism Scan & Supervisor Review",
    category: "Dissertation",
    deadline: new Date("2027-03-20"),
    description: "Write full dissertation draft (Introduction, Literature Review, Methodology, Implementation, Evaluation, Discussion, Conclusion) and refine with supervisor.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Overleaf: Master Dissertation Project", url: "https://www.overleaf.com", linkType: "overleaf" },
      { label: "Turnitin: Draft Review Scanner", url: "https://www.turnitin.com", linkType: "turnitin" }
    ],
    files: [],
    actions: [
      { label: "Complete all 7 dissertation chapters in professional LaTeX template", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Perform draft Turnitin similarity check and resolve overlapping phrases", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Submit full draft to project supervisor and integrate feedback", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Audit all figure captions, mathematical notations, and bib citations", category: "mandatory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    stepNumber: 12,
    title: "Final Project Submission (Dissertation, Code & Video Archive)",
    category: "Dissertation",
    deadline: new Date("2027-04-05"),
    description: "Submit camera-ready Dissertation PDF, tagged GitHub repository release, and high-definition video walkthrough to the official examination portal.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Blackboard: Final Dissertation Dropbox", url: "https://blackboard.leicester.ac.uk", linkType: "blackboard" },
      { label: "GitHub: Release v1.0.0 Tag", url: "https://github.com", linkType: "github" },
      { label: "OneDrive: Video & Artifact Archive", url: "https://onedrive.live.com", linkType: "onedrive" }
    ],
    files: [],
    actions: [
      { label: "Upload camera-ready Dissertation PDF to official university portal", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Publish clean GitHub release tag with thorough README and setup instructions", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Record and upload 5-minute video demonstration walk-through", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Archive pre-trained model weights, evaluation tables, and seed logs", category: "optional", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    stepNumber: 13,
    title: "Final Viva Voce Defence & Oral Examination",
    category: "Viva Prep",
    deadline: new Date("2027-04-19"),
    description: "Prepare professional slide deck, practice technical defense of design decisions and theoretical trade-offs, and conduct oral defense before examiners.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Google Slides: Viva Defense Deck", url: "https://docs.google.com/presentation", linkType: "slides" },
      { label: "Overleaf: Defense Cheatsheet & Formulas", url: "https://www.overleaf.com", linkType: "overleaf" }
    ],
    files: [],
    actions: [
      { label: "Prepare 20-minute defense presentation deck with key architectural highlights", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Rehearse defense answering critical theoretical and statistical justifications", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Conduct mock viva session with peers or research lab members", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Prepare offline live demo contingency with recorded video fallback", category: "optional", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Task.deleteMany({});
    await Task.insertMany(initialMilestones);
    console.log(`Seeded ${initialMilestones.length} comprehensive FYP research milestones successfully.`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();

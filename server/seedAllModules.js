import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from './models/Task.js';

dotenv.config();

export const fypMilestones = [
  {
    module: "fyp",
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
    module: "fyp",
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
    module: "fyp",
    stepNumber: 3,
    title: "Research Methodology, Hypotheses & Experimental Design",
    category: "Research Formulation",
    deadline: new Date("2026-10-12"),
    description: "Formulate falsifiable hypotheses, define quantitative success metrics (F1, BLEU, latency, P99), and design reproducible experimental protocols.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Overleaf: Methodology Chapter", url: "https://www.overleaf.com", linkType: "overleaf" }
    ],
    files: [],
    actions: [
      { label: "State primary null (H0) and alternative (H1) hypotheses mathematically", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Establish quantitative evaluation benchmark metrics", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Specify baseline state-of-the-art models for comparative evaluation", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Draft reproducible ablation study plan", category: "optional", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "fyp",
    stepNumber: 4,
    title: "LESP (Legal, Ethical, Social, Professional) & Ethics Approval",
    category: "PPRS",
    deadline: new Date("2026-10-19"),
    description: "Conduct thorough LESP impact evaluation, evaluate GDPR/data governance risks, AI fairness/bias, and secure institutional ethics clearance.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Blackboard: Ethics Form Submission", url: "https://blackboard.leicester.ac.uk", linkType: "blackboard" }
    ],
    files: [],
    actions: [
      { label: "Complete Institutional Research Ethics Assessment Form", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Formulate GDPR Data Privacy Impact Assessment (DPIA)", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Draft informed participant consent form if human studies involved", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Obtain formal supervisor signature on Ethics Application", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "fyp",
    stepNumber: 5,
    title: "PPRS Draft Review & Supervisor Formative Feedback",
    category: "PPRS",
    deadline: new Date("2026-10-26"),
    description: "Consolidate the complete Project Proposal and Research Specification (PPRS) draft and incorporate supervisor critique.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Overleaf: PPRS Working Document", url: "https://www.overleaf.com", linkType: "overleaf" }
    ],
    files: [],
    actions: [
      { label: "Deliver full PPRS draft to supervisor 10 days before final deadline", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Execute formal 1-on-1 supervisory review meeting", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Address all formative comments into revised draft", category: "mandatory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "fyp",
    stepNumber: 6,
    title: "Official PPRS Submission to Blackboard Portal",
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
      { label: "Record portal submission receipt number in tracking system", category: "mandatory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "fyp",
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
      { label: "Ingest raw corpus and verify data integrity & checksum hashes", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Execute statistical distribution and outlier detection analysis", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Apply stratified partitioning into train, validation, and test sets", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "fyp",
    stepNumber: 8,
    title: "Interim Prototype Demonstration (IPD)",
    category: "IPD",
    deadline: new Date("2027-01-18"),
    description: "Demonstrate a working minimum viable prototype to the examination panel showing end-to-end data ingestion, core inference pipeline, and preliminary results.",
    status: "Pending",
    notes: "",
    links: [
      { label: "GitHub: Prototype Branch", url: "https://github.com", linkType: "github" },
      { label: "Blackboard: IPD Slide Submission", url: "https://blackboard.leicester.ac.uk", linkType: "blackboard" }
    ],
    files: [],
    actions: [
      { label: "Implement working baseline pipeline end-to-end", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Prepare 15-minute live demo and slide presentation for panel", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Record backup screencast video demo in case of live environment failure", category: "mandatory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "fyp",
    stepNumber: 9,
    title: "Final Dissertation & Thesis Submission",
    category: "Dissertation",
    deadline: new Date("2027-03-30"),
    description: "Consolidate complete dissertation thesis (12,000 - 15,000 words), technical documentation, evaluation graphs, camera-ready PDF, and code repository release tag.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Blackboard: Final Dissertation Dropbox", url: "https://blackboard.leicester.ac.uk", linkType: "blackboard" },
      { label: "GitHub: Release v1.0.0 Tag", url: "https://github.com", linkType: "github" }
    ],
    files: [],
    actions: [
      { label: "Upload camera-ready Dissertation PDF to official university portal", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Publish clean GitHub release tag with thorough README and setup instructions", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Record and upload 5-minute video demonstration walk-through", category: "mandatory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "fyp",
    stepNumber: 10,
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
      { label: "Conduct mock viva session with peers or research lab members", category: "mandatory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  }
];

export const appliedAiTasks = [
  {
    module: "applied-ai",
    stepNumber: 1,
    title: "Week 1: Introduction to AI, Philosophical Foundations & Google Colab Setup",
    category: "Week 1 - Foundations",
    deadline: new Date("2026-10-18"),
    description: "Definitions of AI, Turing Test, Philosophical & Ethical Foundations, University GenAI Policies, Google Colab Setup, Python Scientific Stack (NumPy, Pandas, Matplotlib).",
    status: "Completed",
    notes: "Completed Colab environment configuration and NumPy tensor baseline exercises.",
    links: [
      { label: "AIMA Textbook: Ch 1 (Russell & Norvig, 4th Ed.)", url: "https://aima.cs.berkeley.edu", linkType: "paper" },
      { label: "Google Colab Welcome Guide", url: "https://colab.research.google.com", linkType: "googledocs" },
      { label: "Python Data Science Handbook", url: "https://jakevdp.github.io/PythonDataScienceHandbook/", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Review Lecture 1 slides covering AI history, module policies, and academic integrity guidelines", category: "compulsory", isCompleted: true, completedAt: new Date("2026-10-12"), isDefault: true },
      { label: "Complete Tutorial 01 discussion questions on philosophical definitions of intelligence and ethics", category: "mandatory", isCompleted: true, completedAt: new Date("2026-10-14"), isDefault: true },
      { label: "Execute Guided Tutorial 01 in Google Colab: NumPy array operations & Matplotlib plotting", category: "compulsory", isCompleted: true, completedAt: new Date("2026-10-15"), isDefault: true },
      { label: "Fill out Student Worksheet 1 analyzing AI usability metrics and project planning", category: "optional", isCompleted: true, completedAt: new Date("2026-10-16"), isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: true, submittedAt: new Date("2026-10-16"), submissionReference: "AI-W01-DONE" }
  },
  {
    module: "applied-ai",
    stepNumber: 2,
    title: "Week 2: Intelligent Agents & Task Environments",
    category: "Week 2 - Agents & PEAS",
    deadline: new Date("2026-10-25"),
    description: "Agent Architectures (Simple Reflex, Model-based, Goal-based, Utility-based), PEAS Framework, Task Environment Properties (Deterministic, Stochastic, Static, Dynamic), Vacuum World Agent.",
    status: "In Progress",
    notes: "Implementing Vacuum World state transitions in Python notebook.",
    links: [
      { label: "AIMA Textbook: Ch 2 Intelligent Agents & PEAS", url: "https://aima.cs.berkeley.edu", linkType: "paper" },
      { label: "Stanford CS221 AI Course Materials", url: "https://stanford-cs221.github.io", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Study Lecture 2 detailing agent structures, environmental taxonomy, and rationality", category: "compulsory", isCompleted: true, completedAt: new Date("2026-10-20"), isDefault: true },
      { label: "Complete Guided Tutorial 02 defining PEAS specifications for autonomous delivery drones & medical systems", category: "mandatory", isCompleted: true, completedAt: new Date("2026-10-22"), isDefault: true },
      { label: "Solve Tutorial Week 3 exercises coding reflex agent decision rules for Vacuum World in Python", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "applied-ai",
    stepNumber: 3,
    title: "Week 3: Problem Solving & Uninformed / Informed Search Algorithms",
    category: "Week 3 - Search Algorithms",
    deadline: new Date("2026-11-01"),
    description: "State Space Graphs, Breadth-First Search (BFS), Depth-First Search (DFS), Uniform Cost Search (UCS), A* Search Algorithm, Heuristic Admissibility and Consistency.",
    status: "Pending",
    notes: "",
    links: [
      { label: "AIMA Search Python Code Repository (GitHub)", url: "https://github.com/aimacode/aima-python", linkType: "github" },
      { label: "VisuAlgo Graph Search Visualizer", url: "https://visualgo.net/en/dfsbfs", linkType: "other" },
      { label: "AIMA Exercises Portal", url: "https://aimacode.github.io/aima-exercises/", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Review Lecture 3 algorithms and time/space complexity trade-offs", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Follow Guided Tutorial Search using Romania map problem to trace BFS, DFS, and A*", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Complete Tutorial Week 4-1 worksheet computing path costs and proving heuristic admissibility", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "applied-ai",
    stepNumber: 4,
    title: "Week 4: Adversarial Search & Game Playing",
    category: "Week 4 - Game Playing",
    deadline: new Date("2026-11-08"),
    description: "Game Trees, Zero-Sum Competitive Games, Minimax Algorithm, Alpha-Beta Pruning, Evaluation Functions, Depth-Limited Search (Tic-Tac-Toe, Chess).",
    status: "Pending",
    notes: "",
    links: [
      { label: "AIMA Textbook: Ch 5 Adversarial Search and Games", url: "https://aima.cs.berkeley.edu", linkType: "paper" },
      { label: "MIT OpenCourseWare AI Games Lecture", url: "https://ocw.mit.edu", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Study Lecture 4 on adversarial decision-making against rational opponents", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Work through Guided Tutorial Adversarial Search: manually prune game tree nodes using Alpha-Beta cutoffs", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Code Minimax with depth cutoffs for Tic-Tac-Toe in Python", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "applied-ai",
    stepNumber: 5,
    title: "Weeks 5 & 6: Knowledge Representation, Logic & Reasoning",
    category: "Weeks 5-6 - Logic & Reasoning",
    deadline: new Date("2026-11-22"),
    description: "Propositional Logic, First-Order Logic (FOL), Truth Tables, Modus Ponens, Forward and Backward Chaining, Conjunctive Normal Form (CNF), Resolution Proofs, Prolog intro.",
    status: "Pending",
    notes: "",
    links: [
      { label: "AIMA Textbook: Ch 7 & 8 Logical Agents & FOL", url: "https://aima.cs.berkeley.edu", linkType: "paper" },
      { label: "SWI-Prolog Official Portal", url: "https://www.swi-prolog.org", linkType: "other" },
      { label: "Stanford Logic Toolkit", url: "http://logic.stanford.edu", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Study Lecture 05 logic syntax, quantifiers (∀, ∃), and resolution mechanisms", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Complete Guided Tutorial Logic translating English statements into FOL and building truth tables", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Solve Tutorial Week 5-6 exercises converting logic expressions to CNF and executing clause resolution proofs", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "applied-ai",
    stepNumber: 6,
    title: "Week 7: Machine Learning Foundations & Supervised/Unsupervised Models",
    category: "Week 7 - Machine Learning",
    deadline: new Date("2026-11-29"),
    description: "Supervised vs Unsupervised ML, Linear & Logistic Regression, Decision Trees, K-Nearest Neighbors (KNN), K-Means Clustering, Model Metrics (Accuracy, Precision, Recall, Confusion Matrix).",
    status: "Pending",
    notes: "",
    links: [
      { label: "Scikit-Learn Official User Guide", url: "https://scikit-learn.org", linkType: "other" },
      { label: "Andrew Ng Machine Learning Specialization", url: "https://www.coursera.org", linkType: "other" },
      { label: "Kaggle Learn ML Micro-Courses", url: "https://www.kaggle.com/learn", linkType: "dataset" }
    ],
    files: [],
    actions: [
      { label: "Review Lecture 7 machine learning pipeline, train/test dataset splitting, and loss functions", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Execute Guided Tutorial ML in Colab: train Scikit-Learn models on Iris classification & Housing datasets", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Solve Tutorial Week 7 worksheet scenarios selecting appropriate ML models for industry tasks", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "applied-ai",
    stepNumber: 7,
    title: "Week 8: Artificial Neural Networks (ANNs) & Backpropagation Calculus",
    category: "Week 8 - Neural Networks",
    deadline: new Date("2026-12-06"),
    description: "Biological vs Artificial Neurons, Perceptron Model, Multi-Layer Perceptrons (MLPs), Activation Functions (Sigmoid, ReLU, Tanh), Forward Propagation, Gradient Descent, Backpropagation math.",
    status: "Pending",
    notes: "",
    links: [
      { label: "3Blue1Brown Neural Networks Series", url: "https://www.3blue1brown.com", linkType: "slides" },
      { label: "TensorFlow Playground Web Visualizer", url: "https://playground.tensorflow.org", linkType: "other" },
      { label: "DeepLearning.AI Neural Networks Course", url: "https://www.deeplearning.ai", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Study Lecture 8 and supporting PowerPoint slides on ANN architecture and loss optimization", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Work through Tutorial Week 8-1 perceptron exercises manually calculating weight updates step-by-step", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Verify manual weight calculation results against official Solution Sheet 8", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "applied-ai",
    stepNumber: 8,
    title: "Week 9: Computer Vision & Convolutional Neural Networks (CNNs)",
    category: "Week 9 - Computer Vision",
    deadline: new Date("2026-12-13"),
    description: "Digital Image Filters, Spatial Convolutions, Stride, Padding, Pooling layers (Max/Average), Receptive Fields, CNN Architectures (LeNet, AlexNet, VGG, ResNet), Image Classification.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Stanford CS231n Computer Vision Course Notes", url: "https://cs231n.stanford.edu", linkType: "other" },
      { label: "PyTorch Official CNN Tutorial", url: "https://pytorch.org/tutorials", linkType: "other" },
      { label: "CNN Explainer 3D Interactive Web App", url: "https://poloclub.github.io/cnn-explainer/", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Study Lecture slides on feature hierarchies, spatial feature maps, and CNN structures", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Execute Guided Tutorial Computer Vision: train Keras CNN on MNIST handwritten digits in Colab", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Complete Tutorial Week 10 CNN worksheet computing feature map dimensions (kernel, stride, padding)", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "applied-ai",
    stepNumber: 9,
    title: "Week 10: Generative AI, Large Language Models (LLMs) & Transformers",
    category: "Week 10 - Generative AI & LLMs",
    deadline: new Date("2026-12-20"),
    description: "Generative vs Discriminative AI, Variational Autoencoders (VAEs), Generative Adversarial Networks (GANs), Transformer Architecture (Self-Attention mechanism, Encoder-Decoder), LLM Fine-tuning, Prompt Engineering, Gemini API.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Hugging Face Free LLM Course", url: "https://huggingface.co/learn", linkType: "other" },
      { label: "Illustrated Transformer by Jay Alammar", url: "https://jalammar.github.io/illustrated-transformer/", linkType: "other" },
      { label: "Google Gemini API Developer Portal", url: "https://ai.google.dev", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Study Lecture 10 on Transformers, self-attention equations, and GAN generator-discriminator dynamics", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Complete Guided Tutorial LLM & Gen AI: text tokenization with NLTK and Google Gemini API integration", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Work through Tutorial Week GenAI LLMs fine-tuning models with Hugging Face Transformers", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "applied-ai",
    stepNumber: 10,
    title: "Week 11: Reinforcement Learning (RL) & Q-Learning",
    category: "Week 11 - Reinforcement Learning",
    deadline: new Date("2027-01-10"),
    description: "Markov Decision Processes (MDPs), State-Action-Reward-State-Action (SARSA), Exploration vs Exploitation (ε-greedy), Q-Table updates, Discount factor (γ), Temporal Difference (TD) learning.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Sutton & Barto RL Book (2nd Ed. PDF)", url: "http://incompleteideas.net/book/the-book-2nd.html", linkType: "paper" },
      { label: "Gymnasium (OpenAI Gym) API Documentation", url: "https://gymnasium.farama.org", linkType: "other" },
      { label: "Hugging Face Deep RL Course", url: "https://huggingface.co/learn/deep-rl-course", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Study Reinforcement Learning lecture slides covering MDP formulation and Bellman equations", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Work through RL Tutorial sheet calculating Q-value updates for gridworld state transitions", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Verify manual Q-table updates using official RL Tutorial Solutions sheet & run Python simulation", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "applied-ai",
    stepNumber: 11,
    title: "Week 12: Comprehensive Revision & Exam Preparation",
    category: "Week 12 - Revision & Exam Prep",
    deadline: new Date("2027-01-17"),
    description: "Comprehensive synthesis of all 10 module themes, exam-style theoretical questions, calculation practice across search, logic, perceptron math, CNN dimensioning, and Q-value updates.",
    status: "Pending",
    notes: "",
    links: [
      { label: "AIMA Exercises Online Database", url: "https://aimacode.github.io/aima-exercises/", linkType: "other" },
      { label: "Papers with Code Benchmarks Portal", url: "https://paperswithcode.com", linkType: "paper" }
    ],
    files: [],
    actions: [
      { label: "Re-solve all tutorial worksheet math problems under timed exam conditions", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Verify step-by-step working against official solution guides", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Construct summary cheat sheets for key formulas (A*, FOL inference, Backprop, CNN dimensions, Bellman Q-update)", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  }
];

export const usabilityTestingTasks = [
  {
    module: "usability-testing",
    stepNumber: 1,
    title: "Heuristic Evaluation & Nielsen's 10 Usability Principles",
    category: "Phase 1 - Heuristics",
    deadline: new Date("2026-10-22"),
    description: "Systematic expert evaluation of software interfaces against Jakob Nielsen's 10 Usability Heuristics, documenting severity ratings (0 to 4) and defect logs.",
    status: "Completed",
    notes: "Identified 6 critical usability flaws in navigation hierarchy and feedback visibility.",
    links: [
      { label: "Nielsen Norman Group: 10 Usability Heuristics", url: "https://www.nngroup.com/articles/ten-usability-heuristics/", linkType: "paper" }
    ],
    files: [],
    actions: [
      { label: "Conduct individual heuristic inspection of target application", category: "compulsory", isCompleted: true, completedAt: new Date("2026-10-18"), isDefault: true },
      { label: "Compile Nielsen Severity Matrix with screenshot evidence", category: "mandatory", isCompleted: true, completedAt: new Date("2026-10-20"), isDefault: true },
      { label: "Draft initial remediation recommendation list", category: "mandatory", isCompleted: true, completedAt: new Date("2026-10-21"), isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: true, submittedAt: new Date("2026-10-21"), submissionReference: "UTE-CW1-PASS" }
  },
  {
    module: "usability-testing",
    stepNumber: 2,
    title: "User Personas, Empathy Maps & User Journey Blueprints",
    category: "Phase 2 - User Modeling",
    deadline: new Date("2026-11-05"),
    description: "Construct empirical user personas representing distinct user cohorts, design mental models, empathy maps, and end-to-end task journey workflows.",
    status: "In Progress",
    notes: "Drafting primary persona for novice users and secondary persona for power administrators.",
    links: [
      { label: "Figma: Persona & Journey Map Canvas", url: "https://www.figma.com", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Synthesize user interview data into 2 distinct persona profiles", category: "compulsory", isCompleted: true, completedAt: new Date("2026-11-01"), isDefault: true },
      { label: "Design complete User Journey Map highlighting friction points", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Formulate task scenario scripts for usability lab testing", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "usability-testing",
    stepNumber: 3,
    title: "Usability Test Protocol, Participant Recruitment & Ethics",
    category: "Phase 3 - Test Planning",
    deadline: new Date("2026-11-19"),
    description: "Author comprehensive usability test plan, participant screening questionnaire, informed consent forms, and secure ethics approval.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Blackboard: Usability Protocol Submission", url: "https://blackboard.leicester.ac.uk", linkType: "blackboard" }
    ],
    files: [],
    actions: [
      { label: "Define standardized test tasks with clear success criteria", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Draft Participant Information Sheet & Consent Form (GDPR compliant)", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Recruit 5-8 representative test participants across target cohorts", category: "mandatory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "usability-testing",
    stepNumber: 4,
    title: "Think-Aloud Lab Testing & Qualitative Observation Sessions",
    category: "Phase 4 - Lab Execution",
    deadline: new Date("2026-12-03"),
    description: "Conduct moderated think-aloud usability testing sessions, capture screen recordings, note critical incidents, error frequencies, and task completion times.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Google Drive: Lab Video & Screen Recordings", url: "https://drive.google.com", linkType: "googledocs" }
    ],
    files: [],
    actions: [
      { label: "Execute moderated think-aloud test sessions with participants", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Log observer notes on time-on-task, slips, and mistakes", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Debrief participants with post-task open interview questions", category: "optional", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "usability-testing",
    stepNumber: 5,
    title: "Quantitative UX Metrics (SUS, NASA-TLX) & Statistical Synthesis",
    category: "Phase 5 - Metrics & Analysis",
    deadline: new Date("2026-12-17"),
    description: "Administer System Usability Scale (SUS) questionnaires, compute percentile rankings, calculate NASA-TLX cognitive workload, and compute task completion rates.",
    status: "Pending",
    notes: "",
    links: [
      { label: "SUS Score Benchmark Calculator", url: "https://measuringu.com/sus/", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Calculate standardized SUS scores for all participant submissions", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Compute descriptive statistics (mean, median, standard deviation)", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Synthesize quantitative findings into visual summary charts", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "usability-testing",
    stepNumber: 6,
    title: "WCAG 2.2 Accessibility Audit & Final Evaluation Report",
    category: "Phase 6 - Final Portfolio",
    deadline: new Date("2027-01-14"),
    description: "Perform automated and manual accessibility audits against WCAG 2.2 Level AA guidelines, and compile the final summative evaluation portfolio.",
    status: "Pending",
    notes: "",
    links: [
      { label: "W3C Web Accessibility Initiative (WCAG 2.2)", url: "https://www.w3.org/WAI/standards-guidelines/wcag/", linkType: "other" },
      { label: "Blackboard: Final Coursework Dropbox", url: "https://blackboard.leicester.ac.uk", linkType: "blackboard" }
    ],
    files: [],
    actions: [
      { label: "Run Axe / WAVE automated accessibility scans on core user journeys", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Verify screen-reader navigation and keyboard-only focus states", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Submit final comprehensive 4,000-word Usability Evaluation Report", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  }
];

export const devopsTasks = [
  {
    module: "devops",
    stepNumber: 1,
    title: "Git Branching Strategy, Trunk-Based Development & Semantic Release",
    category: "Phase 1 - Version Control",
    deadline: new Date("2026-10-24"),
    description: "Establish robust version control standards, configure branch protection rules, conventional commits, and automated semantic version tagging.",
    status: "Completed",
    notes: "Repository branch protection configured with required pull request reviews.",
    links: [
      { label: "GitHub: Workflow Repository Template", url: "https://github.com", linkType: "github" }
    ],
    files: [],
    actions: [
      { label: "Configure protected main branch with mandatory PR review approvals", category: "compulsory", isCompleted: true, completedAt: new Date("2026-10-21"), isDefault: true },
      { label: "Setup Commitlint and Husky git hooks for conventional commits", category: "mandatory", isCompleted: true, completedAt: new Date("2026-10-22"), isDefault: true },
      { label: "Establish automated changelog generation with semantic-release", category: "optional", isCompleted: true, completedAt: new Date("2026-10-23"), isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: true, submittedAt: new Date("2026-10-23"), submissionReference: "DO-W01-PASSED" }
  },
  {
    module: "devops",
    stepNumber: 2,
    title: "Docker Containerization & Multi-Stage Production Builds",
    category: "Phase 2 - Containerization",
    deadline: new Date("2026-11-07"),
    description: "Author optimized Dockerfiles utilizing multi-stage builds, non-root security contexts, minimal Alpine/Distroless bases, and Docker Compose environments.",
    status: "In Progress",
    notes: "Client and server multi-stage builds running cleanly under Docker Compose.",
    links: [
      { label: "Docker Hub / Registry", url: "https://hub.docker.com", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Write multi-stage Dockerfile separating build dependencies from runtime", category: "compulsory", isCompleted: true, completedAt: new Date("2026-11-03"), isDefault: true },
      { label: "Configure non-root user execution in production container image", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Test local multi-container orchestration with Docker Compose", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "devops",
    stepNumber: 3,
    title: "Automated CI/CD Pipelines (GitHub Actions / GitLab CI)",
    category: "Phase 3 - CI/CD Automation",
    deadline: new Date("2026-11-21"),
    description: "Implement continuous integration workflow with automated linting, unit testing, container vulnerability scanning (Trivy), and automated registry pushes.",
    status: "Pending",
    notes: "",
    links: [
      { label: "GitHub Actions: Pipeline Workflow", url: "https://github.com", linkType: "github" }
    ],
    files: [],
    actions: [
      { label: "Create GitHub Actions workflow matrix for automated testing", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Integrate security vulnerability container scanner (Trivy / Snyk)", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Automate build artifact generation and automated container registry push", category: "mandatory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "devops",
    stepNumber: 4,
    title: "Infrastructure as Code (IaC) with Terraform & Cloud Setup",
    category: "Phase 4 - Cloud Infrastructure",
    deadline: new Date("2026-12-05"),
    description: "Declare modular cloud infrastructure using Terraform, configure remote state with state-locking, and provision secure VPC networks and databases.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Terraform Documentation Portal", url: "https://developer.hashicorp.com/terraform", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Write reusable Terraform modules for networking and compute", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Configure remote backend with encrypted S3/GCS bucket and DynamoDB locking", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Execute dry-run terraform plan and automated validation checks", category: "mandatory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "devops",
    stepNumber: 5,
    title: "Kubernetes Orchestration, Helm Charts & Cluster Deployment",
    category: "Phase 5 - Kubernetes",
    deadline: new Date("2026-12-19"),
    description: "Deploy microservices to Kubernetes cluster with Deployments, StatefulSets, Ingress controllers, Horizontal Pod Autoscaling (HPA), and Helm charts.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Kubernetes Documentation", url: "https://kubernetes.io/docs/", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Package application into parameterized Helm Chart", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Define Horizontal Pod Autoscaler (HPA) resource limits and probes", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Configure Ingress TLS termination and cert-manager automation", category: "mandatory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "devops",
    stepNumber: 6,
    title: "Observability Stack (Prometheus, Grafana) & Production Chaos Drill",
    category: "Phase 6 - Observability & Ops",
    deadline: new Date("2027-01-16"),
    description: "Deploy Prometheus scraping, Grafana alert dashboards, structured logging, distributed tracing, and conduct a simulated service failover drill.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Grafana Cloud / Dashboards", url: "https://grafana.com", linkType: "other" },
      { label: "Blackboard: DevOps Summative Submission", url: "https://blackboard.leicester.ac.uk", linkType: "blackboard" }
    ],
    files: [],
    actions: [
      { label: "Export application Prometheus metrics endpoint (/metrics)", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Build real-time Grafana dashboard tracking request latency & error rate", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Submit final DevOps Architecture and Pipeline Coursework Report", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  }
];

export const cyberSecurityTasks = [
  {
    module: "cyber-security",
    stepNumber: 1,
    title: "Threat Modeling, Attack Surfaces & STRIDE Framework",
    category: "Phase 1 - Threat Modeling",
    deadline: new Date("2026-10-23"),
    description: "Construct threat models for web and distributed software using the STRIDE methodology (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege).",
    status: "Completed",
    notes: "STRIDE analysis completed for authentication service and API gateway.",
    links: [
      { label: "OWASP Threat Dragon Portal", url: "https://owasp.org/www-project-threat-dragon/", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Construct Data Flow Diagram (DFD) identifying trust boundaries", category: "compulsory", isCompleted: true, completedAt: new Date("2026-10-19"), isDefault: true },
      { label: "Categorize 15+ potential threat scenarios across STRIDE categories", category: "compulsory", isCompleted: true, completedAt: new Date("2026-10-21"), isDefault: true },
      { label: "Formulate mitigation countermeasures for highest severity threats", category: "mandatory", isCompleted: true, completedAt: new Date("2026-10-22"), isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: true, submittedAt: new Date("2026-10-22"), submissionReference: "SEC-TM-COMPLETE" }
  },
  {
    module: "cyber-security",
    stepNumber: 2,
    title: "Network Traffic Analysis, Packet Crafting & Wireshark Diagnostics",
    category: "Phase 2 - Network Security",
    deadline: new Date("2026-11-06"),
    description: "Capture and dissect raw network packet traces (.pcap) using Wireshark, analyze TCP handshakes, TLS handshakes, ARP spoofing, and rogue DNS queries.",
    status: "In Progress",
    notes: "Analyzing suspicious ARP broadcast storm in captured pcap sample.",
    links: [
      { label: "Wireshark Sample Captures", url: "https://wiki.wireshark.org/SampleCaptures", linkType: "dataset" }
    ],
    files: [],
    actions: [
      { label: "Inspect unencrypted protocol leaks (HTTP, FTP, Telnet) in packet captures", category: "compulsory", isCompleted: true, completedAt: new Date("2026-11-02"), isDefault: true },
      { label: "Identify malicious signature patterns in suspicious network dump", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Document firewall rules (iptables / ufw) to block rogue traffic", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "cyber-security",
    stepNumber: 3,
    title: "Web Application Pentesting & OWASP Top 10 Vulnerability Mitigation",
    category: "Phase 3 - Web Pentesting",
    deadline: new Date("2026-11-20"),
    description: "Perform authorized penetration testing against vulnerable web targets (Juice Shop / DVWA), exploiting and remediating SQL Injection, XSS, CSRF, and Broken Access Control.",
    status: "Pending",
    notes: "",
    links: [
      { label: "OWASP Top 10 Official Documentation", url: "https://owasp.org/Top10/", linkType: "paper" },
      { label: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Execute authorized penetration test on test environment using Burp Suite", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Demonstrate SQL Injection exploit and implement parameterized query fix", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Verify Content Security Policy (CSP) headers against Cross-Site Scripting (XSS)", category: "mandatory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "cyber-security",
    stepNumber: 4,
    title: "Applied Cryptography, Public Key Infrastructure (PKI) & TLS",
    category: "Phase 4 - Cryptography",
    deadline: new Date("2026-12-04"),
    description: "Implement symmetric (AES-GCM) and asymmetric (RSA/ECC) encryption routines, digital signatures, hashing (SHA-256/bcrypt), and X.509 certificate chains.",
    status: "Pending",
    notes: "",
    links: [
      { label: "OpenSSL Cryptography Toolkit", url: "https://www.openssl.org", linkType: "other" }
    ],
    files: [],
    actions: [
      { label: "Generate CA root certificate and issue signed server leaf certificate", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Implement salted password hashing with work-factor tuning using bcrypt/Argon2", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Prove cryptographic non-repudiation with RSA digital signatures", category: "mandatory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "cyber-security",
    stepNumber: 5,
    title: "Identity & Access Management (IAM), RBAC & Zero Trust Architecture",
    category: "Phase 5 - Zero Trust & IAM",
    deadline: new Date("2026-12-18"),
    description: "Design Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC) policies, Multi-Factor Authentication (MFA), OAuth2 / OIDC token flows, and Zero Trust micro-segmentation.",
    status: "Pending",
    notes: "",
    links: [
      { label: "NIST Special Publication 800-207 Zero Trust", url: "https://csrc.nist.gov/publications/detail/sp/800-207/final", linkType: "paper" }
    ],
    files: [],
    actions: [
      { label: "Configure OAuth2 / OIDC authentication flow with JWT verification", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Enforce least-privilege role matrices for API endpoints", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Implement rate-limiting and brute-force mitigation on authentication endpoints", category: "mandatory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  },
  {
    module: "cyber-security",
    stepNumber: 6,
    title: "Security Audit, Incident Response Plan & Final Portfolio",
    category: "Phase 6 - Audit & Incident Response",
    deadline: new Date("2027-01-15"),
    description: "Author comprehensive security audit report, simulated breach incident response runbook, post-mortem root cause analysis, and summative coursework defense.",
    status: "Pending",
    notes: "",
    links: [
      { label: "Blackboard: Cyber Security Final Coursework", url: "https://blackboard.leicester.ac.uk", linkType: "blackboard" }
    ],
    files: [],
    actions: [
      { label: "Draft incident response runbook following NIST SP 800-61 framework", category: "compulsory", isCompleted: false, isDefault: true },
      { label: "Perform full compliance audit against CIS Benchmarks", category: "mandatory", isCompleted: false, isDefault: true },
      { label: "Submit finalized Cyber Security Technical Defense Report & Video", category: "compulsory", isCompleted: false, isDefault: true }
    ],
    portalSubmission: { portalName: "Blackboard", isSubmitted: false, submissionReference: "" }
  }
];

export const allInitialTasks = [
  ...fypMilestones,
  ...appliedAiTasks,
  ...usabilityTestingTasks,
  ...devopsTasks,
  ...cyberSecurityTasks
];

export const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for 5-module seeding...");

    // Update any existing tasks without module to 'fyp'
    await Task.updateMany({ module: { $exists: false } }, { $set: { module: 'fyp' } });
    await Task.updateMany({ module: null }, { $set: { module: 'fyp' } });

    // Check count for each module
    const fypCount = await Task.countDocuments({ module: 'fyp' });
    const aiCount = await Task.countDocuments({ module: 'applied-ai' });
    const usabilityCount = await Task.countDocuments({ module: 'usability-testing' });
    const devopsCount = await Task.countDocuments({ module: 'devops' });
    const securityCount = await Task.countDocuments({ module: 'cyber-security' });

    console.log(`Current counts: FYP: ${fypCount}, Applied AI: ${aiCount}, Usability: ${usabilityCount}, DevOps: ${devopsCount}, Security: ${securityCount}`);

    if (fypCount === 0) {
      await Task.insertMany(fypMilestones);
      console.log(`Seeded ${fypMilestones.length} FYP milestones.`);
    }
    if (aiCount === 0) {
      await Task.insertMany(appliedAiTasks);
      console.log(`Seeded ${appliedAiTasks.length} Applied AI weekly tasks.`);
    }
    if (usabilityCount === 0) {
      await Task.insertMany(usabilityTestingTasks);
      console.log(`Seeded ${usabilityTestingTasks.length} Usability Testing tasks.`);
    }
    if (devopsCount === 0) {
      await Task.insertMany(devopsTasks);
      console.log(`Seeded ${devopsTasks.length} DevOps tasks.`);
    }
    if (securityCount === 0) {
      await Task.insertMany(cyberSecurityTasks);
      console.log(`Seeded ${cyberSecurityTasks.length} Cyber Security tasks.`);
    }

    console.log("All 5 modules seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

if (process.argv[1]?.endsWith('seedAllModules.js')) {
  seedDatabase();
}

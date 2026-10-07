import Task from '../models/Task.js';

/* ── GET all tasks ─────────────────────────────────────── */
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ stepNumber: 1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── PATCH status ──────────────────────────────────────── */
export const updateTaskStatus = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── PATCH notes ───────────────────────────────────────── */
export const updateNotes = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { notes: req.body.notes },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── POST link ─────────────────────────────────────────── */
export const addLink = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const { label, url, linkType } = req.body;
    task.links.push({ label, url, linkType: linkType || 'other' });
    const saved = await task.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── DELETE link ───────────────────────────────────────── */
export const removeLink = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.links = task.links.filter(l => l._id.toString() !== req.params.linkId);
    const saved = await task.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── POST file upload ──────────────────────────────────── */
export const addFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file provided' });
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.files.push({
      originalName: req.file.originalname,
      filename:     req.file.filename,   // just the stored filename
      uploadedAt:   new Date()
    });
    const saved = await task.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── DELETE file ───────────────────────────────────────── */
export const removeFile = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.files = task.files.filter(f => f._id.toString() !== req.params.fileId);
    const saved = await task.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── PATCH toggle action ───────────────────────────────── */
export const toggleAction = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const action = task.actions.id(req.params.actionId);
    if (!action) return res.status(404).json({ message: 'Action not found' });
    action.isCompleted = !action.isCompleted;
    action.completedAt = action.isCompleted ? new Date() : undefined;
    const saved = await task.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── POST add custom action ────────────────────────────── */
export const addAction = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const { label, category } = req.body;
    task.actions.push({ label, category: category || 'custom', isDefault: false });
    const saved = await task.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── DELETE action ─────────────────────────────────────── */
export const removeAction = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.actions = task.actions.filter(a => a._id.toString() !== req.params.actionId);
    const saved = await task.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── POST create custom task ───────────────────────────── */
export const createTask = async (req, res) => {
  try {
    const { title, category, description, deadline, stepNumber } = req.body;
    const count = await Task.countDocuments();
    const newTask = new Task({
      title,
      category: category || 'Research Formulation',
      description: description || '',
      deadline: deadline || new Date(),
      stepNumber: stepNumber || count + 1,
      status: 'Pending',
      links: [],
      files: [],
      actions: []
    });
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── DELETE task ───────────────────────────────────────── */
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── PATCH action category ─────────────────────────────── */
export const updateActionCategory = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const action = task.actions.id(req.params.actionId);
    if (!action) return res.status(404).json({ message: 'Action not found' });
    if (req.body.category) action.category = req.body.category;
    const saved = await task.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── POST portal submission ────────────────────────────── */
export const submitPortal = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const { submissionReference, portalName } = req.body;
    task.status = 'Completed';
    task.portalSubmission = {
      portalName:          portalName || 'Blackboard',
      isSubmitted:         true,
      submittedAt:         new Date(),
      submissionReference: submissionReference || ''
    };
    const saved = await task.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── DELETE reset portal submission ────────────────────── */
export const resetPortal = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.portalSubmission = {
      portalName: 'Blackboard',
      isSubmitted: false,
      submissionReference: ''
    };
    task.status = 'In Progress';
    const saved = await task.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

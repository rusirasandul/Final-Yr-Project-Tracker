import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ stepNumber: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitTaskProof = async (req, res) => {
  const { id } = req.params;
  const { notes, externalUrl, submissionReference, portalName } = req.body;
  const filePath = req.file ? req.file.path : null;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = 'Completed';
    task.evidence = {
      notes: notes || task.evidence.notes,
      externalUrl: externalUrl || task.evidence.externalUrl,
      filePath: filePath || task.evidence.filePath
    };
    task.portalSubmission = {
      portalName: portalName || 'Blackboard',
      isSubmitted: true,
      submittedAt: new Date(),
      submissionReference: submissionReference || 'DIRECT_SUBMISSION'
    };

    const saved = await task.save();
    res.status(200).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

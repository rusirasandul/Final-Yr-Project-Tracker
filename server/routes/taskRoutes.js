import express from 'express';
import multer from 'multer';
import {
  getTasks, createTask, deleteTask,
  updateTaskStatus, updateNotes,
  addLink, removeLink,
  addFile, removeFile,
  toggleAction, addAction, removeAction, updateActionCategory,
  submitPortal, resetPortal
} from '../controllers/taskController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.get('/',                                          getTasks);
router.post('/',                                         createTask);
router.delete('/:id',                                    deleteTask);
router.patch('/:id/status',                              updateTaskStatus);
router.patch('/:id/notes',                               updateNotes);
router.post('/:id/links',                                addLink);
router.delete('/:id/links/:linkId',                      removeLink);
router.post('/:id/files',          upload.single('file'), addFile);
router.delete('/:id/files/:fileId',                      removeFile);
router.patch('/:id/actions/:actionId/toggle',            toggleAction);
router.post('/:id/actions',                              addAction);
router.delete('/:id/actions/:actionId',                  removeAction);
router.patch('/:id/actions/:actionId/category',          updateActionCategory);
router.post('/:id/portal',                               submitPortal);
router.delete('/:id/portal',                             resetPortal);

export default router;

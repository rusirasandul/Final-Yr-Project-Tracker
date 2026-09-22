import express from 'express';
import multer from 'multer';
import { getTasks, updateTaskStatus, submitTaskProof } from '../controllers/taskController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.get('/', getTasks);
router.patch('/:id/status', updateTaskStatus);
router.post('/:id/submit', upload.single('evidenceFile'), submitTaskProof);

export default router;

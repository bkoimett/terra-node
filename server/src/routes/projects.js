import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  fundProject,
  getProjectTransactions,
} from '../controllers/projectController.js';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.get('/:id/transactions', getProjectTransactions);
router.post('/:id/fund', fundProject);

export default router;

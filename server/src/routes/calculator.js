import { Router } from 'express';
import { postCalculateDebt } from '../controllers/calculatorController.js';

const router = Router();

router.post('/debt', postCalculateDebt);

export default router;

import { Router } from 'express';
import {
  getTransactions,
  createCorporatePurchase,
} from '../controllers/transactionController.js';

const router = Router();

router.get('/', getTransactions);
router.post('/corporate', createCorporatePurchase);

export default router;

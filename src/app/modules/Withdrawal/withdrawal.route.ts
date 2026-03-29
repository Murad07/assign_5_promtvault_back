import express from 'express';
import { WithdrawalController } from './withdrawal.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth('SELLER'), WithdrawalController.requestWithdrawal);
router.get('/', auth('SELLER', 'ADMIN'), WithdrawalController.getWithdrawals);
router.patch('/:id', auth('ADMIN'), WithdrawalController.approveWithdrawal);

export const WithdrawalRoutes = router;

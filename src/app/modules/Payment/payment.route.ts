import express from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Retrieve mapped Seller's prompts privately
/**
 * @swagger
 * /api/payments/create-intent:
 *   post:
 *     summary: Initialize Stripe Payment Intent safely natively locking transaction amounts.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Intent mapping created natively
 */
router.post('/create-intent', auth('BUYER'), PaymentController.createIntent);

export const PaymentRoutes = router;

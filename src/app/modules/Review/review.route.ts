import { Router } from 'express';
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth';

const router = Router();

/**
 * @swagger
 * /api/reviews/{promptId}:
 *   get:
 *     summary: Retrieve all reviews for a specific Prompt
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: promptId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prompts reviews retrieved dynamically along with buyer names.
 */
router.get('/:promptId', ReviewController.getReviewsForPrompt);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Submit a Rating & Review for a Prompt
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     description: You must have a confirmed OrderItem matching the promptId.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - promptId
 *               - rating
 *             properties:
 *               promptId:
 *                 type: string
 *                 example: e1b5c2c7-f4a4-4c...
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Incredible prompt, it generated exactly what I needed!
 *     responses:
 *       201:
 *         description: Review and internal rating calculated actively!
 */
router.post('/', auth('BUYER'), ReviewController.createReview);

export const ReviewRoutes = router;

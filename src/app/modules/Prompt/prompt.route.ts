import { Router } from 'express';
import { PromptController } from './prompt.controller';
import auth from '../../middlewares/auth';

const router = Router();

// Retrieve all Prompts (Public)
/**
 * @swagger
 * /api/prompts:
 *   get:
 *     summary: Get all prompts (Public)
 *     tags: [Prompts]
 *     description: Retrieves all active (unblocked) prompts. The secretPrompt field is omitted.
 *     responses:
 *       200:
 *         description: Prompts retrieved successfully
 */
router.get('/', PromptController.getAllPrompts);

// Retrieve single Prompt by ID (Public view)
/**
 * @swagger
 * /api/prompts/{id}:
 *   get:
 *     summary: Get a single prompt by ID
 *     tags: [Prompts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prompt retrieved successfully
 */
router.get('/:id', PromptController.getSinglePrompt);

// Create Prompt (Secured to Sellers & Admins)
/**
 * @swagger
 * /api/prompts:
 *   post:
 *     summary: Create a new prompt
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *               - price
 *               - secretPrompt
 *             properties:
 *               title:
 *                 type: string
 *                 example: Midjourney Portrait Prompt
 *               description:
 *                 type: string
 *                 example: A highly detailed portrait prompt.
 *               category:
 *                 type: string
 *                 example: IMAGES
 *               price:
 *                 type: number
 *                 example: 9.99
 *               outputPreview:
 *                 type: string
 *                 example: "https://example.com/preview.png"
 *               secretPrompt:
 *                 type: string
 *                 example: "Ultra-realistic 8k octane render portrait..."
 *     responses:
 *       201:
 *         description: Prompt created successfully
 */
router.post('/', auth('SELLER', 'ADMIN'), PromptController.createPrompt);

// Update Prompt (Secured to Sellers & Admins)
/**
 * @swagger
 * /api/prompts/{id}:
 *   patch:
 *     summary: Update an existing prompt
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 example: 12.99
 *               isBlocked:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Prompt updated successfully
 */
router.patch('/:id', auth('SELLER', 'ADMIN'), PromptController.updatePrompt);

// Delete Prompt (Secured to Sellers & Admins)
/**
 * @swagger
 * /api/prompts/{id}:
 *   delete:
 *     summary: Delete a prompt
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prompt deleted successfully
 */
router.delete('/:id', auth('SELLER', 'ADMIN'), PromptController.deletePrompt);

export const PromptRoutes = router;

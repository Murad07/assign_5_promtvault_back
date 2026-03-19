import { Router } from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';

const router = Router();

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get logged-in user's checkout history & purchased prompts
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves the checkout history and fully reveals the secretPrompts mapping to the User's JWT Buyer ID.
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 */
router.get('/my-orders', auth('BUYER', 'SELLER', 'ADMIN'), OrderController.getMyOrders);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve every order on the platform
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     description: Restricted to Admin Dashboard usage.
 *     responses:
 *       200:
 *         description: All orders retrieved successfully
 */
router.get('/', auth('ADMIN'), OrderController.getAllOrders);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Initiate an Order/Checkout Session
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - promptIds
 *             properties:
 *               promptIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["b4v5s8-f54s3x-a4f6w8-q43c5b"]
 *     responses:
 *       201:
 *         description: Order and mapped OrderItems constructed directly from active database prices successfully.
 */
router.post('/', auth('BUYER', 'SELLER', 'ADMIN'), OrderController.createOrder);

export const OrderRoutes = router;

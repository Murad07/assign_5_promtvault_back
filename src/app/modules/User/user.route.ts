import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/statistics', auth('ADMIN', 'SELLER', 'BUYER'), UserController.getStatistics);
router.patch('/profile', auth('ADMIN', 'SELLER', 'BUYER'), UserController.updateProfile);
router.get('/', auth('ADMIN'), UserController.getAllUsers);
router.patch('/:id/role', auth('ADMIN'), UserController.updateUserRole);
router.delete('/:id', auth('ADMIN'), UserController.deleteUser);

export const UserRoutes = router;

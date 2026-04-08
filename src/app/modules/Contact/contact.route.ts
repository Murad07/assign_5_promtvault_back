import { Router } from 'express';
import { ContactController } from './contact.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/', ContactController.sendContactMessage);
router.get('/', auth('ADMIN'), ContactController.getAllMessages);
router.patch('/:id/read', auth('ADMIN'), ContactController.markAsRead);

export const ContactRoutes = router;

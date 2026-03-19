import { Router } from 'express';
import { PromptController } from './prompt.controller';
import auth from '../../middlewares/auth';

const router = Router();

// Retrieve all Prompts (Public)
router.get('/', PromptController.getAllPrompts);

// Retrieve single Prompt by ID (Public view)
router.get('/:id', PromptController.getSinglePrompt);

// Create Prompt (Secured to Sellers & Admins)
router.post('/', auth('SELLER', 'ADMIN'), PromptController.createPrompt);

// Update Prompt (Secured to Sellers & Admins)
router.patch('/:id', auth('SELLER', 'ADMIN'), PromptController.updatePrompt);

// Delete Prompt (Secured to Sellers & Admins)
router.delete('/:id', auth('SELLER', 'ADMIN'), PromptController.deletePrompt);

export const PromptRoutes = router;

import { Router } from 'express';
import { submitContact, getAllContacts } from '../controllers/contact.controller.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public route - submit contact form
router.post('/', contactLimiter, submitContact);

// Admin route - get all contacts (add authentication middleware in production)
router.get('/', getAllContacts);

export default router;

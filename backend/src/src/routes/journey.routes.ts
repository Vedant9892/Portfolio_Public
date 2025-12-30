import { Router } from 'express';
import {
    getAllJourneys,
    createJourney,
    updateJourney,
    deleteJourney
} from '../controllers/journey.controller.js';

const router = Router();

// Public route
router.get('/', getAllJourneys);

// Admin routes (add authentication middleware in production)
router.post('/', createJourney);
router.put('/:id', updateJourney);
router.delete('/:id', deleteJourney);

export default router;

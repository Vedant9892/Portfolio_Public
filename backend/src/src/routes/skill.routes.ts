import { Router } from 'express';
import {
    getAllSkills,
    createSkill,
    updateSkill,
    deleteSkill
} from '../controllers/skill.controller.js';

const router = Router();

// Public route
router.get('/', getAllSkills);

// Admin routes (add authentication middleware in production)
router.post('/', createSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

export default router;

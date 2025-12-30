import { Router } from 'express';
import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} from '../controllers/project.controller.js';

const router = Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Admin routes (add authentication middleware in production)
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;

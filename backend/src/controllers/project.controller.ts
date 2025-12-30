import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project.js';
import { AppError } from '../middleware/errorHandler.js';

export const getAllProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { category, status, featured } = req.query;
        const filter: any = {};

        if (category) filter.category = category;
        if (status) filter.status = status;
        if (featured !== undefined) filter.featured = featured === 'true';

        const projects = await Project.find(filter)
            .sort({ featured: -1, order: 1, createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        next(error);
    }
};

export const getProjectById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const project = await Project.findById(req.params.id).select('-__v');

        if (!project) {
            throw new AppError('Project not found', 404);
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        next(error);
    }
};

export const createProject = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project
        });
    } catch (error) {
        next(error);
    }
};

export const updateProject = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!project) {
            throw new AppError('Project not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: project
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            throw new AppError('Project not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

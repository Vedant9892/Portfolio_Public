import { Request, Response, NextFunction } from 'express';
import { Skill } from '../models/Skill.js';
import { AppError } from '../middleware/errorHandler.js';

export const getAllSkills = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { category } = req.query;
        const filter: any = {};

        if (category) filter.category = category;

        const skills = await Skill.find(filter)
            .sort({ category: 1, order: 1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills
        });
    } catch (error) {
        next(error);
    }
};

export const createSkill = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const skill = await Skill.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Skill created successfully',
            data: skill
        });
    } catch (error) {
        next(error);
    }
};

export const updateSkill = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!skill) {
            throw new AppError('Skill not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Skill updated successfully',
            data: skill
        });
    } catch (error) {
        next(error);
    }
};

export const deleteSkill = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);

        if (!skill) {
            throw new AppError('Skill not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Skill deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

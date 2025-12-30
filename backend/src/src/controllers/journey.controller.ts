import { Request, Response, NextFunction } from 'express';
import { Journey } from '../models/Journey.js';
import { AppError } from '../middleware/errorHandler.js';

export const getAllJourneys = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { type } = req.query;
        const filter: any = {};

        if (type) filter.type = type;

        const journeys = await Journey.find(filter)
            .sort({ startDate: -1, order: 1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: journeys.length,
            data: journeys
        });
    } catch (error) {
        next(error);
    }
};

export const createJourney = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const journey = await Journey.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Journey entry created successfully',
            data: journey
        });
    } catch (error) {
        next(error);
    }
};

export const updateJourney = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const journey = await Journey.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!journey) {
            throw new AppError('Journey entry not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Journey entry updated successfully',
            data: journey
        });
    } catch (error) {
        next(error);
    }
};

export const deleteJourney = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const journey = await Journey.findByIdAndDelete(req.params.id);

        if (!journey) {
            throw new AppError('Journey entry not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Journey entry deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

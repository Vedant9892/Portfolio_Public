import { Request, Response, NextFunction } from 'express';
import { Contact } from '../models/Contact.js';
import { AppError } from '../middleware/errorHandler.js';
import { sendContactEmail } from '../services/email.service.js';
import Joi from 'joi';

// Validation schema
const contactSchema = Joi.object({
    name: Joi.string().required().trim().max(100),
    email: Joi.string().required().email().trim().lowercase(),
    subject: Joi.string().optional().trim().max(200),
    message: Joi.string().required().trim().max(2000)
});

export const submitContact = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Validate request body
        const { error, value } = contactSchema.validate(req.body);
        if (error) {
            throw new AppError(error.details[0].message, 400);
        }

        const { name, email, subject, message } = value;

        // Get IP and User Agent
        const ipAddress = req.ip || req.socket.remoteAddress;
        const userAgent = req.get('user-agent');

        // Save to database
        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
            ipAddress,
            userAgent
        });

        // Send email notification
        try {
            await sendContactEmail({ name, email, subject, message });
        } catch (emailError) {
            // Log email error but don't fail the request
            console.error('Failed to send email:', emailError);
        }

        res.status(201).json({
            success: true,
            message: 'Thank you for your message! I will get back to you soon.',
            data: {
                id: contact._id,
                name: contact.name,
                email: contact.email
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getAllContacts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const contacts = await Contact.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('-__v');

        const total = await Contact.countDocuments();

        res.status(200).json({
            success: true,
            data: contacts,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

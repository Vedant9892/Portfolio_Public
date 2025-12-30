import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    category: string;
    imageUrl?: string;
    demoUrl?: string;
    githubUrl?: string;
    featured: boolean;
    order: number;
    startDate?: Date;
    endDate?: Date;
    status: 'completed' | 'in-progress' | 'planned';
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true
    },
    longDescription: {
        type: String,
        trim: true
    },
    technologies: [{
        type: String,
        trim: true
    }],
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'desktop', 'ai-ml', 'other']
    },
    imageUrl: {
        type: String,
        trim: true
    },
    demoUrl: {
        type: String,
        trim: true
    },
    githubUrl: {
        type: String,
        trim: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['completed', 'in-progress', 'planned'],
        default: 'completed'
    }
}, {
    timestamps: true
});

// Indexes
projectSchema.index({ featured: -1, order: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });

export const Project = mongoose.model<IProject>('Project', projectSchema);

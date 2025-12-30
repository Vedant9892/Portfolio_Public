import mongoose, { Schema, Document } from 'mongoose';

export interface IJourney extends Document {
    title: string;
    organization: string;
    type: 'education' | 'work' | 'achievement';
    description: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    location?: string;
    skills?: string[];
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const journeySchema = new Schema<IJourney>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    organization: {
        type: String,
        required: [true, 'Organization is required'],
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['education', 'work', 'achievement']
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        trim: true
    },
    skills: [{
        type: String,
        trim: true
    }],
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Indexes
journeySchema.index({ type: 1, startDate: -1 });
journeySchema.index({ order: 1 });

export const Journey = mongoose.model<IJourney>('Journey', journeySchema);

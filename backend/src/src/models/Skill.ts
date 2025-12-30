import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
    name: string;
    category: string;
    level: number;
    icon?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const skillSchema = new Schema<ISkill>({
    name: {
        type: String,
        required: [true, 'Skill name is required'],
        trim: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: ['frontend', 'backend', 'database', 'tools', 'other']
    },
    level: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
        default: 50
    },
    icon: {
        type: String,
        trim: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Indexes
skillSchema.index({ category: 1, order: 1 });

export const Skill = mongoose.model<ISkill>('Skill', skillSchema);

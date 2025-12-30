import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { Journey } from '../models/Journey.js';
import { logger } from '../utils/logger.js';

// Load environment variables
dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI is not defined');
        }

        await mongoose.connect(mongoUri);
        logger.info('✅ Connected to MongoDB');

        // Clear existing data
        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Journey.deleteMany({});
        logger.info('🗑️  Cleared existing data');

        // Seed Projects
        const projects = await Project.insertMany([
            {
                title: 'Portfolio Website',
                description: 'Personal portfolio website built with React, TypeScript, and Node.js',
                longDescription: 'A modern, responsive portfolio website featuring project showcases, skills display, and contact functionality. Built with React for the frontend and Node.js/Express for the backend API.',
                technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Framer Motion'],
                category: 'web',
                featured: true,
                status: 'completed',
                order: 1,
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-02-01')
            },
            {
                title: 'E-Commerce Platform',
                description: 'Full-stack e-commerce application with payment integration',
                longDescription: 'A complete e-commerce solution with product management, shopping cart, user authentication, and payment processing using Stripe.',
                technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'TailwindCSS'],
                category: 'web',
                featured: true,
                status: 'in-progress',
                order: 2,
                startDate: new Date('2024-03-01')
            },
            {
                title: 'Task Management App',
                description: 'Collaborative task management tool for teams',
                longDescription: 'A Trello-like task management application with drag-and-drop functionality, real-time updates, and team collaboration features.',
                technologies: ['React', 'Redux', 'Socket.io', 'Node.js', 'MongoDB'],
                category: 'web',
                featured: false,
                status: 'completed',
                order: 3,
                startDate: new Date('2023-09-01'),
                endDate: new Date('2023-11-01')
            }
        ]);
        logger.info(`✅ Seeded ${projects.length} projects`);

        // Seed Skills
        const skills = await Skill.insertMany([
            // Frontend
            { name: 'React', category: 'frontend', level: 90, order: 1 },
            { name: 'TypeScript', category: 'frontend', level: 85, order: 2 },
            { name: 'JavaScript', category: 'frontend', level: 95, order: 3 },
            { name: 'HTML/CSS', category: 'frontend', level: 90, order: 4 },
            { name: 'Next.js', category: 'frontend', level: 80, order: 5 },
            { name: 'Vue.js', category: 'frontend', level: 70, order: 6 },

            // Backend
            { name: 'Node.js', category: 'backend', level: 85, order: 1 },
            { name: 'Express.js', category: 'backend', level: 85, order: 2 },
            { name: 'Python', category: 'backend', level: 75, order: 3 },
            { name: 'REST APIs', category: 'backend', level: 90, order: 4 },
            { name: 'GraphQL', category: 'backend', level: 70, order: 5 },

            // Database
            { name: 'MongoDB', category: 'database', level: 85, order: 1 },
            { name: 'PostgreSQL', category: 'database', level: 80, order: 2 },
            { name: 'MySQL', category: 'database', level: 75, order: 3 },
            { name: 'Redis', category: 'database', level: 70, order: 4 },

            // Tools
            { name: 'Git', category: 'tools', level: 90, order: 1 },
            { name: 'Docker', category: 'tools', level: 75, order: 2 },
            { name: 'AWS', category: 'tools', level: 70, order: 3 },
            { name: 'VS Code', category: 'tools', level: 95, order: 4 },
            { name: 'Postman', category: 'tools', level: 85, order: 5 }
        ]);
        logger.info(`✅ Seeded ${skills.length} skills`);

        // Seed Journey
        const journeys = await Journey.insertMany([
            {
                title: 'Bachelor of Computer Science',
                organization: 'University Name',
                type: 'education',
                description: 'Studying Computer Science with focus on software engineering and web development. Relevant coursework includes Data Structures, Algorithms, Database Systems, and Web Technologies.',
                startDate: new Date('2020-09-01'),
                current: true,
                location: 'City, Country',
                skills: ['Programming', 'Data Structures', 'Algorithms', 'Web Development'],
                order: 1
            },
            {
                title: 'Full Stack Developer Intern',
                organization: 'Tech Company Inc.',
                type: 'work',
                description: 'Developed and maintained web applications using React and Node.js. Collaborated with senior developers on feature implementation and bug fixes. Participated in code reviews and agile development processes.',
                startDate: new Date('2023-06-01'),
                endDate: new Date('2023-08-31'),
                current: false,
                location: 'Remote',
                skills: ['React', 'Node.js', 'MongoDB', 'Git', 'Agile'],
                order: 2
            },
            {
                title: 'Hackathon Winner',
                organization: 'National Tech Hackathon 2023',
                type: 'achievement',
                description: 'Won first place in a 48-hour hackathon by developing an innovative solution for sustainable agriculture using IoT and machine learning.',
                startDate: new Date('2023-10-15'),
                endDate: new Date('2023-10-17'),
                current: false,
                location: 'City, Country',
                skills: ['IoT', 'Machine Learning', 'Python', 'Team Collaboration'],
                order: 3
            },
            {
                title: 'Frontend Developer',
                organization: 'Startup XYZ',
                type: 'work',
                description: 'Building responsive and performant user interfaces using React and TypeScript. Implementing design systems and component libraries. Optimizing application performance and user experience.',
                startDate: new Date('2024-01-01'),
                current: true,
                location: 'Hybrid',
                skills: ['React', 'TypeScript', 'TailwindCSS', 'Figma', 'Performance Optimization'],
                order: 4
            }
        ]);
        logger.info(`✅ Seeded ${journeys.length} journey entries`);

        logger.info('🎉 Database seeded successfully!');
        logger.info('\nSeeded data summary:');
        logger.info(`  - Projects: ${projects.length}`);
        logger.info(`  - Skills: ${skills.length}`);
        logger.info(`  - Journey entries: ${journeys.length}`);

        process.exit(0);
    } catch (error) {
        logger.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

// Run the seed function
seedData();

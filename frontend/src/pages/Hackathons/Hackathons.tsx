import { motion } from 'framer-motion';
import HackathonTimeline from '../../components/features/HackathonTimeline/HackathonTimeline';
import styles from './Hackathons.module.css';

// Mock data - will be replaced with API call later
const hackathonsData = [
    {
        id: '1',
        name: 'Smart India Hackathon 2023',
        organizer: 'Government of India',
        date: 'December 2023',
        position: 'Winner',
        project: 'AI-Powered Traffic Management System',
        description:
            'Developed an intelligent traffic management system using computer vision and machine learning to optimize traffic flow in real-time.',
        technologies: ['Python', 'TensorFlow', 'OpenCV', 'React', 'FastAPI'],
        award: 'Cash Prize: ₹1,00,000',
        teamSize: 6,
        links: {
            project: 'https://github.com/yourusername/traffic-ai',
            certificate: '#',
        },
    },
    {
        id: '2',
        name: 'HackNITR 4.0',
        organizer: 'NIT Rourkela',
        date: 'October 2023',
        position: '2nd Runner Up',
        project: 'EcoTrack - Carbon Footprint Tracker',
        description:
            'Mobile app to track and reduce personal carbon footprint with gamification and community challenges.',
        technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
        award: 'Cash Prize: ₹15,000',
        teamSize: 4,
        links: {
            project: 'https://github.com/yourusername/ecotrack',
        },
    },
    {
        id: '3',
        name: 'DevJams 2023',
        organizer: 'Google Developer Student Clubs',
        date: 'August 2023',
        position: 'Winner',
        project: 'StudyBuddy - AI Study Assistant',
        description:
            'AI-powered study assistant that creates personalized study plans, generates quizzes, and provides smart notes.',
        technologies: ['Next.js', 'OpenAI API', 'PostgreSQL', 'Tailwind CSS'],
        award: 'Google Cloud Credits + Swag',
        teamSize: 3,
        links: {
            project: 'https://github.com/yourusername/studybuddy',
            certificate: '#',
        },
    },
    {
        id: '4',
        name: 'HackOdisha 2.0',
        organizer: 'Odisha State Government',
        date: 'June 2023',
        position: 'Finalist',
        project: 'FarmConnect - Farmer Marketplace',
        description:
            'Digital marketplace connecting farmers directly with consumers, eliminating middlemen and ensuring fair prices.',
        technologies: ['React', 'Spring Boot', 'MySQL', 'AWS'],
        teamSize: 5,
        links: {
            project: 'https://github.com/yourusername/farmconnect',
        },
    },
    {
        id: '5',
        name: 'CodeFury 5.0',
        organizer: 'IIIT Bhubaneswar',
        date: 'March 2023',
        position: '2nd Place',
        project: 'HealthHub - Telemedicine Platform',
        description:
            'Comprehensive telemedicine platform with video consultations, prescription management, and health records.',
        technologies: ['Vue.js', 'Express', 'MongoDB', 'WebRTC'],
        award: 'Cash Prize: ₹20,000',
        teamSize: 4,
        links: {
            project: 'https://github.com/yourusername/healthhub',
        },
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
        },
    },
};

export default function Hackathons() {
    return (
        <div className={styles.hackathons}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className={styles.title}>Hackathons & Competitions</h1>
                    <p className={styles.subtitle}>
                        A timeline of hackathons I've participated in and achievements earned
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <HackathonTimeline items={hackathonsData} />
                </motion.div>
            </div>
        </div>
    );
}

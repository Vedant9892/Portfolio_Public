import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
    title: string;
    description: string;
    thumbnail: string;
    technologies: string[];
    links: {
        github?: string;
        live?: string;
    };
    featured?: boolean;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

export default function ProjectCard({
    title,
    description,
    thumbnail,
    technologies,
    links,
    featured,
}: ProjectCardProps) {
    return (
        <motion.div
            className={`${styles.card} ${featured ? styles.featured : ''}`}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            {/* Thumbnail */}
            <div className={styles.imageContainer}>
                <img src={thumbnail} alt={title} className={styles.image} />
                {featured && <span className={styles.featuredBadge}>Featured</span>}
            </div>

            {/* Content */}
            <div className={styles.content}>
                {/* Technologies */}
                <div className={styles.technologies}>
                    {technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className={styles.techBadge}>
                            {tech}
                        </span>
                    ))}
                    {technologies.length > 3 && (
                        <span className={styles.techBadge}>+{technologies.length - 3}</span>
                    )}
                </div>

                {/* Title */}
                <h3 className={styles.title}>{title}</h3>

                {/* Description */}
                <p className={styles.description}>{description}</p>

                {/* Links */}
                <div className={styles.links}>
                    {links.github && (
                        <a
                            href={links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                            aria-label="View on GitHub"
                        >
                            <Github size={18} />
                            <span>Code</span>
                        </a>
                    )}
                    {links.live && (
                        <a
                            href={links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                            aria-label="View live demo"
                        >
                            <ExternalLink size={18} />
                            <span>Live Demo</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

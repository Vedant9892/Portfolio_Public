import { motion } from 'framer-motion';
import { MapPin, Award, Trophy, Users, ExternalLink } from 'lucide-react';
import styles from './HackathonTimeline.module.css';

interface HackathonItemData {
    id: string;
    name: string;
    organizer: string;
    date: string;
    position: string;
    project: string;
    technologies: string[];
    award?: string;
    teamSize?: number;
    description: string;
    links?: {
        project?: string;
        certificate?: string;
    };
}

interface HackathonTimelineProps {
    items: HackathonItemData[];
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

const getPositionColor = (position: string) => {
    if (position.toLowerCase().includes('winner') || position.toLowerCase().includes('1st')) {
        return 'gold';
    }
    if (position.toLowerCase().includes('runner') || position.toLowerCase().includes('2nd')) {
        return 'silver';
    }
    if (position.toLowerCase().includes('3rd')) {
        return 'bronze';
    }
    return 'default';
};

export default function HackathonTimeline({ items }: HackathonTimelineProps) {
    return (
        <div className={styles.timeline}>
            {items.map((item, index) => {
                const positionColor = getPositionColor(item.position);

                return (
                    <motion.div
                        key={item.id}
                        className={`${styles.timelineItem} ${styles[positionColor]}`}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={itemVariants}
                        transition={{ delay: index * 0.15 }}
                    >
                        {/* Dot Container (Center) */}
                        <div className={styles.dotContainer}>
                            <div className={styles.dot}>
                                <Trophy size={14} />
                            </div>
                        </div>

                        {/* Content Card (Alternates left/right) */}
                        <div className={styles.card}>
                            {/* Date Badge */}
                            <span className={styles.dateBadge}>{item.date}</span>

                            {/* Header */}
                            <div className={styles.header}>
                                <h3 className={styles.name}>{item.name}</h3>
                                <span className={`${styles.badge} ${styles[`badge-${positionColor}`]}`}>
                                    {item.position}
                                </span>
                            </div>

                            {/* Meta Information */}
                            <div className={styles.meta}>
                                <div className={styles.metaItem}>
                                    <MapPin size={16} />
                                    <span>{item.organizer}</span>
                                </div>
                                {item.teamSize && (
                                    <div className={styles.metaItem}>
                                        <Users size={16} />
                                        <span>Team of {item.teamSize}</span>
                                    </div>
                                )}
                            </div>

                            {/* Project */}
                            <div className={styles.project}>
                                <h4 className={styles.projectTitle}>Project: {item.project}</h4>
                                <p className={styles.description}>{item.description}</p>
                            </div>

                            {/* Technologies */}
                            <div className={styles.technologies}>
                                {item.technologies.map((tech, i) => (
                                    <span key={i} className={styles.techBadge}>
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Award */}
                            {item.award && (
                                <div className={styles.award}>
                                    <Award size={16} />
                                    <span>{item.award}</span>
                                </div>
                            )}

                            {/* Links */}
                            {item.links && (
                                <div className={styles.links}>
                                    {item.links.project && (
                                        <a
                                            href={item.links.project}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.link}
                                        >
                                            <ExternalLink size={16} />
                                            View Project
                                        </a>
                                    )}
                                    {item.links.certificate && (
                                        <a
                                            href={item.links.certificate}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.link}
                                        >
                                            <Award size={16} />
                                            Certificate
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

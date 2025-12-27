import { motion } from 'framer-motion';
import { Calendar, MapPin, Award } from 'lucide-react';
import styles from './Timeline.module.css';

interface TimelineItemData {
    id: string;
    phase: string;
    institution: string;
    duration: {
        start: string;
        end: string;
    };
    achievements: string[];
    description: string;
    current?: boolean;
}

interface TimelineProps {
    items: TimelineItemData[];
}

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

export default function Timeline({ items }: TimelineProps) {
    return (
        <div className={styles.timeline}>
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    className={`${styles.timelineItem} ${item.current ? styles.current : ''}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={itemVariants}
                    transition={{ delay: index * 0.2 }}
                >
                    {/* Timeline Dot */}
                    <div className={styles.dot}>
                        {item.current && <div className={styles.pulse} />}
                    </div>

                    {/* Timeline Line */}
                    {index < items.length - 1 && <div className={styles.line} />}

                    {/* Content Card */}
                    <div className={styles.card}>
                        {/* Header */}
                        <div className={styles.header}>
                            <h3 className={styles.phase}>{item.phase}</h3>
                            {item.current && <span className={styles.badge}>Current</span>}
                        </div>

                        {/* Institution */}
                        <div className={styles.meta}>
                            <div className={styles.metaItem}>
                                <MapPin size={16} />
                                <span>{item.institution}</span>
                            </div>
                            <div className={styles.metaItem}>
                                <Calendar size={16} />
                                <span>
                                    {item.duration.start} - {item.duration.end}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className={styles.description}>{item.description}</p>

                        {/* Achievements */}
                        {item.achievements.length > 0 && (
                            <div className={styles.achievements}>
                                <div className={styles.achievementsHeader}>
                                    <Award size={16} />
                                    <span>Key Achievements</span>
                                </div>
                                <ul className={styles.achievementsList}>
                                    {item.achievements.map((achievement, i) => (
                                        <li key={i}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

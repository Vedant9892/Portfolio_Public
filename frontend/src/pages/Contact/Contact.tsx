import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { contactApi } from '../../services/api';
import styles from './Contact.module.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await contactApi.submit(formData);

            if (response.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });

                // Reset success message after 5 seconds
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                setSubmitStatus('error');
                setErrorMessage('Failed to send message. Please try again.');
            }
        } catch (error: any) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');

            // Handle specific error messages
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else if (error.message === 'Network Error') {
                setErrorMessage('Cannot connect to server. Please make sure the backend is running.');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className={styles.contact}>
            <div className="container">
                {/* Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className={styles.title}>Get In Touch</h1>
                    <p className={styles.subtitle}>
                        Have a question or want to work together? Feel free to reach out!
                    </p>
                </motion.div>

                <div className={styles.content}>
                    {/* Contact Form */}
                    <motion.form
                        className={styles.form}
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="subject" className={styles.label}>
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.label}>
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows={6}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                'Sending...'
                            ) : (
                                <>
                                    Send Message
                                    <Send size={18} />
                                </>
                            )}
                        </button>

                        {submitStatus === 'success' && (
                            <motion.div
                                className={styles.successMessage}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                Message sent successfully! I'll get back to you soon.
                            </motion.div>
                        )}

                        {submitStatus === 'error' && (
                            <motion.div
                                className={styles.errorMessage}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {errorMessage || 'Failed to send message. Please try again.'}
                            </motion.div>
                        )}

                    </motion.form>

                    {/* Contact Info */}
                    <motion.div
                        className={styles.info}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className={styles.infoCard}>
                            <Mail size={24} className={styles.infoIcon} />
                            <h3 className={styles.infoTitle}>Email</h3>
                            <a href="mailto:your.email@example.com" className={styles.infoLink}>
                                your.email@example.com
                            </a>
                        </div>

                        <div className={styles.infoText}>
                            <p>
                                I'm always open to discussing new projects, creative ideas, or opportunities to be
                                part of your visions.
                            </p>
                            <p>
                                Response time: Usually within 24 hours
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

interface ContactEmailData {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

export const sendContactEmail = async (data: ContactEmailData): Promise<void> => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `Portfolio Contact: ${data.subject || 'New Message'}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Name:</strong> 
              <span style="color: #333;">${data.name}</span>
            </p>
            
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Email:</strong> 
              <a href="mailto:${data.email}" style="color: #4CAF50;">${data.email}</a>
            </p>
            
            ${data.subject ? `
              <p style="margin: 10px 0;">
                <strong style="color: #555;">Subject:</strong> 
                <span style="color: #333;">${data.subject}</span>
              </p>
            ` : ''}
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
            <p>This email was sent from your portfolio website contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
            text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.subject ? `Subject: ${data.subject}` : ''}

Message:
${data.message}

---
Timestamp: ${new Date().toLocaleString()}
      `
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Contact email sent successfully to ${process.env.EMAIL_TO}`);
    } catch (error) {
        logger.error('Failed to send contact email:', error);
        throw error;
    }
};

import sgMail from '@sendgrid/mail';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';
import { weddingTheme } from '../emails/mailTheme.js';

dotenv.config();

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Configure Mailgen
const mailGenerator = new Mailgen({
    theme: weddingTheme,
    product: {
        name: 'Gad & Gomez',
        link: process.env.WEBSITE_URL,
        logo: 'https://res.cloudinary.com/ddlhho2lk/image/upload/v1744471795/Gad-Gomez/barng7z8bbkmef5sleng.png'
    }
});

// Function to send welcome email after registration
const sendWelcomeEmail = async (user, plainPassword) => {
    try {
        // Generate email content using Mailgen
        const email = {
            body: {
                title: 'Welcome',
                name: user.name || user.email.split('@')[0],
                intro: [
                    'Welcome to our website! We\'re very excited to have you join us in celebrating our special day.',
                    `Your account has been created as <span style="color: #A65D57; font-weight: bold; text-transform: capitalize;">${user.role}</span> successfully.`
                ],
                dictionary: {
                    "Email:": user.email,
                    "Password:": plainPassword
                },
                action: {
                    instructions: 'To access your account, please click the button below:',
                    button: {
                        color: '#A65D57',
                        text: 'Login to Your Account',
                        link: `${process.env.WEBSITE_URL}/login`
                    }
                },
                outro: [
                    'You can now RSVP to our events, view wedding details, and share your memories with us.',
                    'If you need any help, please don\'t hesitate to contact us.',
                    '+250784998214 / vainqueurmg@gmail.com ',
                    'We look forward to celebrating with you!'
                ],
                signature: 'Best'
            }
        };

        // Generate HTML email
        const emailBody = mailGenerator.generate(email);

        // Send email using SendGrid
        const message = {
            to: user.email,
            from: {
                email: process.env.EMAIL_FROM,
                name: 'Gad & Gomez'
            },
            subject: 'Welcome to Our Website',
            html: emailBody
        };

        const response = await sgMail.send(message);
        console.log('Welcome email sent with SendGrid:', response[0].statusCode);
        return response;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        if (error.response) {
            console.error('SendGrid API response:', error.response.body);
        }
        throw error;
    }
};

export { sendWelcomeEmail };
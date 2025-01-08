// helpers/email.js
import nodemailer from 'nodemailer';

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_FROM, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
});

export const sendWelcomeEmail = async (email) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Welcome to ${process.env.APP_NAME}`,
        html: `
        <html>
            <p>Good day! Welcome to ${process.env.APP_NAME} and thank you for joining us.</p>
            <div style="margin:20px auto;">
                <a href="${process.env.CLIENT_URL}" style="margin-right:50px;">Browse properties</a>
                <a href="${process.env.CLIENT_URL}/post-ad">Post ad</a>
            </div>
            <i>- Team ${process.env.APP_NAME}</i>
        </html>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error;
    }
};

import nodemailer from 'nodemailer';
import randomString from './generateRandomString.js';
import dotenv from 'dotenv';

dotenv.config();

const mail = async (email) => {
    const token = randomString(20);
    const frontendURL = 'https://resetpassword-by-arun.netlify.app/resetpassword'; // Update with your frontend reset password URL
    try {
        const transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.APP_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: "Password Reset Token with Link",
            html: `<p>Your password reset token is: ${token}</p><p>Click URL<a href="${frontendURL}?token=${token}">${frontendURL}?token=${token}</a> to reset your password</p>`
        };
        const info = await transport.sendMail(mailOptions);
        return { success: true, message: 'Email sent successfully' }; // Email sent successfully
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Failed to send email' }; // Failed to send email
    }
};

export default mail;

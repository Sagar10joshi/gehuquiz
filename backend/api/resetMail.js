import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

async function resetMail(user, resetUrl) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Use the app password here
        }
    });

    let mailOptions = {
        from: 'OTP Service : GEHU Bhimtal Quiz Portal',
        to: `${user.email}`,
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset. Click the link below to reset your password:</p>
<a href="${resetUrl} ,redirect: '/reset-password/12345'">Reset Password</a>`,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export {resetMail};

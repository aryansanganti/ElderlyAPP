const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use any email service provider
    auth: {
        user: 'your-email@gmail.com', // Your email address
        pass: 'your-email-password', // Your email password (or app password if 2FA is enabled)
    },
});

exports.sendEmergencyEmail = functions.firestore
    .document('emergencyAlerts/{alertId}')
    .onCreate(async (snapshot, context) => {
        const data = snapshot.data();
        const mailOptions = {
            from: 'your-email@gmail.com', // Sender address
            to: data.contactEmail, // Recipient address
            subject: 'Emergency Alert Received',
            text: `You have received an emergency alert from ${data.contactName}:\n\n${data.emergencyMessage}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    });

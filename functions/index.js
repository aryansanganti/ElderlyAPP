// index.js
const emailjs = require('emailjs-com');

// Initialize EmailJS
const userID = 'om-mhaske7'; // Replace with your EmailJS user ID
const serviceID = 'service_y5utfmj'; // Replace with your EmailJS service ID
const templateID = 'template_pfoklbr'; // Replace with your EmailJS template ID

const sendEmail = async (alertMessage, emergencyContact) => {
    const templateParams = {
        message: alertMessage,
        to_email: emergencyContact,
    };

    try {
        // Send email using EmailJS
        const response = await emailjs.send(serviceID, templateID, templateParams, userID);
        console.log('Email sent successfully!', response);
    } catch (error) {
        console.error('Failed to send email. Error:', error);
    }
};

// Example usage
const alertMessage = "This is a test emergency alert!";
const emergencyContact = "recipient@example.com"; // Replace with the recipient's email

sendEmail(alertMessage, emergencyContact);

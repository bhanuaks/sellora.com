
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const nodemailer = require('nodemailer'); 

export async function sendMailByNodeMailer(to, subject, htmlContent, isBcc=false) {
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Use your SMTP server here
        port: 465,
        secure: true, // true for port 465, false for port 587
        auth: {
          user: process.env.EMAIL_USER || "php1@aksindia.com",  
          pass: process.env.EMAIL_PASS || "jjcgeyodnzeigeyn", 
        },
      });

      const mailOptions = {
        from: '"sellora.com" php1@aksindia.com', // Sender address
        to: to, // Recipient email
        subject: subject, // Email subject
        html: htmlContent, // Rendered HTML 
      };

      if (isBcc) {
        mailOptions.bcc = 'amitkumar735194@gmail.com'; // Add your BCC recipient
    }

        // Send the email
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.messageId);
            return  info.messageId
        } catch (error) {
            console.log(error);
            return  error
        }

}
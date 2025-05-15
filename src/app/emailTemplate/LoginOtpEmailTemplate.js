import React from 'react';

const LoginOtpEmailTemplate = ({ name = 'User', otp = '123456' }) => {
  return (
    <html lang="en">
      <head>
        <style>
          {`
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
          }
          .header h1 {
            margin: 0;
            color: #333333;
          }
          .content {
            margin-top: 30px;
            text-align: center;
          }
          .content p {
            font-size: 16px;
            color: #555555;
            line-height: 1.5;
          }
          .otp {
            display: inline-block;
            background-color: #007bff;
            color: white;
            font-size: 24px;
            padding: 10px 20px;
            margin: 20px 0;
            border-radius: 6px;
            letter-spacing: 4px;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #999999;
          }
        `}
        </style>
      </head>
      <body>
        <div className="email-container">
          <div className="header">
            <h1>Login Verification</h1>
          </div>
          <div className="content">
            <p>Hi {name},</p>
            <p>Your one-time password (OTP) for login is:</p>
            <div className="otp">{otp}</div>
            <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
          </div>
          <div className="footer">
            <p>&copy; 2025 sellora.com. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  );
};

export default LoginOtpEmailTemplate;

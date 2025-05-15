import { dynamincOtp, isEmpty, responseFun } from "@/Http/helper";
import { sellerModel } from "@/Http/Models/sellerModel";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "../../../../../../lib/dbConnect";
import React from "react";
import LoginOtpEmailTemplate from "@/app/emailTemplate/LoginOtpEmailTemplate";
import { sendMailByNodeMailer } from "@/app/api/sendMail/route";
import { userModal } from "@/Http/Models/userModel";
import { sendMobileSMS } from "@/Http/smsHelper";
 const ReactDOMServer =  require('react-dom/server');


export async function POST(request) {
    await connectDb()
    const {email, mobile} = await request.json(); 
    const username = email || mobile;
    try{ 
        const user = await userModal.findOne({
                   $or: [
                       { email: username },
                       { mobile: username }
                   ]
               })
        const new_otp =  dynamincOtp(111111, 999999);
        const subject = "Login Otp";
        
        const htmlContent = ReactDOMServer.renderToString(
            React.createElement(LoginOtpEmailTemplate, {name:user.full_name, otp: new_otp})
        ) 

        await sendMailByNodeMailer(user.email, subject, htmlContent)

        const sender = "sellora";
        const receiver = `+${user.mobile_code}${user.mobile}`;
        const message = `Dear ${user.full_name}. Your one-time password (OTP) for login is: ${new_otp}`;
        await sendMobileSMS(sender, receiver, message);

        const expirationTime =  Date.now() + (5 * 60 * 1000);
        const otpData = {
            otp:new_otp,
            otp_for:"Login",
            time: new Date().getTime(), 
        } 
        const response = NextResponse.json({
            message:"Login Success",
            status:true, 
            expirationTime
        },  { status: 200 });

        

        response.cookies.set('user_otp', JSON.stringify(otpData), {
             maxAge:5*60,
            // httpOnly: true,  
            // secure: true,
        }); 

        return response; 
    }catch(error){
        console.log(error);
        return responseFun(false,{error:error.message},200)

    }
}
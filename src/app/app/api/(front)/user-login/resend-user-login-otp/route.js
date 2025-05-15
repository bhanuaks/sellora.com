import { dynamincOtp, isEmpty, responseFun } from "@/Http/helper"; 
import { NextResponse } from "next/server"; 
import LoginOtpEmailTemplate from "@/app/emailTemplate/LoginOtpEmailTemplate";
import { sendMailByNodeMailer } from "@/app/api/sendMail/route";
import { userModal } from "@/Http/Models/userModel";
import { connectDb } from "../../../../../../../lib/dbConnect";
import React from "react";
import { otpModal } from "@/Http/Models/otpModal";
import { sendMobileSMS } from "@/Http/smsHelper";
const ReactDOMServer =  require('react-dom/server');


export async function POST(request) {
    await connectDb()
    const {username} = await request.json();  
    try{  

          const user = await userModal.findOne({
                    $or: [
                        { email: username },
                        { mobile: username }
                    ]
                }).select('password email mobile_code mobile full_name')

        if(!user){ 
                 return responseFun(false,{message:"User", status_code:403},200)
            }

        const new_otp =  dynamincOtp(100000, 999999);
        const subject = "Login Otp";
        const htmlContent = ReactDOMServer.renderToString(
            React.createElement(LoginOtpEmailTemplate, {name:user.full_name, otp: new_otp})
        )
        
        await sendMailByNodeMailer(user.email, subject, htmlContent)
        const sender = "sellora";
        const receiver = `+${user.mobile_code}${user.mobile}`;
        const message = `Dear ${user.full_name}. Your one-time password (OTP) for registeration is: ${new_otp}`;
        await sendMobileSMS(sender, receiver, message);

        const expirationTime =  Date.now() + (5 * 60 * 1000);
        const otpData = {
            otp:new_otp,
            otp_for:"Login",
            username:username,
            time: new Date().getTime(), 
        } 
         await otpModal.create(otpData);
         
        const response = NextResponse.json({
            message:"Otp has been resend to your register email and mobile.",
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
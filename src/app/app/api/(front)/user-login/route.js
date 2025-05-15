import { dynamincOtp, isEmpty, responseFun } from "@/Http/helper"; 
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server"; 
import { sendMailByNodeMailer } from "@/app/api/sendMail/route";
import { userModal } from "@/Http/Models/userModel";
import { connectDb } from "../../../../../../lib/dbConnect";
import React from "react";
import LoginOtpEmailTemplate from "@/app/emailTemplate/LoginOtpEmailTemplate";
import { otpModal } from "@/Http/Models/otpModal";
import { sendMobileSMS } from "@/Http/smsHelper";
const ReactDOMServer =  require('react-dom/server');


export async function POST(request) {
    await connectDb()
    const {username, password} = await request.json();

    const errors = {}
    if(isEmpty(username))errors.username = "username is required"
    if(isEmpty(password))errors.password = "password is required"
    if(Object.keys(errors).length>0){
        return responseFun(false,{errors, status_code:400},200)
    }

    try{
        const user = await userModal.findOne({
            $or: [
                { email: username },
                { mobile: username }
            ]
        }).select('password email mobile_code mobile full_name')
       
        if(!user){
                errors.username = "invalid username"
                return responseFun(false,{errors, status_code:400},200)
        }
         
        const matchPassword = bcrypt.compareSync(password, user.password);
        if(!matchPassword){
            errors.password = "password incorrect"
            return responseFun(false,{errors, status_code:400}, 200)
        } 
        const new_otp =  dynamincOtp(100000, 999999);
        const subject = "Login Otp";
         const htmlContent = ReactDOMServer.renderToString(
                    React.createElement(LoginOtpEmailTemplate, {name:user.full_name, otp: new_otp})
                )



        const expirationTime = Date.now() + (5 * 60 * 1000);

        const otpData = {
            otp:new_otp,
            otp_for:"Login",
            username:username,
            time: new Date().getTime(),
            expirationTime
        }
        await otpModal.create(otpData);
        await sendMailByNodeMailer(user.email, subject, htmlContent);

        const sender = "sellora";
        const receiver = `+${user.mobile_code}${user.mobile}`;
        const message = `Dear ${user.full_name}. Your one-time password (OTP) for registeration is: ${new_otp}`;
        await sendMobileSMS(sender, receiver, message);


        const response = NextResponse.json({
            message:"Otp has been send to your register email and mobile.",
            status:true,
            // user:user,
            expirationTime
        },  { status: 200 });

        response.cookies.set('user_otp', JSON.stringify(otpData), {
              expireIn: "5m",
            // httpOnly: true,  
            // secure: true,
        }); 
        return response;

    }catch(error){
        console.log(error.message);
        return responseFun(false,{error:error.message},200)

    }
}
import { dynamincOtp, isEmpty, responseFun } from "@/Http/helper";
import { sellerModel } from "@/Http/Models/sellerModel";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "../../../../../lib/dbConnect";
import { userModal } from "@/Http/Models/userModel";
import LoginOtpEmailTemplate from "@/app/emailTemplate/LoginOtpEmailTemplate";
import { sendMailByNodeMailer } from "../../sendMail/route";
import React from "react";
import { sendMobileSMS } from "@/Http/smsHelper";
const ReactDOMServer =  require('react-dom/server');


export async function POST(request) {
    await connectDb()
    const {username, password} = await request.json();

    const errors = {}
    if(isEmpty(username))errors.username = "username is required"
    if(isEmpty(password))errors.password = "password is required"
    if(Object.keys(errors).length>0){
        return responseFun(false,{errors, status_code:403},200)
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
                return responseFun(false,{errors, status_code:403},200)
        }
         
        const matchPassword = bcrypt.compareSync(password, user.password);
        if(!matchPassword){
            errors.password = "password incorrect"
            return responseFun(false,{errors, status_code:403},200)
        }
         

        const new_otp =  dynamincOtp(111111, 999999);
        const subject = "Login Otp";
        const htmlContent = ReactDOMServer.renderToString(
            React.createElement(LoginOtpEmailTemplate, {name:user.full_name, otp: new_otp})
        ) 
         await sendMailByNodeMailer(user.email, subject, htmlContent)
        const otpData = {
            otp:new_otp,
            otp_for:"Login",
            time: new Date().getTime()
        }

        const sender = "sellora";
        const receiver = `+${user.mobile_code}${user.mobile}`;
        const message = `Dear ${user.full_name}. Your one-time password (OTP) for login is: ${new_otp}`;
        await sendMobileSMS(sender, receiver, message);
        const expirationTime = Date.now() + (5 * 60 * 1000);
        const response = NextResponse.json({
            message:"Login Success",
            status:true,
            user:user,
            expirationTime
        },  { status: 200 });

        response.cookies.set('user_otp', JSON.stringify(otpData), {
              expireIn: "5m",
            // httpOnly: true,  
            // secure: true,
        }); 
        return response;

    }catch(error){
        console.log(error);
        return responseFun(false,{error:error.message},200)

    }
}
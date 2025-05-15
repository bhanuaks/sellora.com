import { sendMailByNodeMailer } from "@/app/api/sendMail/route";
import RegisterOtpEmailTemplate from "@/app/emailTemplate/RegisterOtpEmailTemplate";
import { isEmpty, rand, responseFun } from "@/Http/helper";
import { otpModal } from "@/Http/Models/otpModal";
import { userModal } from "@/Http/Models/userModel";
import { sendMobileSMS } from "@/Http/smsHelper";
import { getPreviouslyCachedImageOrNull } from "next/dist/server/image-optimizer";
import { NextResponse } from "next/server";

import React from "react"; 
const ReactDOMServer =  require('react-dom/server');

export async function POST(request) {
    const {searchParams} = new URL(request.url)
    const resend = searchParams.get('searchParams');
    const {

        full_name,
        country,
        role_buyer_seller,
        role_consumer_business,
        tax_id,
        email,
        password ,
        confirm_password,
        company_name,
        address,
        mobile,
        mobile_code,
        mobile_s_name,
        otp,
        term_n_condition

    } = await request.json();

         const errors = {};
        if(isEmpty(mobile_s_name))errors.mobile_s_name = `mobile_s_name is required.`
        if(isEmpty(full_name))errors.full_name = `name is required.`
        if(isEmpty(country))errors.country = `country is required.`
        if(isEmpty(email))errors.email = `email is required.`
        if(isEmpty(password))errors.password = `password is required.`
        if(isEmpty(confirm_password))errors.confirm_password = `confirm password is required.`
        if(isEmpty(address))errors.address = `address is required.`
        if(isEmpty(company_name))errors.company_name = `company name is required.`
        if(isEmpty(mobile))errors.mobile = `Phone number is required.`
        if(isEmpty(term_n_condition))errors.term_n_condition = `Please accept term and condition.`

        if(password && password.length < 8){ 
            errors.password = `password must be 8 min characters.` 
        }else if(password && confirm_password && password != confirm_password){
            errors.confirm_password = `password and confirm password must be same password.` 
        }
        
        if(Object.keys(errors).length>0){
            return responseFun(false, {errors, status_code:400}, 200); 
        } 
    try{


         const mobileExiste =  await userModal.findOne({mobile:mobile});
                const emailExiste =  await userModal.findOne({email:email});
                if(mobileExiste){
                    errors.mobile = `This number is already registered.`
                    return responseFun(false, {errors, status_code:400}, 200); 
                }
                if(emailExiste){
                    errors.email = `This email is already registered.`
                    return responseFun(false, {errors, status_code:400}, 200); 
                }
         
        const new_otp =  rand(100000,999999)
        const subject = "Registration OTP";
        const message = `<p>Registration OTP is ${new_otp}. This otp valid for 5 minutes.</p>` 
          
        return await sentOtoFun(mobile, new_otp, subject, message, email, full_name, mobile_code);  
         
    }catch(error){
        console.log(error);
        return responseFun(false, {error:error.message}, 200);
    }

}


export async function sentOtoFun(mobile, otp, subject, message, email, full_name, mobile_code){
    const new_otp = otp  
    const expirationTime =  Date.now() + (5 * 60 * 1000);
    const otpData = {
        otp:new_otp,
        otp_for:"user_otp",
        time: new Date().getTime(), 
        username:email,
        expirationTime
    } 
    await otpModal.create(otpData);

    const htmlContent = ReactDOMServer.renderToString(
        React.createElement(RegisterOtpEmailTemplate, {name:full_name, otp: new_otp})
    )

     await sendMailByNodeMailer("php1@aksindia.com", subject, htmlContent)

     const sender = "sellora";
        const receiver = `+${mobile_code}${mobile}`;
        const message1 = `Dear ${full_name}. Your one-time password (OTP) for registeration is: ${new_otp}`;
       const responseFun =  await sendMobileSMS(sender, receiver, message1);
       

    const response = NextResponse.json({
        message:"Otp has been send successfully your email or mobile.",
        status:true, 
        expirationTime
    },  { status: 200 });
    // response.cookies.set('user_otp', JSON.stringify(otpData), {
    //     maxAge: 5 * 60, 
    // }); 

    return response; 
}
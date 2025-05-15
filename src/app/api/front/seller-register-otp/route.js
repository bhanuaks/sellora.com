import { dynamincOtp, isEmpty, responseFun, testMobile } from "@/Http/helper";
import { NextResponse } from "next/server";
import { sendMailByNodeMailer, sendOtpMail } from "../../sendMail/route";
import { sendMobileSMS } from "@/Http/smsHelper";



export async function POST(request) { 
    const {mobile, email, mobile_code, name} = await request.json();
    const errors ={}; 
    if(isEmpty(mobile))errors.mobile = "Mobile is required"
    if(Object.keys(errors).length>0){
        return responseFun(false, {errors},200)
    }

    try{
         
        const new_otp =  dynamincOtp(100000, 999999);
        const subject = "Register Otp"; 
        const otpData = {

            otp:new_otp,
            otp_for:"register",
            time: new Date().getTime()
            
        } 

        const sender = "sellora";
        const receiver = `+${mobile_code}${mobile}`;
        const message = `Dear ${name}. Your one-time password (OTP) for Login is: ${new_otp}`;
       const responseFun =  await sendMobileSMS(sender, receiver, message);

        const response = NextResponse.json({status:true, data:{ message:"OTP has been send your email successfully.", status_code:203}})
        response.cookies.set('otpData', JSON.stringify(otpData), {
            maxAge: 10 * 60, 
            // httpOnly: true,  
            // secure: true,  
            // path: '/',   
        });
        return response

    }catch(error){
        console.log(error);
        return NextResponse.json(false, {error},200)
    }
    
}
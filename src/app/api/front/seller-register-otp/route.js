import { dynamincOtp, isEmpty, responseFun, testMobile } from "@/Http/helper";
import { NextResponse } from "next/server";
import { sendMailByNodeMailer, sendOtpMail } from "../../sendMail/route";



export async function POST(request) { 
    const {mobile, email} = await request.json();
    const errors ={}; 
    if(isEmpty(mobile))errors.mobile = "Mobile is required"
    if(Object.keys(errors).length>0){
        return responseFun(false, {errors},200)
    }

    try{
         
        const new_otp = 123456 //dynamincOtp(111111, 999999);
        const subject = "Register Otp";
        const message = `<p>login Otp is ${new_otp}. This otp valid for 10 minutes.</p>`
        // const emailRes = await sendMailByNodeMailer(email, subject, message)
        const otpData = {
            otp:new_otp,
            otp_for:"register",
            time: new Date().getTime()
        }

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
import { dynamincOtp, isEmpty, responseFun } from "@/Http/helper";
import { sellerModel } from "@/Http/Models/sellerModel";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "../../../../../../lib/dbConnect";
 


export async function POST(request) {
    await connectDb()
    const {email, mobile} = await request.json(); 

    try{ 
        const new_otp = 123456 //dynamincOtp(111111, 999999);
        const subject = "Login Otp";
        const message = `<p>login Otp is ${new_otp}. This otp valid for 10 minutes.</p>` 
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
        return responseFun(false,{error},200)

    }
}
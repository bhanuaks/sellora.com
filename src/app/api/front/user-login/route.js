import { dynamincOtp, isEmpty, responseFun } from "@/Http/helper";
import { sellerModel } from "@/Http/Models/sellerModel";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "../../../../../lib/dbConnect";
import { userModal } from "@/Http/Models/userModel";


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
        }).select('password email mobile')
       
        if(!user){
                errors.username = "invalid username"
                return responseFun(false,{errors, status_code:403},200)
        }
         
        const matchPassword = bcrypt.compareSync(password, user.password);
        if(!matchPassword){
            errors.password = "password incorrect"
            return responseFun(false,{errors, status_code:403},200)
        }
         

        const new_otp = 123456 //dynamincOtp(111111, 999999);
        const subject = "Login Otp";
        const message = `<p>login Otp is ${new_otp}. This otp valid for 10 minutes.</p>`
        
        const otpData = {
            otp:new_otp,
            otp_for:"Login",
            time: new Date().getTime()
        }


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
        return responseFun(false,{error},200)

    }
}
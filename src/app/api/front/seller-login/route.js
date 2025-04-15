import { dynamincOtp, isEmpty, responseFun } from "@/Http/helper";
import { sellerModel } from "@/Http/Models/sellerModel";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "../../../../../lib/dbConnect";


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
        const seller = await sellerModel.findOne({
            $or: [
                { email: username },
                { mobile: username }
            ]
        }).select('+password')
       
        if(!seller){
                errors.username = "invalid username"
                return responseFun(false,{errors, status_code:403},200)
        }
         
        const matchPassword = bcrypt.compareSync(password, seller.password);
        if(!matchPassword){
            errors.password = "password incorrect"
            return responseFun(false,{errors, status_code:403},200)
        }
        
        const token = jwt.sign(
            {seller:seller},
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        )


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
            seller:seller,
            expirationTime
        },  { status: 200 });

        response.cookies.set('otpData', JSON.stringify(otpData), {
            maxAge: 5 * 60,
            // httpOnly: true,  
            // secure: true,
        });

        // response.cookies.set('sellerAuthToken',token,{
        //     expireIn:"1d",
        // });

        return response;

    }catch(error){
        console.log(error);
        return responseFun(false,{error},200)

    }
}
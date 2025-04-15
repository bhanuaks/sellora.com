import { dynamincOtp, isEmpty, responseFun } from "@/Http/helper";
import { sellerModel } from "@/Http/Models/sellerModel";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "../../../../../../lib/dbConnect";
 

export async function POST(request) {
    await connectDb()
    const {email, mobile, otp} = await request.json();
    const errors = {}
      if(isEmpty(otp))errors.otp = "otp is required"
      if(Object.keys(errors).length>0){
          return responseFun(false,{errors, status_code:403},200)
       }


        try{

            const otpData1 = request.cookies.get('otpData');  
            const otpData = otpData1 ? JSON.parse(otpData1.value) : null;
            if(!otpData){
                errors.otp = "invalid otp"
                return responseFun(false,{errors, status_code:403 },200)
            }

            if(otpData && otpData.otp_for == "Login" && otpData.otp == otp){
               const seller = await sellerModel.findOne({ email: email }) 
                if(seller){ 

                    seller.lastloginTimeDate = new Date();
                    await seller.save();

                    const token = jwt.sign({
                        seller:seller
                    },process.env.JWT_SECRET) 
                    const response = NextResponse.json({
                        message:"Login Success",
                        status:true,
                        seller:seller
                    },  { status: 200 }); 
            
                    response.cookies.set('sellerAuthToken',token,{
                        expireIn:"1d",
                    });
                    response.cookies.set('otpData','',{
                        maxAge:"0",
                    });
            
                    return response;
                }else{
                    return responseFun(false,{message:"something went wrong. please login again."},200)
                }
               
            }else{
                errors.otp = "invalid otp."
                return responseFun(false,{errors, status_code:403},200)
            }
       
           }catch(error){
               console.log(error);
               return responseFun(false,{error},200)
       
           }
}
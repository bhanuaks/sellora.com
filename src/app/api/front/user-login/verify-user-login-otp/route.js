import { dynamincOtp, isEmpty, responseFun } from "@/Http/helper";
import { sellerModel } from "@/Http/Models/sellerModel";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "../../../../../../lib/dbConnect";
import { userModal } from "@/Http/Models/userModel";
import ItemBreadthModel from "../../../../../../lib/variant/ItemBreadthModel";
import { cartModel } from "@/Http/Models/cartModel";
import mongoose from "mongoose";
import { getPreviouseUrl } from "@/app/api/getPreviouseUrl/route";
// import { userModal } from "@/Http/Models/userModel";
 

export async function POST(request) {
    await connectDb()
    const {email, mobile, otp, cartData} = await request.json();
     
    const errors = {}
      if(isEmpty(otp))errors.otp = "otp is required"
      if(Object.keys(errors).length>0){
          return responseFun(false,{errors, status_code:403},200)
       }


        try{

            const otpData1 = request.cookies.get('user_otp');  
            const otpData = otpData1 ? JSON.parse(otpData1.value) : null;
            if(!otpData){
                errors.otp = "OTP has been expired."
                return responseFun(false,{errors, status_code:403},200)
            }

            
            if(otpData && otpData.otp_for == "Login" && otpData.otp == otp){
               const user = await userModal.findOne({ email: email }) 
                if(user){ 

                    user.lastloginTimeDate = new Date();
                    await user.save();
                    // update Cart data
                    const cartItem = await updateCartWhenLogin(cartData, user)
                    const requestUrl = getPreviouseUrl()
                    // create jwt token
                    const token = jwt.sign({
                        user:user
                    },process.env.JWT_SECRET) 
                    const response = NextResponse.json({
                        message:"Login Success",
                        status:true,
                        // user:user,
                        cartItem:cartItem,
                        requestUrl
                    },  { status: 200 }); 
            
                    response.cookies.set('userAuthToken',token,{
                        expireIn:"1d",
                    });
                    response.cookies.set('user_otp','',{
                        maxAge:"0",
                    });
                    
                    

                    return response;
                }else{
                    return responseFun(false,{message:"something went wrong. please login again."},200)
                }
               
            }else{
                errors.otp = "invalid OTP"
                return responseFun(false,{errors, status_code:403},200)
            }
       
           }catch(error){
               console.log(error);
               return responseFun(false,{error},200)
       
           }
}


export async function updateCartWhenLogin(cartData, user) {

    if(cartData && cartData.length > 0){
        for(const item of cartData){
            const cartProduct = await cartModel.findOne(
                {
                    user_id: user._id,
                    product_id: new mongoose.Types.ObjectId(item.product_id),
                    variant_id: new mongoose.Types.ObjectId(item.variant_id),
                }
            )

            if(cartProduct){
                cartProduct.quantity = item.quantity
                await cartProduct.save();
            }else{
                await cartModel.create({
                    user_id: user._id,
                    product_id: item.product_id,
                    variant_id:item.variant_id,
                    quantity:item.quantity,
                    product_name:item?.product_name
                })
            }
        }
    }
    const cartItem = await cartModel.find({user_id:user._id})
    return cartItem
}
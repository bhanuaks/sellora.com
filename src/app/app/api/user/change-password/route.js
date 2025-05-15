import { getUserByToken } from "@/Http/getUserHelper";
import { encryptText, isEmpty, responseFun } from "@/Http/helper";
import { userModal } from "@/Http/Models/userModel";
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";

export async function POST(request) {
    
    const {
        old_password,
        new_password,
        confirm_password, 
        } = await request.json();
 

        const authHeader = request.headers.get('Authorization');
        const userToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null; 
        if(!userToken){
            return responseFun(false, { error: 'Unauthorized user' }, 403) 
        }  
        const user = getUserByToken(userToken)
        const user_id = user?._id


    const errors = {};

    if(isEmpty(old_password))errors.old_password = "Old password is required."
    if(isEmpty(new_password))errors.new_password = "New password is required."
    if(isEmpty(confirm_password))errors.confirm_password = "confirm password is required."
    
    if(Object.keys(errors).length > 0){
        return responseFun(false, {errors, status_code:400},200)
    }
    
    if(new_password.length < 8){
        errors.new_password = "new password must be 8 and greater than 8 characters"
        return responseFun(false, {errors, status_code:400},200)
    } 

    if(new_password != confirm_password){
        errors.confirm_password = "confirm password should be equalto new password."
        return responseFun(false, {errors, status_code:400},200)
    }


    try{
    const user = await userModal.findById(user_id)
    
    const matchPassword = bcrypt.compareSync(old_password, user.password)
    if(!matchPassword){
        errors.old_password = "Old password dit not match"
        return responseFun(false, {errors, status_code:400},200)
    }

    if(new_password == old_password){
        errors.new_password = "New password and old password should not be same."
        return responseFun(false, {errors, status_code:400},200)
    }

     user.password = bcrypt.hashSync(new_password, parseInt(process.env.BCRYPT_SALT))
     user.show_password = encryptText(new_password)
     await user.save();
     const response  = NextResponse.json(
        {
            status:true,
            message:"Password has been changed successfully."
        },
        {status:200}
     )

     
     return response;
        
    }catch(error){
        console.log(error);
        return responseFun(false, errors, 200)
    }


}
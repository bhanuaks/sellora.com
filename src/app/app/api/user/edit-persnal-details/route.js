import { isEmpty, responseFun } from "@/Http/helper";
import { userModal } from "@/Http/Models/userModel";
import mongoose from "mongoose";
import { getUserByToken } from "@/Http/getUserHelper";


export async function PUT(request) {
    const {
         
        full_name,
        email,
        mobile,
        mobile_code,
        mobile_s_name,
        country,
        role_buyer_seller,
        role_consumer_business,
        gender,

    } = await request.json();


     const authHeader = request.headers.get('Authorization');
        const userToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null; 
        if(!userToken){
            return responseFun(false, { error: 'Unauthorized user' }, 403) 
        }  
        const user = getUserByToken(userToken)
        const _id = user?._id

    const errors = {}

    if(isEmpty(_id))errors._id = "User id is required.";
    if(isEmpty(full_name))errors.full_name = "Name is required.";
    if(isEmpty(email))errors.email = "Email is required.";
    if(isEmpty(mobile))errors.mobile = "Mobile is required.";
    if(isEmpty(country))errors.country = "Country is required.";
    if(isEmpty(gender))errors.gender = "Gender is required.";
    if(Object.keys(errors).length > 0){
        return responseFun(false, {errors, status_code:400},200)
    }

    try{ 
        const mobileExiste =  await userModal.findOne({
            $and: [
                { mobile: { $eq: mobile } }, 
                { _id: { $ne: new mongoose.Types.ObjectId(_id) } }   
            ]
        });

        const emailExiste =  await userModal.findOne({
            $and: [
                { email: { $eq: email } }, 
                { _id: { $ne: new mongoose.Types.ObjectId(_id) } }   
            ]
        });

        if(mobileExiste){
            errors.mobile = `This number already exist.`
            return responseFun(false, {errors, status_code:400}, 200); 
        }
        if(emailExiste){
            errors.email = `This email already exist.`
            return responseFun(false, {errors, status_code:400}, 200); 
        }


        const updateUser = await userModal.findByIdAndUpdate(_id,{
            full_name,
            email,
            mobile,
            mobile_code,
            mobile_s_name,
            country,
            role_buyer_seller,
            role_consumer_business,
            gender,
        })
 
        return responseFun(true, {message:"Personal Information Updated successfully."}, 200)

    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
}
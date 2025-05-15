import { isEmpty, responseFun } from "@/Http/helper";
import { userAddressModel } from "@/Http/Models/userModel";
import mongoose from "mongoose";
import { connectDb } from "../../../../../../lib/dbConnect";
import { getUserByToken } from "@/Http/getUserHelper";



export async function POST(request) {
    connectDb();

     const authHeader = request.headers.get('Authorization');
        const userToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null; 
        if(!userToken){
            return responseFun(false, { error: 'Unauthorized user' }, 403) 
        } 

        const user = getUserByToken(userToken)
        const userId = user?._id


    const { searchParams } = new URL(request.url)
    const address_type = searchParams.get("address_type");
     if(address_type == "Billing"){
        return await updateBillingAddress(request, userId)
     }else{
        return await updateShippingAddress(request, userId) 
     }
}


async function updateBillingAddress(request, _id) {
    const { 
        user_id, 
        b_first_name,
        b_last_name,
        b_email,
        b_address,
        b_company_name,
        b_country,
        b_city,
        b_state,
        b_zipcode,
        b_phone_number

    } = await request.json();

    const errors = {}; 
    
    if(isEmpty(b_first_name))errors.b_first_name = "First name is required."
    if(isEmpty(b_last_name))errors.b_last_name = "Last name is required."
    if(isEmpty(b_email))errors.b_email = "Email is required."
    if(isEmpty(b_address))errors.b_address = "Street address is required."
    if(isEmpty(b_country))errors.b_country = "Country is required."
    if(isEmpty(b_city))errors.b_city = "City is required."
    if(isEmpty(b_state))errors.sb_tate = "State is required."
    if(isEmpty(b_zipcode))errors.b_zipcode = "Zipcode is required."
    if(isEmpty(b_phone_number))errors.b_phone_number = "Phone number is required."

    if(Object.keys(errors).length > 0){
        return responseFun(false, {errors, status_code:400},200)
    }

    
    try{
        const existShiipingAddress = await userAddressModel.findOne({user_id:new mongoose.Types.ObjectId(_id)})
        if(existShiipingAddress){
            await userAddressModel.findOneAndUpdate({user_id:new mongoose.Types.ObjectId(_id)},{
                b_first_name,
                b_last_name,
                b_email,
                b_address,
                b_company_name,
                b_country,
                b_city,
                b_state,
                b_zipcode,
                b_phone_number
            })
        }else{
            await userAddressModel.create({
                user_id:_id, 
                b_first_name,
                b_last_name,
                b_email,
                b_address,
                b_company_name,
                b_country,
                b_city,
                b_state,
                b_zipcode,
                b_phone_number
            })
        }
        return responseFun(true, {message:"Biiling Address updated successfully."}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    } 

}

async function updateShippingAddress(request, _id) {
    
    const { 
        user_id, 
        first_name,
        last_name,
        email,
        address,
        company_name,
        country,
        city,
        state,
        zipcode,
        phone_number

    } = await request.json();
    const errors = {};

    if(isEmpty(first_name))errors.first_name = "First name is required."
    if(isEmpty(last_name))errors.last_name = "Last name is required."
    if(isEmpty(email))errors.email = "Email is required."
    if(isEmpty(address))errors.address = "Street address is required."
    if(isEmpty(country))errors.country = "Country is required."
    if(isEmpty(city))errors.city = "City is required."
    if(isEmpty(state))errors.state = "State is required."
    if(isEmpty(zipcode))errors.zipcode = "Zipcode is required."
    if(isEmpty(phone_number))errors.phone_number = "Phone number is required."

    if(Object.keys(errors).length > 0){
        return responseFun(false, {errors, status_code:400},200)
    }

    try{
        const existShiipingAddress = await userAddressModel.findOne({user_id:new mongoose.Types.ObjectId(_id)})
        if(existShiipingAddress){
            await userAddressModel.findOneAndUpdate({user_id:new mongoose.Types.ObjectId(_id)},{
                first_name,
                last_name,
                email,
                address,
                company_name,
                country,
                city,
                state,
                zipcode,
                phone_number
            })
        }else{
            await userAddressModel.create({
                user_id:_id, 
                first_name,
                last_name,
                email,
                address,
                company_name,
                country,
                city,
                state,
                zipcode,
                phone_number
            })
        }
        return responseFun(true, {message:"Shipping Address updated successfully."}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
}
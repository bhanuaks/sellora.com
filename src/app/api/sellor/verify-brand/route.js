import { isEmpty, responseFun } from "@/Http/helper";
import { brandModel } from "@/Http/Models/branModel";
import mongoose from "mongoose";


export async function POST(request) {
    const {seller_id, name } = await request.json();
    
    const errors = {};
    if(isEmpty(name))errors.name ="brand name is required"
    if(Object.keys(errors).length>0){
        return responseFun(false, {errors, status_code:403},200)
    }
    try{
        const brand = await brandModel.findOne({
            seller_id:new mongoose.Types.ObjectId(seller_id), 
            name: name,
            // status:1
        })
        if(!brand){
            errors.name = "invalid brand" 
        }else if(brand.status==2){
             errors.name = "This brand not approved please wait"
        }else if(brand.status==0){
            errors.name = "This brand has rejected by admin"
        }

        if(Object.keys(errors).length>0){
            return responseFun(false, {errors, status_code:403},200)
        }

        return responseFun(true, {message:"brand has been verified"},200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
}
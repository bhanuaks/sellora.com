import { isEmpty, responseFun } from "@/Http/helper";
import { userCompanyModal } from "@/Http/Models/userModel";
import mongoose from "mongoose";


export async function POST(request) {
    const {
        _id,
        user_id,
        company_name,
        country, 
        tax_id,
        address,
        website,
        established_year,

    } = await request.json();


    const errors = {}

    if(isEmpty(company_name))errors.company_name = "Company name required."
     if(isEmpty(country))errors.country = "Country is required."
     if(isEmpty(address))errors.address = "Address is required."
     if(isEmpty(established_year))errors.established_year = "Year Established is required."

     if(Object.keys(errors).length > 0){
        return responseFun(false, {errors, status_code:400}, 200)
     }

     try{
        const companyInfo =  await userCompanyModal.findOneAndUpdate(
            {user_id: new mongoose.Types.ObjectId(user_id)},
            {
                $set:{
                    user_id,
                    company_name,
                    country, 
                    tax_id,
                    address,
                    website,
                    established_year
                }
                
            },
            {upsert:true, new:true}
        )
        if(!companyInfo){
            const new_Company =  await userCompanyModal.create(
                {
                        user_id,
                        company_name,
                        country, 
                        tax_id,
                        address,
                        website,
                        established_year
                })
        }
        return responseFun(true, {message:"Company Information has been updated successfully."}, 200)
     }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
     }


 }
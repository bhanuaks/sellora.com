import { responseFun } from "@/Http/helper";
import { sellorShippingTempleteModel } from "@/Http/Models/sellerModel";
import mongoose from "mongoose";


export async function POST(request) {

    const {
        _id,
        seller_id,
        shipping_content,
        shipping_rate_model,
        shipping_type,
        address_type,
        transit_time,
        shipping_n_handling_charge,
        charge_type,
        charge_amount
    } = await request.json();


    try{
        const alreadyExist = await sellorShippingTempleteModel.findOne({
            seller_id: new mongoose.Types.ObjectId(seller_id),
            shipping_type:shipping_type
        })
        if(alreadyExist){
            const update = await sellorShippingTempleteModel.findByIdAndUpdate(_id,{
                shipping_content,
                shipping_rate_model,
                shipping_type,
                address_type,
                transit_time,
                shipping_n_handling_charge,
                charge_type,
                charge_amount
            })
        }else{
            const newRow = await sellorShippingTempleteModel.create({
                seller_id,
                shipping_content,
                shipping_rate_model,
                shipping_type,
                address_type,
                transit_time,
                shipping_n_handling_charge,
                charge_type,
                charge_amount
            })
        }
        return responseFun(true, {error:"Shipping Templete Created successfully."},200)

    }catch(error){
        console.log(error);
        return responseFun(false, {error:error},200)
    }
}
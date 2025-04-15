import { responseFun } from "@/Http/helper";
import { productThresholdModel } from "@/Http/Models/productModel";
import mongoose from "mongoose";


export async function POST(request) {
    
    const {
        _id,
        product_id,
        quantity_base_discount,
        type_threshold_levels_1_unit,
        threshold_levels_1_discount,

        threshold_levels_2_unit,
        threshold_levels_2_discount,

        threshold_levels_3_unit,
        threshold_levels_3_discount,

        threshold_levels_1_fixed_price,
        threshold_levels_2_fixed_price,
        threshold_levels_3_fixed_price,

    } = await request.json()

    try{
        let responseData = null;
        if(_id){
             responseData = await productThresholdModel.findByIdAndUpdate(_id, {
                product_id,
                quantity_base_discount,
                type_threshold_levels_1_unit,
                threshold_levels_1_discount,
        
                threshold_levels_2_unit,
                threshold_levels_2_discount,
        
                threshold_levels_3_unit,
                threshold_levels_3_discount, 

                threshold_levels_1_fixed_price,
                threshold_levels_2_fixed_price,
                threshold_levels_3_fixed_price,
            })
        }else{
             responseData = await productThresholdModel.create({
                product_id,
                quantity_base_discount,
                type_threshold_levels_1_unit,
                threshold_levels_1_discount,
        
                threshold_levels_2_unit,
                threshold_levels_2_discount,
        
                threshold_levels_3_unit,
                threshold_levels_3_discount,
        
                threshold_levels_1_fixed_price,
                threshold_levels_2_fixed_price,
                threshold_levels_3_fixed_price,
            })
        }
        
        return responseFun(true, responseData, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
}


export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const product_id = searchParams.get('product_id');
    try{
        const threshold = await productThresholdModel.findOne({
            product_id: new mongoose.Types.ObjectId(product_id)
        })
        return responseFun(true, {threshold:threshold},200);
    }catch(error){
        console.log(error);
        return responseFun(false, {error:error},200)
    }
  
}
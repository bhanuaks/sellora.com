import { responseFun } from "@/Http/helper";
import { cartModel } from "@/Http/Models/cartModel";
import { productModel, productVariantModel } from "@/Http/Models/productModel";
import mongoose from "mongoose";



export async function POST(request) { 

    const {product_id, variant_id, user_id, quantity } = await request.json();

    if(!product_id || !variant_id || !user_id){
        return responseFun(false, {message:"user Id, product Id  and variant Id are required"}, 200) 
    }
    const session = await mongoose.startSession(); 
    session.startTransaction(); 
    try{
        const product = await productModel.findById(product_id) 
        const addToCartData = {
            user_id:user_id,
            product_id:product_id,
            variant_id:variant_id,
            product_name:product.product_name,
            quantity:quantity || 1
        }

        let cart = await cartModel.findOne({
            user_id:new mongoose.Types.ObjectId(user_id),
            product_id:new mongoose.Types.ObjectId(product_id),
            variant_id:new mongoose.Types.ObjectId(variant_id),
        })

        if(cart){
            cart.quantity =  quantity || 1;
            await cart.save();
        }else{
            cart = await cartModel.create(addToCartData)
        } 

        return responseFun(true, {cart}, 200)

    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }

}
import { responseFun } from "@/Http/helper";
import { cartModel } from "@/Http/Models/cartModel";
import mongoose from "mongoose";


export async function POST(request) {
    const {product_id, variant_id, user_id, quantity } = await request.json();

     if(!product_id || !variant_id || !user_id || !quantity){
            return responseFun(false, {message:"user Id, product Id, variant Id and quantity are required"}, 200) 
        }


        const session = await mongoose.startSession()
        session.startTransaction();
        try{
            const cart = await cartModel.updateOne(
                {
                    product_id: new mongoose.Types.ObjectId(product_id),
                    variant_id: new mongoose.Types.ObjectId(variant_id)
                },
                {
                    $set:{
                        quantity:quantity
                    }
                }
            )
            session.commitTransaction()
            return responseFun(true, {message:"quantity updated"}, 200)
        }catch(error){
            console.log(error);
            session.abortTransaction();
            return responseFun(false, {error}, 200)
        }

}
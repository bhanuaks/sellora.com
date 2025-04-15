import { responseFun } from "@/Http/helper";
import { cartModel } from "@/Http/Models/cartModel";
import mongoose from "mongoose";


export async function POST(request) {
    
    const {product_id, variant_id, user_id } = await request.json();

    const session = await mongoose.startSession();

    try{
        const deleteProductFromCart =  await cartModel.findOneAndDelete({
            product_id: new mongoose.Types.ObjectId(product_id),
            variant_id: new mongoose.Types.ObjectId(variant_id),
            user_id: new mongoose.Types.ObjectId(user_id),
        })
        session.commitTransaction();
        return responseFun(true, {message:"Product has been removed from cart"}, 200)
    }catch(error){
        console.log(error);
        session.abortTransaction();
        return responseFun(false, {error}, 200)
    }
}
import { responseFun } from "@/Http/helper";
import { brandModel } from "@/Http/Models/branModel";
import { Category } from "../../../../../lib/categoryModel";
import mongoose from "mongoose";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const seller_id = searchParams.get('seller_id')
    
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const brand =  await brandModel.find({status:1});
        const category = await Category.find({status:"Active"});
        session.commitTransaction();
        return responseFun(true, {brand, category}, 200)

    }catch(error){
        console.log(error);
        session.abortTransaction();
        return responseFun(false, {error}, 200)
    } finally {
        session.endSession(); 
    }
}
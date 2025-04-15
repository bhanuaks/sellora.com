import { responseFun } from "@/Http/helper";
import { userAddressModel } from "@/Http/Models/userModel";
import mongoose from "mongoose";


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    try{
        const address = await userAddressModel.findOne({user_id: new mongoose.Types.ObjectId(user_id)})
        return responseFun(true, {address}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }

}
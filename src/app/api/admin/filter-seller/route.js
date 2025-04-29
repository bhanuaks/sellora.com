import { responseFun } from "@/Http/helper";
import { sellerModel } from "@/Http/Models/sellerModel";

export async function GET(request) {
    
    try{
        const seller = await sellerModel.find().sort({name:1}).select("_id, name")
        return responseFun(true, {seller}, 200) 
    }catch(error){
        console.log(error);
        return responseFun(false, error.message, 500)
    }
}
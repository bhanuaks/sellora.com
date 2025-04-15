import { responseFun } from "@/Http/helper";
import { productVariantModel } from "@/Http/Models/productModel";


export async function POST(request) {
    const {variant_id, status} = await request.json()

    let listingStatus = null
    if(status=="Archive"){
        listingStatus = 3
    }else if(status=="Delete"){
        listingStatus = 4
    }
   
    try{
        const variant = await productVariantModel.findById(variant_id);
        variant.listingStatus = listingStatus
        await variant.save();
        return responseFun(false, {message:"success"}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
}

import { responseFun } from "@/Http/helper";
import { productVariantModel } from "@/Http/Models/productModel";


export async function PUT(request) {
    
    const { product_id, variant_id , status } = await request.json();
    if(!product_id || !variant_id){
        return responseFun(false, "Bad request", 400)
    }
    if(status != 1 && status != 0){
        return responseFun(false, "Bad request", 400)
    }
  
    try{
        const variant = await productVariantModel.findById(variant_id)
        if(variant.isProcessing == "Approved"){
            return responseFun(false, "This Product already Approved", 200)
        }
        if(variant.isProcessing == "Rejected"){
            return responseFun(false, "This Product already Rejected", 200)
        }
       await productVariantModel.findByIdAndUpdate(
            variant_id, 
            {
                isProcessing:status== 1 ?"Approved": "Rejected",
                approved_status:1,
            }
        )

        return responseFun(true, `${status ==1?"Approved":"Rejected" }`, 200)
    }catch(error){
        console.log(error.message);
        return responseFun(false, error.message, 500)
    }
}
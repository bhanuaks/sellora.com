import { getVariantAttribute, responseFun } from "@/Http/helper";
import { productVariantModel, variantThresholdSchemaModal } from "@/Http/Models/productModel";
import mongoose from "mongoose";
import { fetchVariant } from "../sellor/product/add-variant/route";


// export  async function GET(request) {
    
//     try{

//         const variant = {
//                             "colorId": "67737065698e7c6a4d08f488",
//                             "sizeId": "67736892698e7c6a4d08f452", 
//                         };
//     const query = {};
//     Object.keys(variant).map((key)=>{ 
//         query[`customAttributes.${key}`]= { $regex: variant[key], $options: 'i' }  
//     })

//     console.log(query);
    

//         let  selectedVariantExist = await productVariantModel.findOne(query)
//         return responseFun(true, selectedVariantExist, 200) 
//     }catch(error){
//         console.log(error);
//         return responseFun(true, selectedVariantExist, 200)
//     }
   
// }


export  async function GET(request) {
    
    try{ 
        const varArra = []
        let  variants = await productVariantModel.find({product_id:new mongoose.Types.ObjectId("678b9031d7a15c0ddcafafde")})
        const processedVariants = await Promise.all(
            variants.map(async (item)=>{
                const vData = await structureVariant(item); 
                return vData;
            })
        )
        varArra.push(...processedVariants)
        return responseFun(true, varArra, 200) 
        
    }catch(error){
        console.log(error);
        return responseFun(true, error, 200)
    }
   
}


export async function  getProductVariantData(product_id) {
       
    try{ 
        const varArra = []
        let  variants = await productVariantModel.find({product_id:new mongoose.Types.ObjectId(product_id)}).sort({consumerSalePrice:1})
        const processedVariants = await Promise.all(
            variants.map(async (item)=>{
                const vData = await structureVariant(item); 
                return vData;
            })
        )
        varArra.push(...processedVariants)
        return  processedVariants
        
    }catch(error){
        console.log(error);
        return[]
    }
}

async function structureVariant(variant) {
    try{
     const threshold = await variantThresholdSchemaModal.find({variant_id : variant._id}).sort({unit:1})
    const data = {
         _id: variant._id, 
         sku:variant.sku, 
         sin:variant.sin, 

         withImage: variant.withImage,
         image_1: variant.image_1,
         image_2: variant.image_2,
         image_3: variant.image_3,
         image_4: variant.image_4,
         image_5: variant.image_5,
         image_6: variant.image_6,
         image_7: variant.image_7,
         businessSalePrice:variant.businessSalePrice,
         consumerSalePrice:variant.consumerSalePrice,
         currency:variant.currency,
         fulfillmentBy:variant.fulfillmentBy,
         msrp:variant.msrp,
         shippingProvider:variant.shippingProvider, 
         stock:variant.stock,
         taxCode:variant.taxCode,
         taxRate:variant.taxRate,
         product_id:variant.product_id,
         customAttributes:variant.customAttributes,
         discount_type:variant.discount_type,
         stock_status:variant.stock_status,
         threshold,
    };
     
        if(variant.customAttributes){
            Object.entries(variant.customAttributes).map((vItem)=>{
                data[vItem[0]] = vItem[1];  
            })
        }
    

    return data
    }catch(error){
        console.log(error);
        return []
    }

    
}
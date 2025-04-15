import { responseFun } from "@/Http/helper";
import { productModel, productOtherDetailModel, productVariantModel, variantThresholdSchemaModal } from "@/Http/Models/productModel";
import mongoose from "mongoose";
import { fetchVariant } from "../add-variant/route";

export async function GET(request) {
    
    const { searchParams } = new URL(request.url)

    const product_id = searchParams.get('product_id')
    const variant_id = searchParams.get('variant_id')

    try{
        const product =  await productModel.findById(product_id)
        .populate('category_id', 'name')
        .populate('subcategory_id', 'subCategoryName')
        .populate('childcategory_id', 'childCategoryName')
        .populate('brand_id', 'name')
        const variants =  await productVariantModel.find({
            product_id: new mongoose.Types.ObjectId(product_id)
        }) 
        const otherDetail =  await productOtherDetailModel.findOne({product_id: new mongoose.Types.ObjectId(product_id)})

         const variantListWithValue = await Promise.all( 
            variants.map(async (variant) => {
                            let variantItems = {}; 
                            const threshold = await variantThresholdSchemaModal.find({variant_id: variant._id})
                              
                            return { 
                                ...variant.toObject(),  
                                threshold:threshold
                            };  
                        })
            
                    )

        return responseFun(true, {product, variants:variantListWithValue, otherDetail}, 200) 
    }catch(error){
        console.log(error);
        return responseFun(false, error, 200)
    }
}
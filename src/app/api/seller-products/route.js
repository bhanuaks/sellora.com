import { responseFun } from "@/Http/helper"
import { productModel, productVariantModel } from "@/Http/Models/productModel"
import mongoose from "mongoose"
import { Category } from "../../../../lib/categoryModel"


export async function GET(request) {
    const {searchParams} = new URL(request.url)  
    const seller_id = searchParams.get('seller_id')
    const category_slug = searchParams.get('category_slug')

    try{
         const categories = await productModel.find({
            seller_id:new mongoose.Types.ObjectId(seller_id)
         }).select('category_id').lean();
         const category_id = categories.map(item => item.category_id);

         const sellerCategories = await Category.find({
            _id:{$in:category_id},
            status:"Active"
         }).select('name slug').lean()

         const productQuery = {seller_id:new mongoose.Types.ObjectId(seller_id)};
         if(category_slug){
            const fetchCat = await Category.findOne({slug:category_slug}).lean()
            if(fetchCat){
                productQuery.category_id = fetchCat._id
            }
         }

         const products = await productModel.find(productQuery)
         const productWithVariant = await Promise.all(
            products.map(async (prod)=>{
                const variant = await productVariantModel.findOne({
                    product_id:prod._id,
                    listingStatus:1
                })
                .sort({consumerSalePrice:1})

                return {
                    ...prod.toObject(),
                    variant:variant
                }
            })
         )
        return responseFun(true, {category:sellerCategories, products:productWithVariant}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, error, 200)
    }

}
import { responseFun } from "@/Http/helper";
import { Category } from "../../../../../../lib/categoryModel";
import { getVariantTemlate } from "../../get-category-and-brand/route";


export async function POST(request){

    const {seller_id, category_id, subcategory_id, childcategory_id, brand_id, seller, product_id,  withData } = await request.json();

    try{ 

        const category = await Category.findById(category_id)
        
        const returnData = {
            category:category,  
        }
        return responseFun(true, returnData,200)

    }catch(error){
        console.log(error);
        return responseFun(false, {error},200)
    }
}
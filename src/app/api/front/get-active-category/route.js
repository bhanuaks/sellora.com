import { responseFun } from "@/Http/helper";
import { Category } from "../../../../../lib/categoryModel";
import ChildCategory from "../../../../../lib/childcategoryModel";
import { connectDb } from "../../../../../lib/dbConnect";
import { subCategory } from "../../../../../lib/subcategoryModel";



export async function GET(request) {
    connectDb(); 

    try{
        const query = {status:"Active"}; 
        
        const categories = await Category.find(query)
        .select("_id name slug photo list_image")
        .sort({name:1}); 
        // get sub category
        const categoryWithSubcate = await Promise.all(
            categories.map(async (categoryItem)=>{
                const subcategory = await subCategory.find({category_id:categoryItem._id, status:"Active"})
                .select("_id category_id subCategoryName slug")
        // get chield category
                const subCateWithChildcate = await Promise.all(
                    subcategory.map(async (subCateItem)=>{ 
                        const childcategory = await ChildCategory.find({
                            category_id:categoryItem._id,
                             subCategoryId:subCateItem._id,
                             status:"Active"
                             })
                             .select("_id category_id subCategoryId childCategoryName slug")
                              
                             return {
                                ...subCateItem.toObject(),  
                                childcategory,  
                            };
                    })
                )

                return {
                    ...categoryItem.toObject(), 
                    subcategories: subCateWithChildcate,  
                };
            }) 
        ) 

        return responseFun(true, categoryWithSubcate, 200)
        
    }catch(error){
        console.log(error);
        return responseFun(false,{error},200)
    }
}


export async function DELET(request) {
    
    try{
        return responseFun(false, "", 500)

    }catch(error){
        return responseFun(false, "", 500)
    }
}
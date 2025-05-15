import { responseFun } from "@/Http/helper";
 
import { connectDb } from "../../../../../../lib/dbConnect";
import { Category } from "../../../../../../lib/categoryModel";
import { subCategory } from "../../../../../../lib/subcategoryModel";
import ChildCategory from "../../../../../../lib/childcategoryModel";



export async function GET(request) {
    connectDb()
    try{
        const categories = await Category.find({status:"Active"})
        .select("_id name slug list_image status ")
        .sort({name:1})
        
            const categoryWithSubcate = await Promise.all(
                    categories.map(async (categoryItem)=>{
                        const subcategory = await subCategory.find({category_id:categoryItem._id, status:"Active"})
                        .select("_id subCategoryName slug")
                
                        const subCateWithChildcate = await Promise.all(
                            subcategory.map(async (subCateItem)=>{ 
                                const childcategory = await ChildCategory.find({
                                    category_id:categoryItem._id,
                                     subCategoryId:subCateItem._id,
                                     status:"Active"
                                     }).select("_id childCategoryName slug").lean();
                                      
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


        return responseFun(true, {categories:categoryWithSubcate}, 200) 
    }catch(error){
        return responseFun(false, {message:error.message}, 500)
    }
}



export async function POST() {
    try{ 
        return responseFun(true, "", 200) 
    }catch(error){
        return responseFun(false, {message:error.message}, 500)
    }
}
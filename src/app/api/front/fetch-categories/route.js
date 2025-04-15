import { responseFun } from "@/Http/helper";
import { Category } from "../../../../../lib/categoryModel";
import { subCategory } from "../../../../../lib/subcategoryModel";
import ChildCategory from "../../../../../lib/childcategoryModel";
import { connectDb } from "../../../../../lib/dbConnect";


export async function GET(request) {
    connectDb();
    const {searchParams} = new URL(request.url)
    const search = searchParams.get('search') 

    try{
        const query = {status:"Active", showList:"Yes"}; 
        if(search){
            query.name = { $regex: search, $options: "i" };
        } 
        const categories = await Category.find(query).sort({name:1}); 
        // get sub category
        const categoryWithSubcate = await Promise.all(
            categories.map(async (categoryItem)=>{
                const subcategory = await subCategory.find({category_id:categoryItem._id, status:"Active"})  
        // get chield category
                const subCateWithChildcate = await Promise.all(
                    subcategory.map(async (subCateItem)=>{ 
                        const childcategory = await ChildCategory.find({
                            category_id:categoryItem._id,
                             subCategoryId:subCateItem._id,
                             status:"Active"
                             }) 
                              
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

        return responseFun(true,{categories:categoryWithSubcate},200)
        
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
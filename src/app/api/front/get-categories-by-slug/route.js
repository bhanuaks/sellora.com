import { responseFun } from "@/Http/helper";
import mongoose from "mongoose"
import { Category } from "../../../../../lib/categoryModel";
import { subCategory } from "../../../../../lib/subcategoryModel";
import ChildCategory from "../../../../../lib/childcategoryModel";



export async function GET(request) {
    
    const { searchParams } = new URL(request.url) 
    const category_slug = searchParams.get('slug')
    const sub_category_slug = searchParams.get('sub_category_slug')

    const session = await mongoose.startSession()
    session.startTransaction();

    try{
        const category = await Category.findOne({slug:category_slug}).select('name slug');
       
        let subCategories = null
        let childCategory = null

        // get data sub category
        if(sub_category_slug){
            // if select subcatgory or child category
             subCategories = await subCategory.findOne({
                category_id: category._id,
                status:"Active",
               slug: sub_category_slug 
            }).select('subCategoryName slug');
        }else{
            // if select only category return subcategory list
            subCategories = await subCategory.find({
                category_id: category._id,
                status:"Active", 
            }).select('subCategoryName slug');
        }
      
        // get data  child category
        if(subCategories){
             childCategory = await ChildCategory.find({subCategoryId:subCategories._id, status:"Active"}).select('childCategoryName slug ')
        }

        

       

       
        session.commitTransaction();
        session.endSession()

        return responseFun(true, {
            category, 
            subCategories ,
            childCategory
        }, 200)

    }catch(error){
        session.abortTransaction();
        session.endSession();
        console.log(error);
        return responseFun(false, {error}, 200)
    }

}
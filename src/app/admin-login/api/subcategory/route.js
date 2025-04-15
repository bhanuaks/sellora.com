import { connectDb } from '../../../../../lib/dbConnect';
import { subCategory } from '../../../../../lib/subcategoryModel';
import  childCategory  from '../../../../../lib/childcategoryModel';

import { slugify } from '@/Http/helper';

export async function GET(req) {
    try {
        await connectDb();

        const subcategories = await subCategory.find()
        .populate('category_id', 'name').sort({
            createdAt: -1
        });

        return new Response(
            JSON.stringify({ success: true, data: subcategories }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching categories:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'Error fetching categories', error: error.message }),
            { status: 500 }
        );
    }

}


export async function POST(req) {
    try {
      // Parse JSON data from the request
      const data = await req.json();
  
      const id = data.id && data.id !== 'undefined' ? data.id : null;
      const category_id = data.category_id;
      const subCategoryName = data.subCategoryName;
      const status = data.status || 'Active';
  
      // Validation
      if (!category_id || !subCategoryName) {
        return new Response(
          JSON.stringify({ success: false, message: 'Category ID and SubCategory Name are required.' }),
          { status: 400 }
        );
      }
  
      if (id) {
        // Update an existing subcategory
        const subcategory = await subCategory.findById(id);
  
        if (!subcategory) {
          return new Response(
            JSON.stringify({ success: false, message: 'SubCategory not found.' }),
            { status: 404 }
          );
        }
  
        // Update fields if provided
        subcategory.category_id = category_id || subcategory.category_id;
        subcategory.subCategoryName = subCategoryName || subcategory.subCategoryName;
        subcategory.slug = subCategoryName || slugify(subCategoryName);
        subcategory.status = status || subcategory.status;
  
        // Save updated subcategory
        await subcategory.save();
  
        return new Response(
          JSON.stringify({ success: true, message: 'SubCategory updated successfully.' }),
          { status: 200 }
        );
      } else {
        // Create a new subcategory
        const newSubCategory = new subCategory({
          category_id,
          subCategoryName,
          slug : slugify(subCategoryName),
          status,
        });
  
        // Save the new subcategory
        await newSubCategory.save();
  
        return new Response(
          JSON.stringify({ success: true, message: 'SubCategory created successfully.' }),
          { status: 201 }
        );
      }
    } catch (error) {
      
      return new Response(
        JSON.stringify({
          success: false,
          message: 'An error occurred while processing the request.',
          error: error.message,
        }),
        { status: 500 }
      );
    }
  }


export async function DELETE(req) {

  const {id} = await req.json()

    try {
     
      const category = await subCategory.findById(id);
      if (!category) {
        return new Response(
          JSON.stringify({ success: false, message: 'Sub Category not found' }),
          { status: 404 }
        );
      }
  
      const childsCategory = childCategory.find({category_id : category._id});
      if(childsCategory){
          return new Response(
            JSON.stringify({ success: true, message: 'Sub Category alredy exists inside the child category' }),
            { status: 403 }
          );
      }
  
      await subCategory.findByIdAndDelete(id);
  
      return new Response(
        JSON.stringify({ success: true, message: 'Sub Category deleted successfully' }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting category:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Error deleting category', error: error.message }),
        { status: 500 }
      );
    }
  }
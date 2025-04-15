import { connectDb } from '../../../../../lib/dbConnect';
import ChildCategory from '../../../../../lib/childcategoryModel';
import { slugify } from '@/Http/helper';
import path from 'path';
import fs from 'fs';

// Fetch all child categories
export async function GET(req) {
  try {
    await connectDb();

    const childCategories = await ChildCategory.find()
      .populate('category_id', 'name')
      .populate('subCategoryId', 'subCategoryName')
      .sort({ createdAt: -1 });

    return new Response(
      JSON.stringify({ success: true, data: childCategories }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching child categories:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error fetching child categories',
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

// Create or update a child category
export async function POST(req) {
  try {
    await connectDb();

    const data = await req.json();
    const id = data.id && data.id !== 'undefined' ? data.id : null;
    const { category_id, subCategoryId, childCategoryName, status = 'Active' } = data;
   
    // Validation
    if (!category_id || !subCategoryId || !childCategoryName) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Category ID, SubCategory ID, and Child Category Name are required.',
        }),
        { status: 400 }
      );
    }

    if (id) {
      // Update an existing child category
      const childCategoryData = await ChildCategory.findById(id);
      if (!childCategoryData) {
        return new Response(
          JSON.stringify({ success: false, message: 'Child Category not found.' }),
          { status: 404 }
        );
      }

      // Update fields
      childCategoryData.category_id = category_id;
      childCategoryData.subCategoryId = subCategoryId;
      childCategoryData.childCategoryName = childCategoryName;
      childCategoryData.slug = slugify(childCategoryName);
      
      childCategoryData.status = status;

      await childCategoryData.save();

      return new Response(
        JSON.stringify({ success: true, message: 'Child Category updated successfully.' }),
        { status: 200 }
      );
    } else {
      // Create a new child category
      const newChildCategory = new ChildCategory({
        category_id,
        subCategoryId,
        childCategoryName,
        slug : slugify(childCategoryName),
        status,
      });

      await newChildCategory.save();

      return new Response(
        JSON.stringify({ success: true, message: 'Child Category created successfully.' }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error creating/updating child category:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error creating/updating child category',
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

// Delete a child category
export async function DELETE(req) {
  try {
    await connectDb();

    // Retrieve the ID from the request body
    const { id } = await req.json();

    // Check if the ID is provided
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: 'Child Category ID is required.' }),
        { status: 400 }
      );
    }

    // Find the child category by ID
    const childCategory = await ChildCategory.findById(id);
    if (!childCategory) {
      return new Response(
        JSON.stringify({ success: false, message: 'Child Category not found.' }),
        { status: 404 }
      );
    }

    // Delete the child category
    await ChildCategory.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ success: true, message: 'Child Category deleted successfully.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting child category:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error deleting child category',
        error: error.message,
      }),
      { status: 500 }
    );
  }
}


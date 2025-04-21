import mongoose from 'mongoose';
import { rand, responseFun, slugify } from '@/Http/helper';
import { connectDb } from '../../../../../lib/dbConnect';
import { Category, productDynamicFieldModel } from '../../../../../lib/categoryModel';
// import { subcategory} from '../../../../../lib/subcategoryModel';
 

import fs from 'fs';
import path from 'path';
import { subCategory } from '../../../../../lib/subcategoryModel';
import { variantModel } from '@/Http/Models/VarinatModel';
import { deleteImageOne, uploadImageFun } from '@/app/api/uploadImage/route';

// Helper function to parse object ids from string
const parseObjectId = (value) => {
  return value && mongoose.Types.ObjectId.isValid(value) ? new mongoose.Types.ObjectId(value) : null;
};

// Helper function to parse array of object ids
const parseObjectIdArray = (value) => {
  return value
    ? value.split(',').map(id => parseObjectId(id.trim())).filter(id => id !== null)
    : [];
};

export async function POST(req) {
  try {
    // Connect to database
    await connectDb();

    const data = await req.formData();
    const id = data.get('id') && data.get('id') !== 'undefined' ? data.get('id') : undefined;
    const name = data.get('name');
    const photo = data.get('photo');
    const list_image = data.get('list_image');
    const status = data.get('status');
    const dynamicField = data.get('dynamicField')?JSON.parse(data.get('dynamicField')):[];
    let category_variant = data.get('variant')
    
    const errors ={};

    if(category_variant != "undefined"){ 
      category_variant = category_variant && Object.keys(category_variant).length>0? JSON.parse(data.get('variant')) : {}
    }else{
      category_variant={}
    }

    

    let photoPath = null;
    let list_image_path = null;
   

    let exitCategory = null;
    if(id){ 
      exitCategory = await Category.findById(id);
    }

    if(photo && typeof photo  !== "string"){
      const imageExtension = path.extname(photo.name);
      const accepteExtensions = ['.jpg', '.png', 'jpeg', 'webp'];
      const imageName = `category${rand(1111,9999)}${imageExtension}`
      if (!accepteExtensions.includes(imageExtension)) {
            errors.photo = "image must be jpg, png,jpeg."
            return responseFun(false, {errors, status_code:400},200)
        }


        const uploadingPath = "public/uploads/category/banner/";
        await uploadImageFun(photo, uploadingPath, imageName, 968)
        photoPath = `/uploads/category/banner/${imageName}`
        if(exitCategory && exitCategory.photo){
          await deleteImageOne(exitCategory.photo);
        }
    }else{
       photoPath = photo;
    }


    if(list_image && typeof list_image  !== "string"){
      const imageExtension = path.extname(list_image.name);
      const accepteExtensions = ['.jpg', '.png', 'jpeg', 'webp'];
      const imageName = `category${rand(1111,9999)}${imageExtension}`
      if (!accepteExtensions.includes(imageExtension)) {
            errors.list_image = "List image must be jpg, png,jpeg."
            return responseFun(false, {errors, status_code:400},200)
        }

        const uploadingPath = "public/uploads/category/list/";
       await uploadImageFun(list_image, uploadingPath, imageName, 254)
        list_image_path = `/uploads/category/list/${imageName}`

        if(exitCategory && exitCategory.list_image){
          await deleteImageOne(exitCategory.list_image);
        }

    }else{
       list_image_path = list_image;
    }
    if (id) {
      const category = await Category.findById(id);
      if (!category) {
        return new Response(
          JSON.stringify({ success: false, message: 'Category not found' }),
          { status: 404 }
        );
      }

      // Update category
      category.name = name || category.name;
      category.slug = slugify(name) || category.slug;
      category.status = status || category.status;
      category.photo = photoPath || category.photo; 
      category.list_image = list_image_path || category.list_image_path; 
      category.category_variant = category_variant

      await category.save();
      await productDynamicFieldModel.deleteMany({category_id:category._id})
      if(dynamicField.length>0){
        dynamicField.forEach(async (element) => {
          await productDynamicFieldModel.create({
            category_id:category._id,
            field_name:element.field_name,
            required:element.required,
            field_type:element.field_type,
            select_value:element.select_value,
            
          })
        });
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Category updated successfully' }),
        { status: 200 }
      );
    } else {
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return new Response(
          JSON.stringify({ success: false, message: 'Category name must be unique' }),
          { status: 400 }
        );
      }

      // Create new category
      const category = new Category({
        name,
        slug: slugify(name),
        status,
        photo: photoPath, 
        list_image: list_image_path,
        category_variant:category_variant
      });
      await category.save();
      
      await productDynamicFieldModel.deleteMany({category_id:category._id})
      if(dynamicField.length>0){
        dynamicField.forEach(async (element) => {
          await productDynamicFieldModel.create({
            category_id:category._id,
            field_name:element.field_name,
            required:element.required
          })
        });
      }
      return new Response(
        JSON.stringify({ success: true, message: 'Category created successfully' }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error inserting category:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error creating category', error: error.message }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDb();

    const categories = await Category.find().sort({
      createdAt: -1
    });
    const categoryWithDynamicField = await Promise.all(
      categories.map(async (catItem) => {
        const dynamicField = await productDynamicFieldModel.find({category_id: new mongoose.Types.ObjectId(catItem._id)});
        return {
          ...catItem.toObject(),
          dynamicField
        };
      })
    );
     
    const variantList = await variantModel.find({status:1}).sort({variant_name:1});

    return new Response(
      JSON.stringify({
        success: true, data: categoryWithDynamicField, 
        variantList:variantList
      }),
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




export async function DELETE(req) {

  const { id } = await req.json()

  try {
  
    const category = await Category.findById(id);
    
    
    if (!category) {
      return new Response(
        JSON.stringify({ success: false, message: 'Category not found' }),
        { status: 404 }
      );
    }

    const subCategory = subCategory.find({category_id : category._id});
    if(subCategory){
        return new Response(
          JSON.stringify({ success: true, message: 'Category alredy exists inside the subcategory' }),
          { status: 403 }
        );
    }

    // Remove associated photo if it exists
    if (category.photo) {
      const photoPath = path.join(process.cwd(), 'public', category.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    await Category.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ success: true, message: 'Category deleted successfully' }),
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
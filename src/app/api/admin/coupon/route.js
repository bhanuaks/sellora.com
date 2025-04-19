import mongoose from 'mongoose';
import { rand, responseFun, slugify } from '@/Http/helper';

import fs from 'fs';
import path from 'path';
import { deleteImageOne, uploadImageFun } from '@/app/api/uploadImage/route';
import { connectDb } from '../../../../../lib/dbConnect';
import { Coupon } from '@/Http/Models/couponModel';
import { Category } from '../../../../../lib/categoryModel';
import { subCategory } from '../../../../../lib/subcategoryModel';
import ChildCategory from '../../../../../lib/childcategoryModel';

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
    const coupon_code = data.get('coupon_code');
    //const category_id = data.get('category_id');
    let category_id=undefined;
    let subcategory_id=undefined;
    let childcategory_id=undefined;
    
    if (data.get('category_id') && mongoose.Types.ObjectId.isValid(data.get('category_id').trim())) {
      category_id = data.get('category_id').trim();
    }
    if (data.get('subcategory_id') && mongoose.Types.ObjectId.isValid(data.get('subcategory_id').trim())) {
    subcategory_id = data.get('subcategory_id').trim();
    }
    if (data.get('childcategory_id') && mongoose.Types.ObjectId.isValid(data.get('childcategory_id').trim())) {
      childcategory_id = data.get('childcategory_id').trim();
      } 
    //const childcategory_id = data.get('childcategory_id');
    const coupon_type = data.get('coupon_type');
    const coupon_value = data.get('coupon_value');
    const min_amount = data.get('min_amount');
    const valid_from = data.get('valid_from');
    const valid_to = data.get('valid_to');
    const description = data.get('description');
    const status = data.get('status');
    
    
    const errors ={};
       
    if (id) {
      const coupon = await Coupon.findById(id);
      if (!coupon) {
        return new Response(
          JSON.stringify({ success: false, message: 'Coupon not found' }),
          { status: 404 }
        );
      }

      
      const couponCheck = await Coupon.find({coupon_code:coupon_code, _id: { $ne: id }});
      //console.log(couponCheck)
      if (couponCheck.length) {
        return new Response(
          JSON.stringify({ success: false, message: 'Coupon code already exist?' }),
          { status: 404 }
        );
      }
      // Update category
      coupon.coupon_code = coupon_code || coupon.coupon_code;
      coupon.category_id = category_id || null;
      coupon.subcategory_id = subcategory_id || null;
      coupon.childcategory_id = childcategory_id || null;
      coupon.coupon_type = coupon_type || coupon.coupon_type;
      coupon.coupon_value = coupon_value || coupon.coupon_value;
      coupon.valid_from = valid_from || coupon.valid_from;
      coupon.valid_to = valid_to || coupon.valid_to;
      coupon.min_amount = min_amount || "";
      coupon.description = description || "";
      coupon.status = status || coupon.status;
       
      
      await coupon.save();
      

      return new Response(
        JSON.stringify({ success: true, message: 'Coupon updated successfully' }),
        { status: 200 }
      );
    } else {
      const couponCheck = await Coupon.find({coupon_code:coupon_code});
      //console.log(couponCheck)
      if (couponCheck.length) {
        return new Response(
          JSON.stringify({ success: false, message: 'Coupon code already exist?' }),
          { status: 404 }
        );
      }

      // Create new Banner
      const coupon = new Coupon({
        coupon_code,
        category_id,
        subcategory_id,
        childcategory_id,
        coupon_type,
        coupon_value,
        valid_from,
        valid_to,
        min_amount,
        description,
        status,
         
        
      });
      await coupon.save();
      
      
      return new Response(
        JSON.stringify({ success: true, message: 'Coupon created successfully' }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error inserting coupon:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error creating coupon', error: error.message }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDb();

    /* const coupons = await Coupon.find().populate('category_id').populate('subcategory_id').populate('childcategory_id').sort({
      createdAt: -1
    });
    */
    const coupons = await Coupon.find().sort({
      createdAt: -1
    })

    let couponAllList = await Promise.all(

      coupons.map(async (couponsList)=>{

          let category  = await Category.findById(couponsList.category_id)
          let subcategory  = await subCategory.findById(couponsList.subcategory_id)
          let childcategory  = await ChildCategory.findById(couponsList.childcategory_id)
          //if (!category.length) return null;
          return {
            ...couponsList.toObject(),
            category_id:category,
            subcategory_id:subcategory,
            childcategory_id:childcategory
            
        }


      })


    )
    
    
    
    

    return new Response(
      JSON.stringify({
        success: true, data: couponAllList, 
        
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error fetching coupons', error: error.message }),
      { status: 500 }
    );
  }
}




export async function DELETE(req) {

  const { id } = await req.json()

  try {
  
    const coupon = await Coupon.findById(id);
    
    
    if (!coupon) {
      return new Response(
        JSON.stringify({ success: false, message: 'Coupon not found' }),
        { status: 404 }
      );
    }

    

    // Remove associated photo if it exists
    

    await Coupon.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ success: true, message: 'Coupon deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting coupon:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error deleting coupon', error: error.message }),
      { status: 500 }
    );
  }
}
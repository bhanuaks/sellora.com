import mongoose from 'mongoose';
import { rand, responseFun, slugify } from '@/Http/helper';

import fs from 'fs';
import path from 'path';
import { deleteImageOne, uploadImageFun } from '@/app/api/uploadImage/route';
import { connectDb } from '../../../../../lib/dbConnect';
import { DealBanner } from '@/Http/Models/dealBannerModel';
import { FeatureBanner } from '@/Http/Models/featureBannerModel';


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
    const title = data.get('title');
    //const subtitle = data.get('subtitle');
    const pid = data.get('pid');
    const url = data.get('url');
    const photo = data.get('photo');
    const status = data.get('status');
    
    
    const errors ={};
    let photoPath = null;
    
    

    let exitBanner = null;
    if(id){ 
      exitBanner = await FeatureBanner.findById(id);
    }

    if(photo && typeof photo  !== "string"){
      const imageExtension = path.extname(photo.name);
      const acceptExtensions = ['.jpg', '.png', 'jpeg', 'webp'];
      const imageName = `fetBannerLeft${rand(1111,9999)}${imageExtension}`
      if (!acceptExtensions.includes(imageExtension)) {
            errors.photo = "image must be jpg, png,jpeg."
            return responseFun(false, {errors, status_code:400},200)
        }


        const uploadingPath = "public/uploads/banner/banner/";
        await uploadImageFun(photo, uploadingPath, imageName, 920)
        photoPath = `/uploads/banner/banner/${imageName}`
        if(exitBanner && exitBanner.photo){
          await deleteImageOne(exitBanner.photo);
        }
    }else{
       photoPath = photo;
    }


    
    if (id) {
      const banner = await FeatureBanner.findById(id);
      if (!banner) {
        return new Response(
          JSON.stringify({ success: false, message: 'Banner not found' }),
          { status: 404 }
        );
      }

      // Update category
      banner.title = title || "";
      //banner.subtitle = subtitle || "";
      banner.pid = pid || banner.pid;
      banner.url = url || "";
      banner.photo = photoPath || banner.photo; 
      
      await banner.save();
      

      return new Response(
        JSON.stringify({ success: true, message: 'Banner updated successfully' }),
        { status: 200 }
      );
    } else {
    

      // Create new Banner
      const banner = new FeatureBanner({
        title,
        
        pid,
        url,
        photo: photoPath, 
        
      });
      await banner.save();
      
      
      return new Response(
        JSON.stringify({ success: true, message: 'Banner created successfully' }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error inserting banner:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error creating banner', error: error.message }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDb();

    const banners = await FeatureBanner.find({pid:1}).sort({
      createdAt: -1
    });
    

    return new Response(
      JSON.stringify({
        success: true, data: banners, 
        
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching banners:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error fetching banners', error: error.message }),
      { status: 500 }
    );
  }
}





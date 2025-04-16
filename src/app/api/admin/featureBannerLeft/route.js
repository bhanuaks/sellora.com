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
    
    const title_r = data.get('title_r');
    const url_r = data.get('url_r');
    const photo_r = data.get('photo_r');

    const title_m1 = data.get('title_m1');
    const url_m1 = data.get('url_m1');
    const photo_m1 = data.get('photo_m1');

    const title_m2 = data.get('title_m2');
    const url_m2 = data.get('url_m2');
    const photo_m2 = data.get('photo_m2');

    const title_m3 = data.get('title_m3');
    const url_m3 = data.get('url_m3');
    const photo_m3 = data.get('photo_m3');

    const title_m4 = data.get('title_m4');
    const url_m4 = data.get('url_m4');
    const photo_m4 = data.get('photo_m4');
    
    
    const errors ={};
    let photoPath = null;
    let photoPath_r = null;
    let photoPath_m1 = null;
    let photoPath_m2 = null;
    let photoPath_m3 = null;
    let photoPath_m4 = null;
    

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
    if(photo_r && typeof photo_r  !== "string"){
      const imageExtension = path.extname(photo_r.name);
      const acceptExtensions = ['.jpg', '.png', 'jpeg', 'webp'];
      const imageName = `fetBannerLeft${rand(1111,9999)}${imageExtension}`
      if (!acceptExtensions.includes(imageExtension)) {
            errors.photo_r = "image must be jpg, png,jpeg."
            return responseFun(false, {errors, status_code:400},200)
        }
        const uploadingPath = "public/uploads/banner/banner/";
        await uploadImageFun(photo_r, uploadingPath, imageName, 920)
        photoPath_r = `/uploads/banner/banner/${imageName}`
        if(exitBanner && exitBanner.photo_r){
          await deleteImageOne(exitBanner.photo_r);
        }
    }else{
       photoPath_r = photo_r;
    }
    if(photo_m1 && typeof photo_m1  !== "string"){
      const imageExtension = path.extname(photo_m1.name);
      const acceptExtensions = ['.jpg', '.png', 'jpeg', 'webp'];
      const imageName = `fetBannerLeft${rand(1111,9999)}${imageExtension}`
      if (!acceptExtensions.includes(imageExtension)) {
            errors.photo_m1 = "image must be jpg, png,jpeg."
            return responseFun(false, {errors, status_code:400},200)
        }
        const uploadingPath = "public/uploads/banner/banner/";
        await uploadImageFun(photo_m1, uploadingPath, imageName, 450)
        photoPath_m1 = `/uploads/banner/banner/${imageName}`
        if(exitBanner && exitBanner.photo_m1){
          await deleteImageOne(exitBanner.photo_m1);
        }
    }else{
       photoPath_m1 = photo_m1;
    }
    if(photo_m2 && typeof photo_m2  !== "string"){
      const imageExtension = path.extname(photo_m2.name);
      const acceptExtensions = ['.jpg', '.png', 'jpeg', 'webp'];
      const imageName = `fetBannerLeft${rand(1111,9999)}${imageExtension}`
      if (!acceptExtensions.includes(imageExtension)) {
            errors.photo_m2 = "image must be jpg, png,jpeg."
            return responseFun(false, {errors, status_code:400},200)
        }
        const uploadingPath = "public/uploads/banner/banner/";
        await uploadImageFun(photo_m2, uploadingPath, imageName, 450)
        photoPath_m2 = `/uploads/banner/banner/${imageName}`
        if(exitBanner && exitBanner.photo_m2){
          await deleteImageOne(exitBanner.photo_m2);
        }
    }else{
       photoPath_m2 = photo_m2;
    }
    if(photo_m3 && typeof photo_m3  !== "string"){
      const imageExtension = path.extname(photo_m3.name);
      const acceptExtensions = ['.jpg', '.png', 'jpeg', 'webp'];
      const imageName = `fetBannerLeft${rand(1111,9999)}${imageExtension}`
      if (!acceptExtensions.includes(imageExtension)) {
            errors.photo_m3 = "image must be jpg, png,jpeg."
            return responseFun(false, {errors, status_code:400},200)
        }
        const uploadingPath = "public/uploads/banner/banner/";
        await uploadImageFun(photo_m3, uploadingPath, imageName, 450)
        photoPath_m3 = `/uploads/banner/banner/${imageName}`
        if(exitBanner && exitBanner.photo_m3){
          await deleteImageOne(exitBanner.photo_m3);
        }
    }else{
       photoPath_m3 = photo_m3;
    }
    if(photo_m4 && typeof photo_m4  !== "string"){
      const imageExtension = path.extname(photo_m4.name);
      const acceptExtensions = ['.jpg', '.png', 'jpeg', 'webp'];
      const imageName = `fetBannerLeft${rand(1111,9999)}${imageExtension}`
      if (!acceptExtensions.includes(imageExtension)) {
            errors.photo_m4 = "image must be jpg, png,jpeg."
            return responseFun(false, {errors, status_code:400},200)
        }
        const uploadingPath = "public/uploads/banner/banner/";
        await uploadImageFun(photo_m4, uploadingPath, imageName, 450)
        photoPath_m4 = `/uploads/banner/banner/${imageName}`
        if(exitBanner && exitBanner.photo_m4){
          await deleteImageOne(exitBanner.photo_m4);
        }
    }else{
       photoPath_m4 = photo_m4;
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
      //banner.pid = pid || banner.pid;
      banner.url = url || "";
      banner.photo = photoPath || banner.photo; 
      
      banner.title_r = title_r || "";
      banner.url_r = url_r || "";
      banner.photo_r = photoPath_r || banner.photo_r;

      banner.title_m1 = title_m1 || "";
      banner.url_m1 = url_m1 || "";
      banner.photo_m1 = photoPath_m1 || banner.photo_m1;

      banner.title_m2 = title_m2 || "";
      banner.url_m2 = url_m2 || "";
      banner.photo_m2 = photoPath_m2 || banner.photo_m2;

      banner.title_m3 = title_m3 || "";
      banner.url_m3 = url_m3 || "";
      banner.photo_m3 = photoPath_m3 || banner.photo_m3;

      banner.title_m4 = title_m4 || "";
      banner.url_m4 = url_m4 || "";
      banner.photo_m4 = photoPath_m4 || banner.photo_m4;
      
      await banner.save();
      

      return new Response(
        JSON.stringify({ success: true, message: 'Banner updated successfully' }),
        { status: 200 }
      );
    } else {
    

      // Create new Banner
      const banner = new FeatureBanner({
        title,
        url,
        photo: photoPath,
        title_r,
        url_r,
        photo_r: photoPath_r,
        title_m1,
        url_m1,
        photo_m1: photoPath_m1,
        title_m2,
        url_m2,
        photo_m2: photoPath_m2,
        title_m3,
        url_m3,
        photo_m3: photoPath_m3,
        title_m4,
        url_m4,
        photo_m4: photoPath_m4, 
        
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

    const banners = await FeatureBanner.find().sort({
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





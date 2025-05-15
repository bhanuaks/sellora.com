import { deleteImageOne, uploadImageFun } from "@/app/api/uploadImage/route";
import { DealBanner2 } from "@/Http/Models/dealBanner2";
import { connectDb } from "../../../../../../lib/dbConnect";
import path from 'path';
import { rand } from "@/Http/helper";



export async function POST(req) {
  try {
    // Connect to database
    await connectDb();

    const data = await req.formData();
    const id = data.get('id') && data.get('id') !== 'undefined' ? data.get('id') : undefined;
   
    const url = data.get('url');
    const photo = data.get('photo'); 
    
    
    const errors ={};
    let photoPath = null;
    
    

    let exitBanner = null;
    if(id){ 
      exitBanner = await DealBanner2.findById(id);
    }

    if(photo && typeof photo  !== "string"){
      const imageExtension = path.extname(photo.name);
      const acceptExtensions = ['.jpg', '.png', 'jpeg', 'webp'];
      const imageName = `deal2Banner${rand(1111,9999)}${imageExtension}`
      if (!acceptExtensions.includes(imageExtension)) {
            errors.photo = "image must be jpg, png,jpeg."
            return responseFun(false, {errors, status_code:400},200)
        }


        const uploadingPath = "public/uploads/banner/banner/";
        await uploadImageFun(photo, uploadingPath, imageName, 1600)
        photoPath = `/uploads/banner/banner/${imageName}`
        if(exitBanner && exitBanner.photo){
          await deleteImageOne(exitBanner.photo);
        }
    }else{
       photoPath = photo;
    }


    
    if (id) {
      const banner = await DealBanner2.findById(id);
      if (!banner) {
        return new Response(
          JSON.stringify({ success: false, message: 'Banner not found' }),
          { status: 404 }
        );
      }

      // Update category
      
      banner.url = url || "";
      banner.photo = photoPath || banner.photo; 
      
      await banner.save();
      

      return new Response(
        JSON.stringify({ success: true, message: 'Banner updated successfully' }),
        { status: 200 }
      );
    } else {
    

      // Create new Banner
      const banner = new DealBanner2({ 
        url,
        photo: photoPath, 
        
      });
      await banner.save();
      
      
      return new Response(
        JSON.stringify({ success: true, message: 'Left Banner created successfully' }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error inserting left banner:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error creating left banner', error: error.message }),
      { status: 500 }
    );
  }
}



export async function GET(req) {
  try {
    await connectDb(); 
    const banners = await DealBanner2.findOne().sort({
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





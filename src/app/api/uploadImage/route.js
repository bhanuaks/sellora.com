import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import sharp from "sharp"; 
import mongoose from "mongoose";
 
import fs from 'fs/promises';



export async function uploadImageFun(image, uploadingPath, filename, width_size){

    const buffer = Buffer.from(await image.arrayBuffer());  
    const outputFilePath = path.join(process.cwd(), uploadingPath, filename); 

    try{
        if (filename.endsWith(".pdf")) { 
            await writeFile(outputFilePath, buffer);
            return true;
        }

        const metadata = await sharp(buffer).metadata();
        if(metadata.width > width_size){
            const resizedImageBuffer = await sharp(buffer)
            .resize({ width: width_size })
            .toBuffer();
            await writeFile(outputFilePath, resizedImageBuffer)
        }else{
            await writeFile(outputFilePath, buffer)
        } 
        return true;
    }catch(error){
      console.log(error)
      return false;
    }
}



export async function deleteImageOne(uploadingPath) {

    const filePath = path.join(process.cwd(), `public/${uploadingPath}`);
    
    let fileExists = false;
        try { 
            await fs.access(filePath);
            fileExists = true;
        } catch (error) {
            fileExists = false;  
        }
 
        // delete file
        if(fileExists){
            try { 
                 await fs.unlink(filePath); 
                  return true;
             }catch (error) { 
                 console.log(error,filePath)
                 return false;
             }
        }
        
           
    }


    
export async function uploadFileFun(image, uploadingPath, filename){

    const buffer = Buffer.from(await image.arrayBuffer());  
    const outputFilePath = path.join(process.cwd(), uploadingPath, filename); 

    try{
        
            await writeFile(outputFilePath, buffer);
            return true; 
    }catch(error){
      console.log(error)
      return false;
    }
}

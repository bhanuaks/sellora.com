import { isEmpty, responseFun, variant_large_img_path1, variant_large_img_path2, variant_large_img_path3, variant_large_img_path4, variant_medium_img_path1, variant_medium_img_path2, variant_medium_img_path3, variant_medium_img_path4, variant_thumb_img_path1, variant_thumb_img_path2, variant_thumb_img_path3, variant_thumb_img_path4 } from "@/Http/helper";
import { productModel, productVariantModel, variantThresholdSchemaModal } from "@/Http/Models/productModel";
import mongoose from "mongoose";
import { connectDb } from "../../../../../../lib/dbConnect";
import ColorModel from "../../../../../../lib/variant/ColorModel";
import SizeModel from "../../../../../../lib/variant/SizeModel";
import ItemBreadthModel from "../../../../../../lib/variant/ItemBreadthModel";
import ItemHeightModel from "../../../../../../lib/variant/ItemHeightModel";
import ItemLengthModel from "../../../../../../lib/variant/ItemLengthModel";
import ItemWeightModel from "../../../../../../lib/variant/ItemWeightModel";
import PackageBreadthModel from "../../../../../../lib/variant/PackageBreadthModel";
import PackageHeightModel from "../../../../../../lib/variant/PackageHeightModel";
// import PackageLengthModel from "../../../../../../lib/variant/PackageLengthModel";
import PackageWeightModel from "../../../../../../lib/variant/PackageWeightModel";
import PackageLengthModel from "../../../../../../lib/variant/PackageLengthModel";
import { deleteImageOne, uploadImageFun } from "@/app/api/uploadImage/route";
import path from 'path'
import { checkFilePath, moveFile } from "@/app/api/ckeckFilePath/route";


export async function POST(request) { 
await connectDb();
            const formData = await request.formData();
    const { 
                _id,
                product_id,
                category_id,
                sku,
                listingStatus,
                msrp,
                consumerSalePrice,
                businessSalePrice,
                seller_id,
                stock,
                customAttributes,
                withImage,
                image_1,
                image_2,
                image_3,
                image_4,
                threshold,
                discount_type,
                variant

            }  = Object.fromEntries(formData); 
            
             
            const errors = {}; 
            if(isEmpty(product_id))errors.product_id = `product_id is required.`;
            if(isEmpty(sku))errors.sku = `sku is required.`;
            if(isEmpty(msrp))errors.msrp = `msrp is required.`;
            if(isEmpty(consumerSalePrice))errors.consumerSalePrice = `this field is required.`;
            if(isEmpty(businessSalePrice))errors.businessSalePrice = `this field is required.`; 
            if(isEmpty(stock))errors.stock = `stock is required.`;  


            if(withImage=="Yes"){
                if(!image_1  || image_1 =="null"){
                    errors.image  = "minimum 1 image required";
                }
            }

            if(Object.keys(errors).length>0){
                return responseFun(false, {errors, status_code:400},200)
            }

    try{

        let image_1_path =  null;
        let image_2_path =  null;
        let image_3_path =  null;
        let image_4_path =  null;

        let existVariant =null
        if(_id){
             existVariant = await productVariantModel.findById(_id)
        }
        
        if(withImage=="Yes"){
            const image1PathArray = [variant_thumb_img_path1, variant_medium_img_path1, variant_large_img_path1];
            const image2PathArray = [variant_thumb_img_path2, variant_medium_img_path2, variant_large_img_path2];
            const image3PathArray = [variant_thumb_img_path3, variant_medium_img_path3, variant_large_img_path3];
            const image4PathArray = [variant_thumb_img_path4, variant_medium_img_path4, variant_large_img_path4];

            const imagePath1UploadArray = [
                { path: `public/${variant_large_img_path1}`, size: 1600 },
                { path: `public/${variant_medium_img_path1}`, size: 1100 },
                { path: `public/${variant_thumb_img_path1}`, size: 400 }
            ];
            const imagePath2UploadArray = [
                { path: `public/${variant_large_img_path2}`, size: 1600 },
                { path: `public/${variant_medium_img_path2}`, size: 1100 },
                { path: `public/${variant_thumb_img_path2}`, size: 400 }
            ];

            const imagePath3UploadArray = [
                { path: `public/${variant_large_img_path3}`, size: 1600 },
                { path: `public/${variant_medium_img_path3}`, size: 1100 },
                { path: `public/${variant_thumb_img_path3}`, size: 400 }
            ];
            const imagePath4UploadArray = [
                { path: `public/${variant_large_img_path4}`, size: 1600 },
                { path: `public/${variant_medium_img_path4}`, size: 1100 },
                { path: `public/${variant_thumb_img_path4}`, size: 400 }
            ];

            if(withImage =="Yes"){
             //   start upload image 1
             if(image_1 && typeof image_1 != "string"){  
                        const extension = path.extname(image_1.name);
                        const accepteExtensions = ['.jpg','.png','.jpeg']; 
                        if(!accepteExtensions.includes(extension)){
                            errors.image_1 = "image must be jpg, png,jpeg." 
                          }
                          const shortenedProductName = sku.length >6?sku.slice(0, 6):sku;
                          const filname_1 = `${shortenedProductName}1${new Date().toISOString().replace(/[-:.TZ]/g, "")}${extension}`;
                          
                          for (const { path, size } of imagePath1UploadArray) {
                            await uploadImageFun(image_1, path, filname_1, size)  
                          }
                         
                          image_1_path = filname_1;

                            if(existVariant  && existVariant.image_1 ){
                                const oldPath = existVariant.image_1
                                for (const path of image1PathArray) {
                                    await deleteImageOne(`${path}${oldPath}`) 
                                } 
                           
                          }

                    }else if(image_1  && image_1 != "null"){
                        // check image 2 path and move 1
                       let exis2Path = await checkFilePath(`public/${variant_large_img_path2}`, image_1)
                       if(exis2Path){ 
                         
                            await moveFile(`public/${variant_large_img_path2}`, image_1, `public/${variant_large_img_path1}`)
                            await moveFile(`public/${variant_medium_img_path2}`, image_1, `public/${variant_medium_img_path1}`)
                            await moveFile(`public/${variant_thumb_img_path2}`, image_1, `public/${variant_thumb_img_path1}`)
                       }

                       let exist3Path = await checkFilePath(`public/${variant_large_img_path3}`, image_1)
                       if(exist3Path){
                            await moveFile(`public/${variant_large_img_path3}`, image_1, `public/${variant_large_img_path1}`)
                            await moveFile(`public/${variant_medium_img_path3}`, image_1, `public/${variant_medium_img_path1}`)
                            await moveFile(`public/${variant_thumb_img_path3}`, image_1, `public/${variant_thumb_img_path1}`)
                       }
                       let exist4Path = await checkFilePath(`public/${variant_large_img_path4}`, image_1)
                       if(exist4Path){
                            await moveFile(`public/${variant_large_img_path4}`, image_1, `public/${variant_large_img_path1}`)
                            await moveFile(`public/${variant_medium_img_path4}`, image_1, `public/${variant_medium_img_path1}`)
                            await moveFile(`public/${variant_thumb_img_path4}`, image_1, `public/${variant_thumb_img_path1}`)
                       }
                        image_1_path = image_1
                        
                        // after move delete  old uploaded image
                        if(existVariant  && existVariant.image_1 && existVariant.image_1 != image_1 ){
                           
                            const oldPath = existVariant.image_1
                            if(![image_2, image_3,image_4].includes(oldPath)){
                                for (const path of image1PathArray) {
                                    await deleteImageOne(`${path}${oldPath}`)
                                }  
                            }
                      }


                    }else if(existVariant?.image_1 ){
                        //if image null upload delete old image
                            const oldPath = existVariant.image_1
                            if(![image_2, image_3,image_4].includes(oldPath)){
                                for (const path of image1PathArray) {
                                    await deleteImageOne(`${path}${oldPath}`)
                                } 
                            }
                            image_1_path = null
                      }else{
                        image_1_path = null
                      }
            
                     //   ===================================start upload image 2 =============================================================
                    if(image_2 && typeof image_2 != "string"){
                        const extension = path.extname(image_2.name);
                        const accepteExtensions = ['.jpg','.png','.jpeg']; 
                        if(!accepteExtensions.includes(extension)){
                            errors.image_2 = "image must be jpg, png,jpeg." 
                          }
                          const shortenedProductName = sku.length >6?sku.slice(0, 6):sku;
                          const filname_2 = `${shortenedProductName}2${new Date().toISOString().replace(/[-:.TZ]/g, "")}${extension}`;
                          for (const { path, size } of imagePath2UploadArray) {
                            await uploadImageFun(image_2, path, filname_2, size)  
                          }
                         
                          image_2_path = filname_2;

                          if(existVariant  && existVariant.image_2){
                            const oldPath2 = existVariant.image_2
                            if(![image_1,image_3,image_4].includes(oldPath2)){

                                for (const path of image2PathArray) {
                                    await deleteImageOne(`${path}${oldPath2}`)
                                } 
                               
                            }
                          }

                    }else if(image_2  && image_2 != "null"){
                        
                        // move image if exists
                        let exist3Path = await checkFilePath(`public/${variant_large_img_path3}`, image_2)
                        if(exist3Path){
                             await moveFile(`public/${variant_large_img_path3}`, image_2, `public/${variant_large_img_path2}`)
                             await moveFile(`public/${variant_medium_img_path3}`, image_2, `public/${variant_medium_img_path2}`)
                             await moveFile(`public/${variant_thumb_img_path3}`, image_2, `public/${variant_thumb_img_path2}`)
                        }
                        let exist4Path = await checkFilePath(`public/${variant_large_img_path4}`, image_2)
                        if(exist4Path){
                             await moveFile(`public/${variant_large_img_path4}`, image_2, `public/${variant_large_img_path2}`)
                             await moveFile(`public/${variant_medium_img_path4}`, image_2, `public/${variant_medium_img_path2}`)
                             await moveFile(`public/${variant_thumb_img_path4}`, image_2, `public/${variant_thumb_img_path2}`)
                        }

                        image_2_path = image_2

                        // after move delete  old uploaded image
                        if(existVariant  && existVariant.image_2 && existVariant.image_2 != image_2){
                            const oldPath2 = existVariant.image_2
                            if(![image_1, image_3, image_4].includes(oldPath2)){
                                for (const path of image2PathArray) {
                                    await deleteImageOne(`${path}${oldPath2}`)
                                } 
                            }
                      }
                      
                    }else if(existVariant?.image_2){
                        // if not uplaod then delete  old uploaded image
                            const oldPath2 = existVariant.image_2
                            if(![image_1, image_3, image_4].includes(oldPath2)){
                                for (const path of image2PathArray) {
                                    await deleteImageOne(`${path}${oldPath2}`)
                                }  
                            }
                            image_2_path = null
                      }else{
                        image_2_path = null
                      }

                    // ================  start upload image 3===================================================================
            
                    if(image_3 && typeof image_3 != "string"){
                        const extension = path.extname(image_3.name);
                        const accepteExtensions = ['.jpg','.png','.jpeg']; 
                        if(!accepteExtensions.includes(extension)){
                            errors.image_3 = "image must be jpg, png, jpeg." 
                          }
                          const shortenedProductName = sku.length >6?sku.slice(0, 6):sku;
                          const filname_3 = `${shortenedProductName}3${new Date().toISOString().replace(/[-:.TZ]/g, "")}${extension}`;
                          
                          for (const { path, size } of imagePath3UploadArray) {
                            await uploadImageFun(image_3, path, filname_3, size)  
                          }
                          
                          image_3_path = filname_3;

                          if(existVariant && existVariant.image_3){
                            const oldPath3 = existVariant.image_3
                            if(![image_1,image_2,image_4].includes(oldPath3)){ 

                                for (const path of image3PathArray) {
                                    await deleteImageOne(`${path}${oldPath3}`)
                                }  

                            }
                          }

                    }else if(image_3 && image_3 != "null"){
                        let exist4Path = await checkFilePath(`public/${variant_large_img_path4}`, image_3)
                        if(exist4Path){
                             await moveFile(`public/${variant_large_img_path4}`, image_3, `public/${variant_large_img_path3}`)
                             await moveFile(`public/${variant_medium_img_path4}`, image_3, `public/${variant_medium_img_path3}`)
                             await moveFile(`public/${variant_thumb_img_path4}`, image_3, `public/${variant_thumb_img_path3}`)
                        }

                        image_3_path = image_3

                         // after move delete  old uploaded image 3
                        if(existVariant && existVariant.image_3 && existVariant.image_3 != image_3){
                            const oldPath3 = existVariant.image_3
                            if(![image_1,image_2,image_4].includes(oldPath3)){
                                for (const path of image3PathArray) {
                                    await deleteImageOne(`${path}${oldPath3}`)
                                }
                                
                            }
                          }


                    }else if(existVariant?.image_3){
                         // delete old image 3 if not upload 
                        const oldPath3 = existVariant.image_3
                        if(![image_1,image_2,image_4].includes(oldPath3)){
                            for (const path of image3PathArray) {
                                await deleteImageOne(`${path}${oldPath3}`)
                            } 
                        }
                        image_3_path = null
                      }else{
                        image_3_path = null
                      }


                    //=============================upload image 4========================================================================================
                    if(image_4 && typeof image_4 != "string"){
                        const extension = path.extname(image_4.name);
                        const accepteExtensions = ['.jpg','.png','.jpeg']; 
                        if(!accepteExtensions.includes(extension)){
                            errors.image_4 = "image must be jpg, png,jpeg." 
                          }
                          const shortenedProductName = sku.length >6?sku.slice(0, 6):sku;
                          const filname_4 = `${shortenedProductName}4${new Date().toISOString().replace(/[-:.TZ]/g, "")}${extension}`;
                          
                          for (const { path, size } of imagePath4UploadArray) {
                            await uploadImageFun(image_4, path, filname_4, size)  
                          }
                         
                          image_4_path = filname_4;

                          if(existVariant && existVariant.image_4){
                            const oldPath4 = existVariant.image_4
                            if([image_1,image_2,image_3].includes(oldPath4)){
                                for (const path of image4PathArray) {
                                    await deleteImageOne(`${path}${oldPath4}`)
                                } 
                            }
                          }

                    }else if(image_4  && image_4 != "null"){
                        image_4_path = image_4;

                        // delete old upload image 4 when not upload
                        if(existVariant && existVariant.image_4 && existVariant.image_4 != image_4){
                            const oldPath4 = existVariant.image_4
                            if([image_1,image_2,image_3].includes(oldPath4)){
                                for (const path of image4PathArray) {
                                    await deleteImageOne(`${path}${oldPath4}`)
                                } 
                            }
                        }

                    }else if(existVariant && existVariant.image_4){
                        const oldPath4 = existVariant.image_4
                        if(![image_1, image_2, image_3].includes(oldPath4)){
                            for (const path of image4PathArray) {
                                await deleteImageOne(`${path}${oldPath4}`)
                            } 
                        }
                        image_4_path = null
                    }else{
                        image_4_path = null
                    }
                }
        }

        // ========================image uploading end ===============================================================
        if(variant == "No"){
            await productVariantModel.deleteMany({
                _id: { $ne: _id } ,
                product_id: new mongoose.Types.ObjectId(product_id)
            });
        }

        await productModel.findByIdAndUpdate(product_id,{
            variant
        })
        let sevedVariant = null;
        if(_id){
            sevedVariant = await productVariantModel.findByIdAndUpdate(_id,{
                seller_id,
                product_id, 
                sku,
                listingStatus,
                msrp,
                consumerSalePrice,
                businessSalePrice, 
                stock,
                customAttributes: variant != "No" && customAttributes?JSON.parse(customAttributes):null, 
                withImage,
                image_1:image_1_path,
                image_2:image_2_path,
                image_3:image_3_path,
                image_4:image_4_path,
                discount_type
            })
        }else{
            sevedVariant = await productVariantModel.create({
                seller_id,
                product_id, 
                sku,
                listingStatus,
                msrp,
                consumerSalePrice,
                businessSalePrice,
               
                stock,
                customAttributes: variant != "No" && customAttributes?JSON.parse(customAttributes):null, 

                withImage,
                image_1:image_1_path,
                image_2:image_2_path,
                image_3:image_3_path,
                image_4:image_4_path,
                discount_type,

            })
        }

        await variantThresholdSchemaModal.deleteMany({
            variant_id:new mongoose.Types.ObjectId(sevedVariant._id)
        })
        const thresholdArr = JSON.parse(threshold) || []
        if(thresholdArr && thresholdArr.length>0){
            thresholdArr.forEach(async (element) => {
                await variantThresholdSchemaModal.create({
                    product_id:product_id,
                    variant_id:sevedVariant._id, 
                    unit:element['unit'],
                    discount:element['discount'],
                })
            });
        }

        const variantList = await getVariant(product_id); 
        return responseFun(true, {message: "Variant Addedd", variantList:variantList},200) 
    }catch(error){
        console.log(error);
        return responseFun(false, {error:error},200)
    }
}

export async function getVariant(product_id) {
    
    try{ 
        const variantList = await productVariantModel.find({
            product_id: new mongoose.Types.ObjectId(product_id)
        }).sort({createdAt:-1})

        const variantListWithValue = await Promise.all( 
            variantList.map(async (variant) => { 
                const threshold = await variantThresholdSchemaModal.find({variant_id: variant._id}) 
                return { 
                    ...variant.toObject(),  
                    threshold:threshold
                };  
            }) 
        )
        return variantListWithValue;

    }catch(error){
        console.log(error);
        return [];
    }
}


export async function fetchVariant(variantName, _id) {
     let variant = null
     
     const validObjectId = mongoose.Types.ObjectId.isValid(_id);
        if (!validObjectId) {
            throw new Error("Invalid ObjectId provided");
        }
        if (variantName == "colorId") {
            variant = await ColorModel.findById(_id);
        }
        if (variantName == "sizeId") {
            variant = await SizeModel.findById(_id);
        }
    
        if (variantName == "itemBreadthId") {
            variant.itemBreadthId = await ItemBreadthModel.findById(_id);
        }
    
        if (variantName == "itemHeightId") {
            variant = await ItemHeightModel.findById(_id);
        }
    
        if (variantName == "itemLengthId") {
            variant = await ItemLengthModel.findById(_id);
        }
    
        if (variantName == "itemWeightId" ) {
            variant = await ItemWeightModel.findById(_id);
        }
    
        if (variantName == "packageBreadthId") {
            variant = await PackageBreadthModel.findById(_id);
        }
        if (variantName == "packageHeightId" ) {
            variant = await PackageHeightModel.findById(_id);
        }
    
        if (variantName == "packageLengthId" ) {
            variant = await PackageLengthModel.findById(_id);
        }
    
        if (variantName == "packageWeightId") {
            variant = await PackageWeightModel.findById(_id);
        }
    
        return variant;
}


export async function DELETE(request) {
        const { _id } = await request.json();
        try{
            const response = await productVariantModel.findByIdAndDelete(_id)
            return responseFun(true, {message:"Deleted successfully"}, 200)

        }catch(error){
            console.log(error);
            return responseFun(false, {error:error}, 200)
        }
}


async function uploadAndDeleteImages(image, variantPaths, filename, sizes) {
    for (const { path, size } of sizes) {
        await uploadImageFun(image, path, filename, size);
    }
    
    if (existVariant?.image_1) {
        for (const { path } of sizes) {
            await deleteImageOne(`${path.path}${existVariant.image_1}`);
        }
    }
}

async function moveAndDeleteImages(image, variantPaths) {
    for (const path of variantPaths) {
        if (await checkFilePath(`public/${path}`, image)) {
            await Promise.all([
                moveFile(`public/${path}`, image, `public/${variant_large_img_path1}`),
                moveFile(`public/${path.replace('large', 'medium')}`, image, `public/${variant_medium_img_path1}`),
                moveFile(`public/${path.replace('large', 'thumb')}`, image, `public/${variant_thumb_img_path1}`)
            ]);
        }
    }
}
    import { decodeJwt, isEmpty, rand, responseFun } from "@/Http/helper";
    import { ProductReviewModal } from "@/Http/Models/ProductReview";
    import { cookies } from "next/headers";
    import path from 'path'
    import { uploadFileFun } from "../../uploadImage/route";
import { productModel } from "@/Http/Models/productModel";
import mongoose from "mongoose";


    export async function POST(request) {
        const formData = await request.formData() 

        const cookieStore = cookies();
        const userToken = cookieStore.get("userAuthToken")?.value;
        if(!userToken){
            return responseFun(false,{message:"user Token not fount", status_code:402}, 401)
        }
        const user = decodeJwt(userToken)?.user;
        if(!user){
            return responseFun(false,{message:"user not fount", status_code:402}, 401)
        } 
        const title = formData.get("title");
        const star = formData.get("star");
        const pruduct_id = formData.get("pruduct_id") || null;
        const variant_id = formData.get("variant_id") || null;
        const message = formData.get("message"); 
        const files = formData.getAll("files");  
        const _id = formData.get("_id");  
        const errors = {};
        if(isEmpty(title))errors.title = "Title is required.";
        if(isEmpty(pruduct_id))errors.pruduct_id = "pruduct_id is required.";
        if(isEmpty(message))errors.message = "required.";
        if(!files || files?.length <= 0){
            errors.files = "file is required.";

        }
        if(Object.keys(errors).length > 0){
            return responseFun(false,{errors, status_code:403}, 200)
        }
        try{ 
            let review = null;
            // const existReview = await ProductReviewModal.findOne({user_id : new mongoose.Types.ObjectId(user._id)})
            const filePathArray = [];
                if (files.length > 0) {
                    const uploadPath = "/public/uploads/product/review";
                    const uploadedFiles = await Promise.all(
                        files.map(async (file) => {
                            
                            if (file instanceof Blob) {  
                                const extension = path.extname(file.name);
                                const fileName = `file${Date.now()}${extension}`;
                                await uploadFileFun(file, uploadPath, fileName);
                                return `/uploads/product/review/${fileName}`;
                            }else{
                                return file;
                            }
                        })
                    ); 
                    filePathArray.push(...uploadedFiles.filter(Boolean));
                }
              
            if(_id){

                const updateData = { 
                    title,
                    star,  
                    message,
                    files: filePathArray
                };



                 review = await ProductReviewModal.updateOne(
                    { _id: new mongoose.Types.ObjectId(_id) },  
                    { 
                        $set:updateData
                    },
                    { upsert: true }  
                );
                
            }else{
                 review = await ProductReviewModal.create({
                    user_id:user?._id,
                    title,
                    star,
                    product_id: pruduct_id,
                    variant_id:variant_id || null,
                    message,
                    files:filePathArray
                });
            }
            

            return responseFun(true, review, 200)
        }catch(error){
            console.log(error);
            return responseFun(false,"error", 500)
        }
    }



export async function GET(request) {
    
    const searchParams = new URL(request.url).searchParams; 
    const slug = searchParams.get("slug")  

    const cookieStore = cookies();
    const userToken = cookieStore.get("userAuthToken")?.value;
    if(!userToken){
        return responseFun(false,{message:"user Token not fount", status_code:402}, 401)
    }
    const user = decodeJwt(userToken)?.user;
    if(!user){
        return responseFun(false,{message:"user not fount", status_code:402}, 401)
    } 


    try{
        const product = await productModel.findOne({
            slug:slug
        })
        .select("_id seller_id product_name main_image");
        
        const review = await ProductReviewModal.findOne({user_id : new mongoose.Types.ObjectId(user?._id), product_id:product?._id})
        return responseFun(true, {product, review}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, "something went wrong", 500)
    }
}
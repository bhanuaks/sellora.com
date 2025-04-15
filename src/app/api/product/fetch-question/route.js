import { responseFun } from "@/Http/helper";
import { ProductQuestionModal } from "@/Http/Models/productQuestion";
import { ProductReviewModal } from "@/Http/Models/ProductReview";
import mongoose from "mongoose";



export async function GET(requset) {
    
    const searchParams = new URL(requset.url).searchParams; 
    const product_id = searchParams.get("product_id")  
    const searchText = searchParams.get("searchText") || null
    const productObjectId = new mongoose.Types.ObjectId(product_id);
    
    let filter = { product_id: productObjectId };
    if (searchText) {
        filter.$or = [
            { question: { $regex: searchText, $options: "i" } }, 
            { answer: { $regex: searchText, $options: "i" } },    
          ];
      }
    
    if(!product_id){
        return responseFun(false, {message:"product id required"}, 403)
    }
    try{
      
         const questions = await ProductQuestionModal.aggregate([
            {
                $match:filter
            }, 
            
            {
                $lookup:{
                    from:"consumers",
                    localField:"user_id",
                    foreignField:"_id",
                    as:"user"
                }
            },
            {
                $addFields:{
                    user:{ $arrayElemAt: ["$user", 0]}
                }
            },
            {
                $sort:{
                    createdAt:-1
                }
            },
            {
                $project: {
                  question: 1,  
                  answer: 1,  
                  product_id: 1,
                  "user.full_name": 1,  
                },
              },
         ]);  
        
         return responseFun(true, {questions}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, error, 500)
    }
}
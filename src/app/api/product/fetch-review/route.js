import { responseFun } from "@/Http/helper";
import { ProductReviewModal } from "@/Http/Models/ProductReview";
import mongoose from "mongoose";
import { getLoginUser } from "../../getLoginUser/route";



export async function GET(requset) {
    
    const searchParams = new URL(requset.url).searchParams; 
    const product_id = searchParams.get("product_id")  
    const orderBy = searchParams.get("orderBy")  || "Top"
    let reviewList = [];

    const user = getLoginUser()
  
    if(!product_id){
        return responseFun(false, {message:"product id required"}, 403)
    }
    const productObjectId = new mongoose.Types.ObjectId(product_id);
    let existReviews = null;
    if(user){
         existReviews = await ProductReviewModal.findOne({product_id: productObjectId, user_id: new mongoose.Types.ObjectId(user._id)}); 
    }

    try{
        const totalReviews = await ProductReviewModal.countDocuments({product_id: productObjectId}); 
        const avgReviews = await ProductReviewModal.aggregate([
            { $match: { product_id: productObjectId } }, // Filter by product ID
            { $group: { _id: null, avgStar: { $avg: "$star" } } } // Compute average
          ]);
          
          const average = avgReviews.length > 0 ? avgReviews[0].avgStar : 0;
        const starCounts = {
            5: await ProductReviewModal.countDocuments({ star: 5, product_id: productObjectId  }),
            4: await ProductReviewModal.countDocuments({ star: 4, product_id: productObjectId  }),
            3: await ProductReviewModal.countDocuments({ star: 3, product_id: productObjectId  }),
            2: await ProductReviewModal.countDocuments({ star: 2, product_id: productObjectId  }),
            1: await ProductReviewModal.countDocuments({ star: 1, product_id: productObjectId  })
        };
 
        const starPercentages = Object.fromEntries(
            Object.entries(starCounts).map(([star, count]) => [
                star,
                totalReviews > 0 ? ((count / totalReviews) * 100) : 0
            ])
        );

        const resversArray = [];
       
        if(orderBy =="Top"){ 
         reviewList = await ProductReviewModal.aggregate([
            {
                $match:{
                    product_id: productObjectId
                }
            },
            {
                $sort:{
                    star:-1 
                }
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
            }
         ]);  
        //  reviewList = await ProductReviewModal.find({product_id: productObjectId}).sort({star:-1 });  
        }else{
            reviewList = await ProductReviewModal.find({product_id: productObjectId}).sort({createdAt: -1 });   
        }
         return responseFun(true, {totalReviews, starPercentages, reviewList, average, existReviews}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, error, 500)
    }
}
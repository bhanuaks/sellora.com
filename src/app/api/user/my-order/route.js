import { responseFun } from "@/Http/helper"; 
import { getLoginUser } from "../../getLoginUser/route";
import { orderModel, orderProductModel } from "@/Http/Models/order";
import { orderAddressModel } from "@/Http/Models/orderAddress";
import { ProductReviewModal } from "@/Http/Models/ProductReview";
import mongoose from "mongoose";

export async function GET(request) {
    
    try{
        const user = getLoginUser();
        const query = {user_id: user._id}
        const orderData  = await orderModel.find(query).sort({createdAt:-1})
        const orderWithProdcut = await Promise.all(
            orderData.map(async(order)=>{
                const products = await orderProductModel.aggregate([
                    {
                        $match:{order_id:order.order_id}
                    },
                     
                    {
                        $lookup:{
                            from:"products",
                            localField:"product_id",
                            foreignField:"_id",
                            as:"product_id"
                        }
                    },

                    {
                        $addFields:{product_id:{$arrayElemAt:['$product_id',0]}}
                    },
                    {
                        $match:{ product_id:{$ne:null} }
                    },

                    {
                        $lookup:{
                            from:"productvariants",
                            localField:"variant_id",
                            foreignField:"_id",
                            as:"variant_id"
                        }
                    },
                    
                   

                    {
                        $addFields:{variant_id:{$arrayElemAt:['$variant_id',0]}},
                        // $addFields:{review:{$arrayElemAt:['$review',0]}}
                    }, 
                    {
                        $match:{variant_id:{$ne:null}}
                    }, 
                     
                    
                ]) 
                
                // const products = await orderProductModel.find({order_id:order.order_id})
                // .populate({ path: 'product_id', model: 'Product' })
                // .populate('variant_id') 
                 const address =  await orderAddressModel.findOne({order_id:order.order_id})
                return {
                    ...order.toObject(),
                    products,
                    address
                }
            }) 
        )

        const orderWithProdcutAndReview = await Promise.all(
            orderWithProdcut.map(async (prodItem)=>{
                const reviewsData = await ProductReviewModal.findOne({
                    product_id: prodItem.product_id,
                    user_id:new mongoose.Types.ObjectId(user._id)
                })
                return {
                    ...prodItem,
                    review:reviewsData
                }
            })
        )

        return responseFun(true, {orders:orderWithProdcutAndReview}, 200)

    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
}
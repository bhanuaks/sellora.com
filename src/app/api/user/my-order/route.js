import { responseFun } from "@/Http/helper"; 
import { getLoginUser } from "../../getLoginUser/route";
import { orderModel, orderProductModel } from "@/Http/Models/order";
import { orderAddressModel } from "@/Http/Models/orderAddress";
import { ProductReviewModal } from "@/Http/Models/ProductReview";
import mongoose from "mongoose";

export async function GET(request) {
    
    try{
        const user = getLoginUser();

        const url = new URL(request.url);
        const searchVal = url.searchParams.get('search');
        const year = url.searchParams.get('year');
        const searchTab = url.searchParams.get('searchTab');

        const now = new Date();
        let dateFilter;
        
        
        if(year == 'last30'){ 
            const last30Days = new Date();
            last30Days.setDate(now.getDate() - 30);
            dateFilter = {
                createdAt: {
                $gte: last30Days
                }
            };

        } else if(year == 'months-3'){
            const last3Months = new Date();
            last3Months.setMonth(now.getMonth() - 3);
            dateFilter = {
                createdAt: {
                $gte: last3Months
                }
            };
            
        } else if(year) {
            // console.log('okkkkk', year)
            const startOfYear = new Date(`${Number(year)}-01-01T00:00:00Z`);
            const endOfYear = new Date(`${Number(year) + 1}-01-01T00:00:00Z`);

            dateFilter = {
                createdAt: {
                $gte: startOfYear,
                $lt: endOfYear
                }
            };
        }

        const query = {
            user_id: user._id,
            ...dateFilter
        
        }
        
        const orderData  = await orderModel.find(query).sort({createdAt:-1})
        let orderWithProdcut = await Promise.all(
            orderData.map(async(order)=>{

                const pipeline = [
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
                     
                    
                ];

                if (searchVal && searchVal.trim() !== '') {
                    pipeline.push({
                      $match: {
                        "product_id.product_name": {
                          $regex: searchVal,
                          $options: "i" // case-insensitive partial match
                        }
                      }
                    });
                  }

                  if (searchTab && searchTab.trim() !== '') {
                    //0=>Pending, 1=> confirmed, 2=>shipped, 3=> out of delivery, 4=> Deliverd, 5=> Canceled, 6=>Refund, 7=> Cancel Request    
                    if(searchTab == 'order'){ } 
                    else if(searchTab == 'notshipped'){
                        pipeline.push({
                            $match:{order_status:1}
                        });
                    } else if(searchTab == 'return'){
                        pipeline.push({
                            $match:{order_status:6}
                        });
                    } else if(searchTab == 'cancel'){
                        pipeline.push({
                            $match: {
                                $or: [
                                  { order_status: 5 },
                                  { order_status: 7 }
                                ]
                              }
                        });
                    } 
                    
                  }

                const products = await orderProductModel.aggregate(pipeline) 
                //console.log('dddddddd', products.length)
                // const products = await orderProductModel.find({order_id:order.order_id})
                // .populate({ path: 'product_id', model: 'Product' })
                // .populate('variant_id') 
                 
                  if(!products.length) return null

                const address =  await orderAddressModel.findOne({order_id:order.order_id})
                return {
                    ...order.toObject(),
                    products,
                    address
                }
            
            
            }) 
        )

        //console.log(orderWithProdcut);
        
            orderWithProdcut = orderWithProdcut.filter((item)=> item != null)

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
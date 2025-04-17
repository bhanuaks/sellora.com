
import { responseFun } from "@/Http/helper"; 
import { getLoginUser } from "../../getLoginUser/route";
import { orderItemStatusHistryModal, orderModel, orderProductModel } from "@/Http/Models/order";
import { orderAddressModel } from "@/Http/Models/orderAddress";
import mongoose from "mongoose";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const order_product_id = searchParams.get('order_product_id')
    try{
        const user = getLoginUser(); 
         
        const query = {
            orderItemId:order_product_id,
            status:4
        }        
        const orderHistory = await orderItemStatusHistryModal.find(query).sort({ createdAt: -1 })
        // console.log(orderHistory)
        
        const products = await orderProductModel.aggregate([
                    {
                        $match:{_id: new mongoose.Types.ObjectId(order_product_id)}
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
                        $addFields:{variant_id:{$arrayElemAt:['$variant_id',0]}}
                    },
                    {
                        $match:{variant_id:{$ne:null}}
                    },

                    

                    {
                        $sort:{createdAt:-1}
                    },
                   
                    
                ])  

                 
             
                 const orderWithProduct =   {
                    
                    products,
                    orderHistory
                    
                }
             
        

        return responseFun(true, {orderProduct:orderWithProduct}, 200)

    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
}
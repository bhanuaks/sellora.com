
import { responseFun } from "@/Http/helper"; 
import { getLoginUser } from "../../getLoginUser/route";
import { orderModel, orderProductModel } from "@/Http/Models/order";
import { orderAddressModel } from "@/Http/Models/orderAddress";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const order_id = searchParams.get('order_id')
    try{
        const user = getLoginUser(); 
        const order  = await orderModel.findById(order_id) 
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
                        $addFields:{variant_id:{$arrayElemAt:['$variant_id',0]}}
                    },
                    {
                        $match:{variant_id:{$ne:null}}
                    },

                    

                    {
                        $sort:{createdAt:-1}
                    },
                   
                    
                ])  

                 const address =  await orderAddressModel.findOne({order_id:order.order_id})
             
                 const orderWithProdcut =   {
                    ...order.toObject(),
                    products,
                    address
                }
             
        

        return responseFun(true, {order:orderWithProdcut}, 200)

    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
}
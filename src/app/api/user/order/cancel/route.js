import { getLoginUser } from "@/app/api/getLoginUser/route";
import { responseFun } from "@/Http/helper";
import { orderItemStatusHistryModal, orderModel, orderProductModel } from "@/Http/Models/order";
import mongoose from "mongoose";



export async function POST(request) {
    const { order_item_id } = await request.json();

    const user = getLoginUser();
    if(!user){
        return responseFun(false, "unauthrized request", 200)
    } 

    const session =  await mongoose.startSession();
    session.startTransaction()  
    try{
        const orderItem = await orderProductModel.findOne(
                { 
                    _id: new mongoose.Types.ObjectId(order_item_id), 
                }
            ) 
            console.log({orderItem});
        orderItem.order_status = 7 // status 7 is user cancel request
        await orderItem.save();
        const statusHistory = await orderItemStatusHistryModal.create({
            orderItemId:orderItem._id,
            status:7,
            remarks:"Cancel by user"
        })
         
        session.commitTransaction();
        return responseFun(true, "Susscess", 200)
    }catch(error){
        session.abortTransaction();
        console.log(error);
        return responseFun(false, "something went wrong", 500)
    }

}
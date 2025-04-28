import { responseFun } from "@/Http/helper";
import { sellerModel, sellerPickupAddressModel, sellerReturnAddressModel, sellorAccountInformationModel, sellorCardInformationModel, sellorSettingModel, sellorShippingTempleteModel } from "@/Http/Models/sellerModel";
import mongoose from "mongoose";


export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const seller_id = searchParams.get("seller_id");
    if(!seller_id){
        return responseFun(false, "Seller id not found", 401)
    }
    try{
        const seller = await sellerModel.findById(seller_id)
        const pickupAddress = await sellerPickupAddressModel.findOne({seller_id: new mongoose.Types.ObjectId(seller_id)}).lean();
        const returnAddress = await sellerReturnAddressModel.findOne({seller_id: new mongoose.Types.ObjectId(seller_id)}).lean();
        const Setting = await sellorSettingModel.findOne({seller_id: new mongoose.Types.ObjectId(seller_id)}).lean();
        const sippingTemplete = await sellorShippingTempleteModel.find({seller_id: new mongoose.Types.ObjectId(seller_id)}).lean();
        const accountInfo = await sellorAccountInformationModel.findOne({seller_id: new mongoose.Types.ObjectId(seller_id)}).lean();
        const cartInfo = await sellorCardInformationModel.findOne({seller_id: new mongoose.Types.ObjectId(seller_id)}).lean();
        const sellerData = {
            ...seller.toObject(),
            pickupAddress,
            returnAddress,
            Setting,
            sippingTemplete,
            accountInfo,
            cartInfo
        }
        return responseFun(true, sellerData, 200)
    }catch(error){
        console.log(error); 
        return responseFun(false, error.message, 500)
    }
}
import { responseFun } from "@/Http/helper";
import { brandModel } from "@/Http/Models/branModel";
import { sellerModel } from "@/Http/Models/sellerModel";
import mongoose from "mongoose";

export async function GET(request) {
     const { searchParams } = new URL(request.url)
     const seller_id = searchParams.get('user_id');
     const status = searchParams.get('status');
     const search = searchParams.get('search');

     try{
        const query = {seller_id:new mongoose.Types.ObjectId(seller_id)}
        if(status){
            query.status = status
        }

        if (search && search != null) {
            const searchNumber = parseFloat(search);
            query.$or = [
                { name: { $regex: search, $options: "i" } }, 
                
            ];

            if (!isNaN(searchNumber)) {
                query.$or.push({ request_id: searchNumber });
            }
        }


        const totalBrand = await brandModel.countDocuments();
        const totalApproveBrand = await brandModel.countDocuments({status:1});
        const totalPendingBrand = await brandModel.countDocuments({status:2});
        const brandList  = await brandModel.find(query)
        const seller = await sellerModel.findById(seller_id)
        return responseFun(true, {brandList, seller, total:{totalBrand,totalApproveBrand,totalPendingBrand}}, 200)

     }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
     }
}

export async function DELETE(request) {
    
    const {_id} = await request.json();

    try{
        const res =  await brandModel.findByIdAndDelete(_id);
        return responseFun(true, {message: "Brand deleted"}, 200)
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
}
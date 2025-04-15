import { responseFun } from "@/Http/helper";
import { productModel, productVariantModel } from "@/Http/Models/productModel";
import mongoose from "mongoose";
import { fetchVariant } from "../add-variant/route";


export async function GET(request) {
    
    const { searchParams } = new URL(request.url);
    const seller_id = searchParams.get('seller_id')
    const searchText = searchParams.get('searchText')
    const searchBy = searchParams.get('searchBy')
    let page = parseInt(searchParams.get('page'))
    let pageSize = parseInt(searchParams.get('pageSize'))
    if(!page){
        page=4
    }
    if(!pageSize){
        pageSize=10
    }
 
    const skip = (page - 1) * pageSize;
    let totalCount =null;
    try{
            
        const query = {
            
        }

        const matchCondition = {
            seller_id: new mongoose.Types.ObjectId(seller_id)
        };
        
        
        if (searchText && typeof searchText === 'string' && searchBy=="title") {
            matchCondition.product_name = { $regex: searchText, $options: "i" };
        }

        totalCount = await productVariantModel.countDocuments({
            $and:[
                {seller_id: new mongoose.Types.ObjectId(seller_id)},
                { listingStatus: {$nin: [3, 4]} }
            ]
        });
         
        const productListing = await productModel.aggregate([
            {
                $match:matchCondition,
            },

            {
                $lookup:{
                    from:"productvariants",
                    let: {productId:"$_id"},
                    pipeline:[
                        {
                            $match:{
                                $expr:{
                                    $and:[
                                        { $eq: ["$product_id", "$$productId"] },
                                        { $not: [{ $in: ["$listingStatus", [3, 4]] }] }
                                    ]
                                }
                            }
                        },
                        // Search `sku` inside productvariants
                        ...(searchText && typeof searchText === "string" && searchBy === "SKU"
                            ? [
                                {
                                    $match: {
                                        sku: { $regex: searchText, $options: "i" }  
                                    }
                                }
                            ]
                            : [])

                    ],
                    
                    as:"variants"
                }
            },
            {
                $unwind:{
                    path: "$variants",
                    preserveNullAndEmptyArrays:searchBy === "SKU" && searchText ?false:true
                }
            },
            {
                $lookup:{
                    from:"variantthresholds",
                    localField:"variants._id",
                    foreignField:"variant_id",
                    as:"tresholdData"
                }
            },

            {
                $skip: skip
            },
            {
                $limit: pageSize
            }
            
    ])


       
    let pagination= {
        totalCount,
        page,
        pageSize,
        // totalPages: 20,
        totalPages: Math.ceil(totalCount / pageSize),
    };
    
        return responseFun(true, {list:productListing, pagination:pagination},200)

    }catch(error){
        console.log(error);
        return responseFun(false, {error:error},200)
    }
}
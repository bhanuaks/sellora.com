import { isEmpty, rand, responseFun, slugify } from "@/Http/helper";
import path from 'path'
import { productModel, productOtherDetailModel, productVariantModel, variantThresholdSchemaModal } from "@/Http/Models/productModel";
import mongoose from "mongoose";
import ColorModel from "../../../../lib/variant/ColorModel";
import SizeModel from "../../../../lib/variant/SizeModel";
import ItemBreadthModel from "../../../../lib/variant/ItemBreadthModel";
import ItemHeightModel from "../../../../lib/variant/ItemHeightModel";
import ItemLengthModel from "../../../../lib/variant/ItemLengthModel";
import ItemWeightModel from "../../../../lib/variant/ItemWeightModel";
import PackageBreadthModel from "../../../../lib/variant/PackageBreadthModel";
import PackageHeightModel from "../../../../lib/variant/PackageHeightModel";
import PackageWeightModel from "../../../../lib/variant/PackageWeightModel";
import PackageLengthModel from "../../../../lib/variant/PackageLengthModel";
import { connectDb } from "../../../../lib/dbConnect";
import { getProductVariantData } from "../check-variant/route";
import { brandModel } from "@/Http/Models/branModel";
import { ProductReviewModal } from "@/Http/Models/ProductReview";
import { sellerModel, sellerPickupAddressModel } from "@/Http/Models/sellerModel";


export async function GET(req) {

  connectDb();
    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("productId");
        const slug = searchParams.get("slug");

        if (!productId && !slug) {
            return responseFun(false, { message: "Missing required parameters." }, 400);
          }
    //     const productData = productId
    //   ? await productModel.findById(productId)
    //   : await productModel.findOne({ slug });

        let productData = null;
        let product = await productModel.findOne({slug:slug})
        // .populate('brand_id')
        .populate('category_id')
        .populate('subcategory_id')
        .populate('childcategory_id');
        const totalReviews = await ProductReviewModal.countDocuments(
         { product_id: product._id }   
      );
        const reviewAvg = await ProductReviewModal.aggregate([
          { $match: { product_id: product._id } },
          { $group: { _id: null, avgRating: { $avg: "$star" } } }
      ]);
      
      const avgRating = reviewAvg.length > 0 ? reviewAvg[0].avgRating : 0;
      const compliance = await productOtherDetailModel.findOne({product_id: product._id});
      // return responseFun(false, {id:product._id,}, 500)
        const seller = await sellerModel.findById(product.seller_id).select("name display_name").lean()
        const shipFrom =  await sellerPickupAddressModel.findOne({seller_id: new mongoose.Types.ObjectId(product.seller_id)}).lean()
        .select("city zip_code")
        if(product && product.brand_id){ 
          const brand = await brandModel.findById(product.brand_id) 
          productData = {
            ...product.toObject(),
            brand_id:brand,
            avgRating:avgRating,
            totalReviews:totalReviews,
            compliance:compliance,
            seller:{...seller, shipFrom}
          }
        }else{
          productData = {
            ...product.toObject(), 
            avgRating:avgRating,
            totalReviews:totalReviews,
            compliance:compliance
          }
        }
        
        if (!productData) {
            return responseFun(false, { message: "Product not found." }, 404);
          }

        const variantList = await getVariant(productId);  
        const variantArray = await getProductVariantData(productId)
        return responseFun(true, {  productData, variantList, variantArray }, 200);

    } catch (error) {
      console.log(error);
        return responseFun(false, {message:"An error occurred while fetching products"}, 500)
     }

     

}

async function getVariant(product_id) {
    try {
      const variantList = await productVariantModel
        .find({ 
          product_id: new mongoose.Types.ObjectId(product_id),
          listingStatus:1 
        })
        .sort({ createdAt: -1 });
  
      const variantListWithValue = await Promise.all(
        variantList.map(async (variant) => {
          
          return {
            ...variant.toObject(), 
            
          };
        })
      );
  
      return variantListWithValue;
    } catch (error) {
      console.error("Error fetching variants:", error);
      return [];
    }
  }
  
  async function fetchVariant(variantName, _id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error("Invalid ObjectId provided");
      }
  
      switch (variantName) {
        case "colorId":
          return await ColorModel.findById(_id);
        case "sizeId":
          return await SizeModel.findById(_id);
        case "itemBreadthId":
          return await ItemBreadthModel.findById(_id);
        case "itemHeightId":
          return await ItemHeightModel.findById(_id);
        case "itemLengthId":
          return await ItemLengthModel.findById(_id);
        case "itemWeightId":
          return await ItemWeightModel.findById(_id);
        case "packageBreadthId":
          return await PackageBreadthModel.findById(_id);
        case "packageHeightId":
          return await PackageHeightModel.findById(_id);
        case "packageLengthId":
          return await PackageLengthModel.findById(_id);
        case "packageWeightId":
          return await PackageWeightModel.findById(_id);
        default:
          return null;
      }
    } catch (error) {
      console.error(`Error fetching variant for ${variantName}:`, error);
      return null;
    }
}


export async function DELETE(params) {
  
  return responseFun(true,"", 200)
}
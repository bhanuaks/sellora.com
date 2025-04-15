import { responseFun } from "@/Http/helper";
import { Category, productDynamicFieldModel } from "../../../../../lib/categoryModel";
import { subCategory } from "../../../../../lib/subcategoryModel";
import ChildCategory from "../../../../../lib/childcategoryModel";
import { brandModel } from "@/Http/Models/branModel";
import { sellerModel } from "@/Http/Models/sellerModel";
import ColorModel from "../../../../../lib/variant/ColorModel";
import SizeModel from "../../../../../lib/variant/SizeModel";
import ItemBreadthModel from "../../../../../lib/variant/ItemBreadthModel";
import ItemHeightModel from "../../../../../lib/variant/ItemHeightModel";
import ItemLengthModel from "../../../../../lib/variant/ItemLengthModel";
import ItemWeightModel from "../../../../../lib/variant/ItemWeightModel";
import PackageBreadthModel from "../../../../../lib/variant/PackageBreadthModel";
import PackageHeightModel from "../../../../../lib/variant/PackageHeightModel";
import PackageLengthModel from "../../../../../lib/variant/PackageLengthModel";
import PackageWeightModel from "../../../../../lib/variant/PackageWeightModel";
import { connectDb } from "../../../../../lib/dbConnect";
import { getVariant } from "../product/add-variant/route";
import { productModel, productOtherDetailModel } from "@/Http/Models/productModel";
import mongoose from "mongoose";
 
 

export async function POST(request) { 
    await connectDb()
    const {seller_id, category_id, subcategory_id, childcategory_id, brand_id, seller, product_id,  withData } = await request.json();

    try{
        const categoryData = await Category.findById(category_id)
        const dynamicField = await productDynamicFieldModel.find({ category_id: categoryData._id });
        const category = {
        ...categoryData.toObject(),
        dynamicField: dynamicField
        };

        let subcategory = null;
        if(subcategory_id){
             subcategory = await subCategory.findById(subcategory_id) 
        }
        let childcategory = null;
        if(childcategory_id){ 
             childcategory = await  ChildCategory.findById(childcategory_id)
        }
        const brand = await brandModel.findById(brand_id)
        const seller = await sellerModel.findById(seller_id)
        

        let variantList = [];
        let product = null;
        let compliance = null;
        if(product_id){
            variantList = await getVariant(product_id)
            product = await productModel.findById(product_id)
            if(withData == "Compliance"){
                 compliance = await productOtherDetailModel.findOne({product_id: new mongoose.Types.ObjectId(product_id)})
               
            }
        }
        const returnData = {
            category:category,
            subcategory:subcategory,
            childcategory:childcategory,
            brand:brand,
            seller:seller, 
            variantList:variantList,
            product:product,
            compliance
        }
        return responseFun(true, returnData , 200)

    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200)
    }
}


export async function getVariantTemlate(category) { 
    // const variants = ["colorId", "sizeId", "itemBreadthId", "itemHeightId", "itemLengthId", "itemWeightId", "packageBreadthId", "packageHeightId", "packageLengthId", "packageWeightId"];
    const variant = {}
    if (category.colorId && category.colorId.length > 0) {
        variant.colorId = await ColorModel.find({
            _id: { $in: category.colorId }
        });
    }
    if (category.sizeId && category.sizeId.length > 0) {
        variant.sizeId = await SizeModel.find({
            _id: { $in: category.sizeId }
        });
    }

    if (category.itemBreadthId && category.itemBreadthId.length > 0) {
        variant.itemBreadthId = await ItemBreadthModel.find({
            _id: { $in: category.itemBreadthId }
        });
    }

    if (category.itemHeightId && category.itemHeightId.length > 0) {
        variant.itemHeightId = await ItemHeightModel.find({
            _id: { $in: category.itemHeightId }
        });
    }

    if (category.itemLengthId && category.itemLengthId.length > 0) {
        variant.itemLengthId = await ItemLengthModel.find({
            _id: { $in: category.itemLengthId }
        });
    }

    if (category.itemWeightId && category.itemWeightId.length > 0) {
        variant.itemWeightId = await ItemWeightModel.find({
            _id: { $in: category.itemWeightId }
        });
    }

    if (category.packageBreadthId && category.packageBreadthId.length > 0) {
        variant.packageBreadthId = await PackageBreadthModel.find({
            _id: { $in: category.packageBreadthId }
        });
    }
    if (category.packageHeightId && category.packageHeightId.length > 0) {
        variant.packageHeightId = await PackageHeightModel.find({
            _id: { $in: category.packageHeightId }
        });
    }

    if (category.packageLengthId && category.packageLengthId.length > 0) {
        variant.packageLengthId = await PackageLengthModel.find({
            _id: { $in: category.packageLengthId }
        });
    }

    if (category.packageWeightId && category.packageWeightId.length > 0) {
        variant.packageWeightId = await PackageWeightModel.find({
            _id: { $in: category.packageWeightId }
        });
    }

    return variant;
    // const variants = ["", "", "", "", "", "packageWeightId"];

}
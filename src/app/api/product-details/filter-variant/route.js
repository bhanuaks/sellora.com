import { responseFun } from "@/Http/helper"; 
import mongoose from "mongoose";
import { productVariantModel } from "@/Http/Models/productModel"; 
import ColorModel from "../../../../../lib/variant/ColorModel"; 
import SizeModel from "../../../../../lib/variant/SizeModel";
import ItemBreadthModel from "../../../../../lib/variant/ItemBreadthModel";
import ItemHeightModel from "../../../../../lib/variant/ItemHeightModel";
import ItemLengthModel from "../../../../../lib/variant/ItemLengthModel";
import ItemWeightModel from "../../../../../lib/variant/ItemWeightModel";
import PackageBreadthModel from "../../../../../lib/variant/PackageBreadthModel";
import PackageHeightModel from "../../../../../lib/variant/PackageHeightModel";
import PackageWeightModel from "../../../../../lib/variant/PackageWeightModel";
import PackageLengthModel from "../../../../../lib/variant/PackageLengthModel";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("productId");
        const variantValueId = searchParams.get("variantValueId");

        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return responseFun(false, { message: "Invalid or missing productId" }, 400);
        }
        if (!variantValueId || !mongoose.Types.ObjectId.isValid(variantValueId)) {
            return responseFun(false, { message: "Invalid or missing variantValueId" }, 400);
        }

        const variantList = await getVariant(productId, variantValueId);

        return responseFun(true, { variantList }, 200);
    } catch (error) {
        console.error("Error in GET /filter-variant:", error);
        return responseFun(false, { message: "An error occurred while fetching variants" }, 500);
    }
}

async function getVariant(productId, variantValueId) {
    try {
        const variantList = await productVariantModel.find({
            product_id: new mongoose.Types.ObjectId(productId),
            $or: [
                { "customAttributes.colorId": variantValueId },
                { "customAttributes.sizeId": variantValueId },
                { "customAttributes.itemBreadthId": variantValueId },
                { "customAttributes.itemHeightId": variantValueId },
                { "customAttributes.itemLengthId": variantValueId },
                { "customAttributes.itemWeightId": variantValueId },
                { "customAttributes.packageBreadthId": variantValueId },
                { "customAttributes.packageHeightId": variantValueId },
                { "customAttributes.packageLengthId": variantValueId },
                { "customAttributes.packageWeightId": variantValueId },
            ],
        }).sort({ createdAt: -1 });

        const variantListWithValue = await Promise.all(
            variantList.map(async (variant) => {
                const variantItems = {};

                if (variant.customAttributes && typeof variant.customAttributes === "object") {
                    for (const [key, value] of Object.entries(variant.customAttributes)) {
                        if (value) {
                            variantItems[key] = await fetchVariant(key, value);
                        }
                    }
                }

                return {
                    ...variant.toObject(),
                    variantValue: variantItems,
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
    const variantModelMap = {
        colorId: ColorModel,
        sizeId: SizeModel,
        itemBreadthId: ItemBreadthModel,
        itemHeightId: ItemHeightModel,
        itemLengthId: ItemLengthModel,
        itemWeightId: ItemWeightModel,
        packageBreadthId: PackageBreadthModel,
        packageHeightId: PackageHeightModel,
        packageLengthId: PackageLengthModel,
        packageWeightId: PackageWeightModel,
    };

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            throw new Error("Invalid ObjectId provided");
        }

        const Model = variantModelMap[variantName];
        return Model ? await Model.findById(_id) : null;
    } catch (error) {
        console.error(`Error fetching variant for ${variantName}:`, error);
        return null;
    }
}

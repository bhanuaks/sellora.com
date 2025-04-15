import { responseFun } from "@/Http/helper";
import { orderProductModel } from "@/Http/Models/order";
import { productModel, productVariantModel, variantThresholdSchemaModal } from "@/Http/Models/productModel";
import mongoose from "mongoose";

export async function POST(request) {
    const { cartItems } = await request.json();

    try {
        if (!cartItems.length) {
            return responseFun(false, { cartItems: [] }, 200);
        }

        let cartProduct = (await Promise.all(
            cartItems.map(async (element) => {
                let thresholdDiscount = 0;
                const product = await productModel.findById(element.product_id)
                const variant = await productVariantModel.findOne({
                    _id: new mongoose.Types.ObjectId(element.variant_id),
                    product_id: new mongoose.Types.ObjectId(element.product_id),
                    listingStatus: 1
                })
                const threshold =  await variantThresholdSchemaModal.findOne({
                    variant_id: new mongoose.Types.ObjectId(element.variant_id),
                    unit: {
                        $lte:element.quantity,
                        $ne:0
                    },
                     
                }).sort({ unit: -1 });

                if(threshold){
                    if(variant.discount_type =="percentage"){
                        const price = variant.businessSalePrice*element.quantity;
                        thresholdDiscount = (price/100) * threshold.discount
                    }else{
                        thresholdDiscount = threshold.discount
                    }
                }

                const last30Days = new Date();
                last30Days.setDate(last30Days.getDate()-30);
                const last_month_buy  =  await orderProductModel.countDocuments(
                    {
                        product_id: new mongoose.Types.ObjectId(element.product_id),
                        variant_id: new mongoose.Types.ObjectId(element.variant_id), 
                        createdAt:{
                            $gte:last30Days
                        }

                    }
                )

                if (product && variant) {
                    return { ...product.toObject(), variant:{...variant.toObject(), threshold_discount:thresholdDiscount, last_month_buy}, quantity:element.quantity};
                }
                return null;
            })
        )).filter(Boolean);

        return responseFun(true, { cartItems: cartProduct }, 200)
    } catch (error) {
        console.log(error);
        responseFun(false, { error }, 200)
    }
}
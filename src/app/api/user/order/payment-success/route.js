import { getLoginUser } from "@/app/api/getLoginUser/route";
import { decodeJwt, rand, responseFun } from "@/Http/helper";
import { orderCountModel, orderModel, orderProductModel } from "@/Http/Models/order";
import { orderAddressModel } from "@/Http/Models/orderAddress";
import { tempOrderModel } from "@/Http/Models/tempOrder"; 
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { productVariantModel } from "@/Http/Models/productModel";

export async function POST(request) {

    const {temp_order_id} = await request.json(); 
    const session = await mongoose.startSession();
   session.startTransaction()
    try{    
        const tempOrder = await tempOrderModel.findOne({temp_order_id:temp_order_id}).session(session);
        if (!tempOrder) {
            throw new Error("Temporary order not found.");
        }


        const totalOrder = await orderCountModel.findOneAndUpdate( 
             {id:1},
            {$inc: {count:1}},
            {new:true, upsert:true, session } 
        );
        const newOrderId =  `ORD${totalOrder.count.toString().padStart(5, "0")}`;

        
        const transaction_id = `TRAN${rand(1111,9999)}ID${rand(100,999)}`


        const cookieStore = cookies();
        const userToken = cookieStore.get("userAuthToken")?.value;
        if (!userToken){
            return  responseFun(false, {message:"User not Login!"}, 200)
        }
        const decodedData = jwt.verify(userToken, process.env.JWT_SECRET);
        const user = decodedData.user;
        

        if (!user){
            return  responseFun(false, {message:"User not found!"}, 200)
        }
        
        const new_order = await orderModel.create(
            [
                {
                order_id: newOrderId,
                user_id: user._id,
                total_price: tempOrder.amountData.total_price,
                shipping_charge: tempOrder.amountData.shipping_charge,
                coupan_name:"",
                coupon_discount:0,
                threshold_discount: tempOrder.amountData.threshold_discount,
                grand_total: tempOrder.amountData.grand_total,
                payment_type:"Rozerpayy",
                payment_status:1,
                order_status:"Placed",
                transaction_id:transaction_id, 
                currency:tempOrder.products.currency,
                order_note:tempOrder.addresss?.order_note
            }
        ],
        {session}
    )

        // insert order product

         for(const [key, product] of tempOrder.products.entries()){
           const inventory =  await productVariantModel.findById(product.variant?._id);
           const availableStock = inventory.stock;
           if (inventory) {
                // if nagetive then 0
                inventory.stock = Math.max(0, availableStock - product.quantity); 
                await inventory.save({ session });
                } else {
                    console.warn(`Inventory not found for variant ID: ${product.variant?._id}`);
                }

            await orderProductModel.create(
                [
                    {
                    mongoose_order_id: new_order[0]._id,
                    order_id: new_order[0].order_id,
                    sub_order_id: `${new_order[0].order_id}-${key}`,
                    product_id:product._id,
                    product_name: product.product_name,
                    model_name:product.model_name,
                    model_number:product.model_number,
                    description: product.product_description,
                    // image: product.variant.withImage?product.variant.image_1:product.main_image,
                    user_id:user._id,
                    seller_id:product.seller_id,
                    variant_id:product.variant._id,
                    sku:product.variant.sku || "",
                    sin:product.variant?.sin || "",
                    variants:product.variant?.customAttributes || null,
                    quantity:product.quantity,
                    price: user.role_consumer_business == "Business"?(product.variant.businessSalePrice*product.quantity):(product.variant.consumerSalePrice*product.quantity),
                    discount_amount:product.variant.threshold_discount,
                    currency:product.currency ,
                    order_status:availableStock >= product.quantity ?1:0,
                }
            ],
            {session}
        )
        }
         


    // save order address
    const addressData = tempOrder.addresss;
    const orderAddress = await orderAddressModel.create(
        [
            {
                user_id:user._id,
                mongoose_order_id:new_order[0]._id,
                order_id:new_order[0].order_id,

                first_name:addressData.first_name,
                last_name:addressData.last_name,
                email:addressData.email,
                address:addressData.address,
                company_name:addressData.company_name,
                country:addressData.country,
                city:addressData.city,
                state:addressData.state,
                zipcode:addressData.zipcode,
                phone_number:addressData.phone_number, 

                same_address:addressData.same_address || 'NO',
                ...(addressData.same_address !== "Yes"
                    ? {
                          b_first_name: addressData.b_first_name,
                          b_last_name: addressData.b_last_name,
                          b_email: addressData.b_email,
                          b_company_name: addressData.b_company_name,
                          b_country: addressData.b_country,
                          b_address: addressData.b_address,
                          b_city: addressData.b_city,
                          b_state: addressData.b_state,
                          b_zipcode: addressData.b_zipcode,
                          b_phone_number: addressData.b_phone_number,
                          company_tax_id: addressData.company_tax_id,
                      }
                    : {})
                
            }
        ],
    {session}
)
    
    await tempOrderModel.deleteOne({temp_order_id}).session(session)
    await session.commitTransaction();
    session.endSession();
    return responseFun(true, { message: "Your Order has been Placed Sccessfully" }, 200)
    }catch(error){
        console.log(error);
        await session.abortTransaction();
        session.endSession();
       return responseFun(false, {error}, 200)
    }
}


// export async function OrderPaymentSuccess(){

// }


async function generateOrderId(){

    try{ 
        const totalOrder = await orderCountModel.findOneAndUpdate(
            {id:1},
            {$inc: {count:1}},
            {new:true, upsert:true}
        );
        return `${totalOrder.count.toString().padStart(10, "0")}`;

    }catch(error){
        console.error("Error generating order ID:", error);
        throw error;
    }
  
}

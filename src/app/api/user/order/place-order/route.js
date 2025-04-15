import { getLoginUser } from "@/app/api/getLoginUser/route";
import { decodeJwt, isEmpty, rand, responseFun } from "@/Http/helper";
import { productVariantModel } from "@/Http/Models/productModel";
import { tempOrderModel } from "@/Http/Models/tempOrder";
import { userAddressModel } from "@/Http/Models/userModel";
import mongoose from "mongoose";
 

export async function POST(request) {

     
    let user = getLoginUser() ;
     if(!user){
        return responseFun(false, {message:"user not found"}, 200)
     }
    
        const {
            addressData,
            amount,
            product
        } = await request.json();
      

        const {
            // Shipping Address Field 
            first_name,
            last_name,
            email,
            company_name,
            country,
            address,
            city,
            state,
            zipcode,
            phone_number,
            order_note,

            same_address,

            // Billing Address Field
            b_first_name,
            b_last_name,
            b_email,
            b_company_name,
            b_country,
            company_tax_id,
            b_city,
            b_state,
            b_zipcode,
            b_phone_number,
            b_address,

            // payment mode
            payment_mode
        } = addressData;
        

        const errors = {}
        if(isEmpty(first_name))errors.first_name = "First name is required";
        if(isEmpty(last_name))errors.last_name = "Last name is required";
        if(isEmpty(email))errors.email = "Email is required";
        if(isEmpty(country))errors.country = "Country is required";
        if(isEmpty(address))errors.address = "Address is required";
        if(isEmpty(city))errors.city = "City is required";
        if(isEmpty(state))errors.state = "State is required";
        if(isEmpty(zipcode))errors.zipcode = "Zipcode is required";
        if(isEmpty(phone_number))errors.phone_number = "Phone number is required";

        if(same_address != "Yes"){ 
            if(isEmpty(b_first_name))errors.b_first_name = "First name is required";
            if(isEmpty(b_last_name))errors.b_last_name = "Last name is required";
            if(isEmpty(b_email))errors.b_email = "Email is required";
            if(isEmpty(b_country))errors.b_country = "Country is required";
            if(isEmpty(b_address))errors.b_address = "Address is required";
            if(isEmpty(b_city))errors.b_city = "City is required";
            if(isEmpty(b_state))errors.b_state = "State is required";
            if(isEmpty(b_zipcode))errors.b_zipcode = "Zipcode is required";
            if(isEmpty(b_phone_number))errors.b_phone_number = "Phone number is required"; 
        }

        if(Object.keys(errors).length > 0){
            return responseFun(false, {errors, status_code:400},200)
        }


        try{ 

             const user = getLoginUser();
             const existAddress = await userAddressModel.findOne({user_id:new mongoose.Types.ObjectId(user._id)})
            const sameAddress = same_address == "Yes"?true:false;
                if(existAddress){
                            await userAddressModel.findOneAndUpdate({user_id:new mongoose.Types.ObjectId(user._id)},
                            
                            {
                                
                                $set:{
                                    first_name,
                                    last_name,
                                    email,
                                    company_name,
                                    country,
                                    address,
                                    city,
                                    state,
                                    zipcode,
                                    phone_number,
                                    // biiling address
                                    b_first_name: sameAddress?first_name:b_first_name,
                                    b_last_name : sameAddress? last_name :b_last_name ,
                                    b_email : sameAddress? email :b_email ,
                                    b_address : sameAddress? address :b_address ,
                                    b_company_name : sameAddress? company_name :b_company_name ,
                                    b_country : sameAddress? country :b_country ,
                                    b_city : sameAddress? city :b_city ,
                                    b_state : sameAddress? state :b_state ,
                                    b_zipcode : sameAddress? zipcode :b_zipcode ,
                                    b_phone_number : sameAddress? phone_number :b_phone_number 
                                }
                            }
                        )
                        }else{
                            await userAddressModel.create({
                                user_id:user._id, 

                                first_name,
                                last_name,
                                email,
                                company_name,
                                country,
                                address,
                                city,
                                state,
                                zipcode,
                                phone_number,
                                // biiling address
                                b_first_name: sameAddress?first_name:b_first_name,
                                b_last_name : sameAddress? last_name :b_last_name ,
                                b_email : sameAddress? email :b_email ,
                                b_address : sameAddress? address :b_address ,
                                b_company_name : sameAddress? company_name :b_company_name ,
                                b_country : sameAddress? country :b_country ,
                                b_city : sameAddress? city :b_city ,
                                b_state : sameAddress? state :b_state ,
                                b_zipcode : sameAddress? zipcode :b_zipcode ,
                                b_phone_number : sameAddress? phone_number :b_phone_number 

                            })
                        }

                        for(const [key, productData] of product.entries()){
                             const inventory =  await productVariantModel.findById(productData.variant?._id);
                             const availableStock = inventory.stock;
                             if(availableStock < productData.quantity || productData.variant.stock_status !=="In Stock"){
                                
                                return responseFun(false, {message:`${productData.product_name} is not available`, status_code:204}, 200)
                             }
                        }
            const orderId = await tempOrderID()
            const tempOrder =  await tempOrderModel.create({
                temp_order_id:orderId,
                products:product,
                addresss:addressData,
                amountData:amount,
                user_id:user._id
            })
            return responseFun(true, {message:"success", tempOrder},200)

        }catch(error){
            console.log(error);
            return responseFun(false, {error},200) 
        }
}


const tempOrderID = async ()=>{
  const orderId =   `TEMP-${rand(1000000000, 9999999999)}`
  const existId = await tempOrderModel.findOne({temp_order_id:orderId});
  if(existId){
    tempOrderID()
  }
  return orderId
}
import { trim } from "jquery";

const { Schema, default: mongoose } = require("mongoose");


const sellerSchema = new Schema({
    name:{
        type:String,
        required:[true, "Name is required"]
    },
    mobile:{
        type:String,
        required:[true, "Mobile required"],
        trim:true
    }, 

// ========================================================================
    email:{
        type:String,
        required:[true, "email required"],
        trim:true,
        lowercase:true,
        validate:{
            validator:function(v){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message : props => `${props.value} is not a valid email`
        }
    },
// ==========================================================================

    password:{
        type:String,
        required:[true, "Password is required"],
        select: false  
    },
    show_password:{
        type:Object, 
        select: false  
    },
    display_name:{
        type:String,  
    },
    business_description:{
        type:String,  
    }, 
    country_s_name:String,
    mobile_code:String,
    complete_step:Number,
    status:{
        type:String,
        trim:true,
        enum: ['Active', 'Deactive'],
        default: 'Active',
    },
    approvalStatus:{
        type:String,
        trim:true,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    approvalDate:{
        type : Date,
        trim : true
    },
    remarks : {
        type : String,
        trim : true
    },

    lastloginTimeDate:{
        type:Date, 
    },



},{timestamps:true})


export const sellerModel = mongoose.models.Seller || mongoose.model('Seller', sellerSchema)



const seller_pickup_address_schema = new Schema({
    seller_id:{
        type:mongoose.Types.ObjectId,
        ref:"Seller"
    },
    name:String,
    address_line_1:String,
    address_line_2:String,
    city:String,
    state:String,
    zip_code:String,
    country:String,
    country_s_name:String,
    mobile_code:String,
    mobile:String,

},{timestamps:true}) 

export const sellerPickupAddressModel = mongoose.models.SellorPickupAddress ||  mongoose.model("SellorPickupAddress", seller_pickup_address_schema)




const seller_return_address_schema = new Schema({
    seller_id:{
        type:mongoose.Types.ObjectId,
        ref:"Seller"
    },
    name:String,
    address_line_1:String,
    address_line_2:String,
    city:String,
    state:String,
    zip_code:String,
    country:String,
    country_s_name:String,
    mobile_code:String,
    mobile:String,

},{timestamps:true}) 

export const sellerReturnAddressModel = mongoose.models.SellorReturnAddress ||  mongoose.model("SellorReturnAddress", seller_return_address_schema)



const seller_Business_and_beneficiary_schema = new Schema({
    seller_id:{
        type:mongoose.Types.ObjectId,
        ref:"Seller"
    }, 
        country_s_name : String,
        mobile_code : String,
        mobile : String,
        business_name : String,
        business_address : String,
        city : String,
        state : String,
        zip_code : String,
        country : String,
        are_you_beneficial_for_business : String,
        are_you_business_representative : String,
        beneficiary_first_name:String,
        beneficiary_last_name : String,
        beneficiary_date_of_birth : String,
        beneficiary_nationality : String,
        proof_of_identification : String,
        identification_proof_file : String,
        beneficiary_address : String,
        beneficiary_city : String,
        beneficiary_state : String,
        beneficiary_zip_code : String,
        beneficiary_country : String,
        proof_of_address : String,
        proof_of_address_file : String,
        representative_designation : String,
        beneficial_designation : String,
},{timestamps:true}) 

export const sellorBusinessAndBeneficiaryAddressModel = mongoose.models.SellorBusinessAndBeneficiaryAddress ||  mongoose.model("SellorBusinessAndBeneficiaryAddress", seller_Business_and_beneficiary_schema)




const seller_setting_schema = new Schema({
    seller_id:{
        type:mongoose.Types.ObjectId,
        ref:"Seller"
    }, 
    shipping_setting : {
        type:Number,
        enum:[1,2], // 1 => free shipping on all orders, 2=> setting your own shipping rates 
    },
    shipping_rate:Number,
    shipping_rate_model:String,
    shipping_type:{
            type:String,
            enum:["Santanderd", "Expertise"], 
    },
    address_type:{
        type:String,  
    },
    transit_time:{
        type:String,  
    },
    rate:{
        type:Number,  
    },

},{timestamps:true}) 


export const sellorSettingModel = mongoose.models.sellerSetting ||  mongoose.model("sellerSetting", seller_setting_schema)



const seller_shiping_templete_schema = new Schema({
    seller_id:{
        type:mongoose.Types.ObjectId,
        ref:"Seller"
    }, 
    
    shipping_content:String,
    shipping_rate_model:String,
    shipping_type:{
            type:String,
            enum:["Standard", "Expertise"], 
    },
    address_type:{
        type:String,  
    },
    transit_time:{
        type:String,  
    },
   
    shipping_n_handling_charge:Number,  
    charge_type:String,  
    charge_amount:Number,  
    

},{timestamps:true}) 

export const sellorShippingTempleteModel = mongoose.models.SellerSippingTemplete ||  mongoose.model("SellerSippingTemplete", seller_shiping_templete_schema)



const seller_account_information_schema = new Schema({
    seller_id:{
        type:mongoose.Types.ObjectId,
        ref:"Seller"
    }, 
    account_holder_name:{
        type:String,
        required:[true, "account holder name is required"]
    },
    bank_name:{
        type:String,
        required:[true, "bank name is required"]
    },
    bank_address:{
        type:String, 
    },
    account_number:{
        type:String,
        required:[true, "account number is required"]
    },
    
    routing_number:{
        type:String,
        default:null
    },
    country:{
        type:String,
        default:null
    },
    zipcode:{
        type:String,
        default:null
    },
    state:{
        type:String,
        default:null
    }

},{timestamps:true}) 

export const sellorAccountInformationModel = mongoose.models.AccountInformation ||  mongoose.model("AccountInformation", seller_account_information_schema)



const seller_card_information_schema = new Schema({
    seller_id:{
        type:mongoose.Types.ObjectId,
        ref:"Seller"
    }, 
    card_holder_name:{
        type:String,
        // required:[true, "card holder name is required"]
    },
    name_of_card:{
        type:String,
        required:[true, "name of card is required"]
    },
    card_number:{
        type:String, 
        required:[true, "card number is required"]
    },
    card_number_iv:String,
    expire_month:{
        type:String,
        required:[true, "expire date is required"]
    },
    expire_month_iv:String,
    expire_year:{
        type:String,
        required:[true, "expire year is required"]
    },
    expire_year_iv:String,
    security_code:{ 
        type:String,
        required:[true, "security code is required"]
    },
    security_code_iv:String,
    billing_address:{ 
        type:String
    },

},{timestamps:true}) 

export const sellorCardInformationModel = mongoose.models.SellorCardInformation ||  mongoose.model("SellorCardInformation", seller_card_information_schema)
 


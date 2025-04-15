 

import mongoose, { Schema } from "mongoose"

const orderAddress = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"Consumer",
        required:[true, "user id is required"]
    },
    mongoose_order_id:{
        type:mongoose.Types.ObjectId,
        ref:"Order",
        required:[true, "Object order id is required"]
    },
    order_id:{
        type:String, 
    },

    // shoping address
    first_name:{
        type:String,
        default:null
    },
    
    last_name:{
        type:String,
        default:null
    },
    email:{
        type:String,
        default:null
    },
    address:{
        type:String,
        default:null
    },
    company_name:{
        type:String,
        default:null
    },
    country:{
        type:String,
        default:null
    },
    city:{
        type:String,
        default:null
    },
    state:{
        type:String,
        default:null
    },
    zipcode:{
        type:String,
        default:null
    }, 
    phone_number:{
        type:String,
        default:null
    },

    same_address:String,
    

    // biiling details
    b_first_name:{
        type:String, 
    }, 
    b_last_name:{
        type:String, 
    },
    b_email:{
        type:String, 
    },
    b_company_name:{
        type:String, 
    },
    b_country:{
        type:String, 
    },
    b_address:{
        type:String, 
    },
    b_city:{
        type:String, 
    },
    b_state:{
        type:String, 
    },
    b_zipcode:{
        type:String, 
    }, 
    b_phone_number:{
        type:String, 
    },
    company_tax_id:String
    
}, {timestamps:true})

export const orderAddressModel = mongoose.models.OrderAddess || mongoose.model("OrderAddess", orderAddress)
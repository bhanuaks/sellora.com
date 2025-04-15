const { Schema, default: mongoose } = require("mongoose");


const userSchema = new Schema({

    full_name:{
        type:String,
        required:[true, "User name is requied"]
    },
    country:{
        type:String,
        default:null
    },
    role_buyer_seller:{
        type:String,
        default:null
    },
    role_consumer_business:{
        type:String,
        default:null
    },
    tax_id:{
        type:String,
        default:null
    },
    email:{
        type:String,
        default:null,
        trim:true,
        lowercase:true,
        validate:{
            validator:function(v){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message : props => `${props.value} is not a valid email`
        }
    },
    password :{
        type:String,
        default:null
    },
    show_password:{
        type:Object,
        default:null, 
        hidden:true
    },
    company_name:{
        type:String,
        default:null
    },
    address:{
        type:String,
        default:null
    },
    mobile:{
        type:String,
        default:null
    },
    mobile_code:{
        type:String,
        default:null
    },
    mobile_s_name:{
        type:String,
        default:null
    },
     
    term_n_condition:{
        type:String,
        default:null
    },
    lastloginTimeDate:{
        type:Date,
    },
    gender:{
        type:String,
        default:null
    }
},{timestamps:true})


export const userModal = mongoose.models.Consumer || mongoose.model("Consumer", userSchema)


const companyDetailsSchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"Consumer",
        required:[true, "user id is required"]
    },
    company_name:{
        type:String,
        default:null
    },
    country:{
        type:String,
        default:null
    },
    role_buyer_seller:{
        type:String,
        default:null
    },
    role_consumer_business:{
        type:String,
        default:null
    },
    tax_id:{
        type:String,
        default:null
    }, 
    
    address:{
        type:String,
        default:null
    },
    website:{
        type:String,
        default:null
    }, 
    established_year:{
        type:String,
        default:null
    }, 
},{timestamps:true})

export const userCompanyModal = mongoose.models.Consumer_company_detail || mongoose.model("Consumer_company_detail", companyDetailsSchema)


const userAddress = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"Consumer",
        required:[true, "user id is required"]
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

    

    // biiling details
    b_first_name:{
        type:String,
        default:null
    },
    b_first_name:{
        type:String,
        default:null
    },
    b_last_name:{
        type:String,
        default:null
    },
    b_email:{
        type:String,
        default:null
    },
    b_company_name:{
        type:String,
        default:null
    },
    b_country:{
        type:String,
        default:null
    },
    b_address:{
        type:String,
        default:null
    },
    b_city:{
        type:String,
        default:null
    },
    b_state:{
        type:String,
        default:null
    },
    b_zipcode:{
        type:String,
        default:null
    }, 
    b_phone_number:{
        type:String,
        default:null
    }
}, {timestamps:true})

export const userAddressModel = mongoose.models.UserAddess || mongoose.model("UserAddess", userAddress)
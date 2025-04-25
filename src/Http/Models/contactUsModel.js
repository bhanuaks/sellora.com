import mongoose from 'mongoose';

const { Schema } = mongoose; 


const contactUsSchema = new Schema({

    name:{
        type:String,
        required:[true, "Name is required"]
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
    mobile:{
        type:String,
        //required:[true, "Mobile is required"]
    },
    subject:{
        type:String,
        //required:[true, "Mobile code is required"]
    },
    feedback:{
        type:String,
        //required:[true, "Country name is required"]
    },
    
    message:{
        type:String,
        //required:[true, "Country is required"]
    },
    mobile_code:{
        type:String,
        //required:[true, "Mobile code is required"]
    },
    country_s_name:{
        type:String,
        //required:[true, "Country name is required"]
    },
    
   


    
},{timestamps:true})


export const ContactUsModel = mongoose.models.contact_us_front || mongoose.model("contact_us_front", contactUsSchema)
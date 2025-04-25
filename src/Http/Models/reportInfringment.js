import mongoose from 'mongoose';

const { Schema } = mongoose; 


const reportInfringementSchema = new Schema({

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
    address:{
        type:String,
        //required:[true, "Mobile code is required"]
    },
    ipDescription:{
        type:String,
        //required:[true, "Country name is required"]
    },
    
    infringementLocation:{
        type:String,
        //required:[true, "Country is required"]
    },
    goodFaith:{
        type:String,
        //required:[true, "Country is required"]
    },
    accuracy:{
        type:String,
        //required:[true, "Country is required"]
    },
    signature:{
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


export const ReportInfringementModel = mongoose.models.report_infringement || mongoose.model("report_infringement", reportInfringementSchema)
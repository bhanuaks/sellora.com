const { Schema, default: mongoose } = require("mongoose");


const variantSchema = new Schema({
    variant_name:{
        type:String,
        required:[true, "Variant Name is required."]
    },
    select_value:{
        type:Array, 
    },
    status:{
        type:Number,
        enum:[0,1],
        default:1
    }

}, {timestamps:true})

export const variantModel = mongoose.models.Variant || mongoose.model("Variant", variantSchema)
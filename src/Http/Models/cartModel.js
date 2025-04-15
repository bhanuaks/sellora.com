const { Schema, default: mongoose } = require("mongoose");


const cartSchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"Consumer"
    },
    product_id:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    variant_id:{
        type:mongoose.Types.ObjectId,
        ref:"ProductVariant"
    },
    product_name:{
        type:String, 
    },
    quantity:{
        type:Number, 
        default:1 
    }, 
})


export const cartModel = mongoose.models.Cart || mongoose.model("Cart",cartSchema);
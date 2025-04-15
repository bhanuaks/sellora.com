const { Schema, default: mongoose } = require("mongoose");


const productReviewScema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"Consumer",
        require:[true, "user id required"]
    },
    product_id:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    variant_id:{
        type:mongoose.Types.ObjectId,
        ref:"ProductVariant",
        default: null, 
        required: false  
        
    },
    title:{
        type:String,    
    },
    star:{
        type:Number,    
    },
    files:{
        type:Array, 
    },
    message:{
        type:String,  
    }, 
},{timestamps:true})


export const ProductReviewModal = mongoose.models.ProductReview || mongoose.model("ProductReview", productReviewScema);
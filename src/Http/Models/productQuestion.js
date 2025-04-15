const { Schema, default: mongoose } = require("mongoose");


const productQuestionScema = new Schema({
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
    question:{
        type:String,    
    },
    answer:{
        type:String,    
    },
   
},{timestamps:true})


export const ProductQuestionModal = mongoose.models.ProductQuestion || mongoose.model("ProductQuestion", productQuestionScema);
const { Schema, default: mongoose } = require("mongoose");

const wishlistSchema = new Schema({
    product_id:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:[true, "product id is required"]
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"Consumer",
        required:[true, "user id is required"]
    },
    variant_id:{
        type:mongoose.Types.ObjectId,
        ref:"ProductVariant",
        required:[true, "variant id is required"]
    },
},{timestamps:true})


export const wishlistModel = mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema)
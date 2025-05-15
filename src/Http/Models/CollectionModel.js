const { Schema, default: mongoose } = require("mongoose");


const collectionSchema = new Schema({
    name:{
        type:String,
        require:[true, "Name is required"]
    },
    slug:String,
    productIds: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Product' 
    }],
    ShowInNav: {
        type: Boolean,
        default: false
    }

}, {timestamps:true})

export const collectionModal = mongoose.models.Collection || mongoose.model("Collection", collectionSchema)
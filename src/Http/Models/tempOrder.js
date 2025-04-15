const { Schema, default: mongoose } = require("mongoose");


const tempOrderSchema = new Schema({
    temp_order_id:String,
    products:Array,
    addresss:Object,
    amountData:Object,
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"Consumer"
    }
},{timestamps:true});

export const tempOrderModel = mongoose.models.TempOrder || mongoose.model("TempOrder", tempOrderSchema)
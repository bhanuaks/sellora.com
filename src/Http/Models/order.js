const { Schema, default: mongoose } = require("mongoose");


const orderSchema = new Schema({
    order_id:{
        type:String,
        required:[true, "order id is mandatory"]
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"Consumer"
    },
    total_price:{
        type:Number,
        required:true,
        default:0
    },
   
    shipping_charge:{
        type:Number, 
        default:0
    },
    coupan_name:{
        type:String
    },
    coupon_discount:{
        type:Number, 
        default:0
    },
    threshold_discount:{
        type:Number, 
        default:0
    },
    grand_total:{
        type:Number, 
        default:0,
        required:true
    },
    payment_type:{
        type:String, 
    },
    payment_status:{
        type:Number,
        enum:[0,1,2,3,4], // 1=>paid, 0=>failed, 3=>Refunded, 4=> Void, 2=>Pending
        default:2
    },
    currency:String,
    order_status:{
        type:String,
        default:"Placed"
    },
    transaction_id:{
         type:String,
        default:null
    },
    order_note:String

},{timestamps:true})


export const orderModel =  mongoose.models.Order || mongoose.model('Order', orderSchema) 


const orderProductSchema = new Schema({
    order_id:{
        type:String,
        required:[true, "order id is mandatory"]
    },
    sub_order_id:{
        type:String,
        required:[true, "sub order id is mandatory"]
    },
    mongoose_order_id:{
        type:mongoose.Types.ObjectId,
        ref:"Order",
        required:true
    },
    product_id:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:[true, "Product Id is required"]
    },
    product_name:{
        type:String,
        required:[true, "Product Name is required"]
    },
    model_name:{
        type:String,
        default:null
    },
    model_number:{
        type:String,
        default:null
    },
    description:{
        type:String, 
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"Consumer"
    },
    seller_id:{
        type:mongoose.Types.ObjectId,
        ref:"Sellor", 
        default:null
    },
    variants:{
        type:Object,
        default:null
    },
    sku:{
        type:String, 
    },
    sin:{
        type:String, 
    },
    variant_id:{
        type:mongoose.Types.ObjectId,
        ref:"ProductVariant", 
        default:null
    },
    quantity:{
        type:Number,
        required:true
    },
     
    price:{
        type:Number,
        required:true
    },
    discount_amount:{
        type:Number,
        default:0
    }, 
    total_price:{
        type:Number, 
    },
    currency:String,
    order_status:{
        type:Number,
        default:0,
         enum:[0,1,2,3,4,5,6,7] 
         //0=>Pending, 1=> confirmed, 2=>shipped, 3=> out of delivery, 4=> Deliverd, 5=> Canceled, 6=>Refund, 7=> Cancel Request,
    },
    image:String,
 
}, {timestamps:true})


export const orderProductModel = mongoose.models.OrderProduct || mongoose.model("OrderProduct", orderProductSchema)

 


const orderItemStatusHistrySchema = new Schema({
    orderItemId:{
        type:mongoose.Types.ObjectId,
        ref:"OrderProduct"
    },
    status:Number, //0=>Pending, 1=> confirmed, 2=>shipped, 3=> out of delivery, 4=> Deliverd, 5=> Canceled, 6=>Refund, 7=> Cancel Request,
    reason:String,
    remarks:String,
    trakingDetails:Array,

    // this field 
    excluding:Number,
    Including:Number,
    refund_amount:Number,
    refund_full_amount:String,

},{timestamps:true})


export const orderItemStatusHistryModal = mongoose.models.OrderItemStatusHistry || mongoose.model('OrderItemStatusHistry', orderItemStatusHistrySchema);





const orderIdSchema = new Schema({
    id:Number,
    count:{
        type:Number,
        Default:1
    }
},{timestamps:true})


export const orderCountModel = mongoose.models.orderCount || mongoose.model('orderCount', orderIdSchema);

 
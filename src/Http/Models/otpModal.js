const { Schema, default: mongoose } = require("mongoose");

const otpSchema = new Schema({
    otp:String,
    otp_for:String,
    username:String,
    time:Number
},{timestamps:true})

export const otpModal = mongoose.models.OtpData || mongoose.model("OtpData", otpSchema)
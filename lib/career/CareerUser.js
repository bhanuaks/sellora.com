import mongoose from "mongoose";

const careerUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: {
    type: String,
    enum: ["Active", "InActive"],
    default: "Active",
  },
}, { timestamps: true, collection: "careerusers" });


const CareerUser = mongoose.models.CareerUser || mongoose.model("CareerUser", careerUserSchema);

export default CareerUser;
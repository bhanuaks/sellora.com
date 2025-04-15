import { responseFun } from "@/Http/helper"
import { userAddressModel, userCompanyModal, userModal } from "@/Http/Models/userModel"
import mongoose from "mongoose"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')
    const withData = searchParams.get('withData')
    try{
        const user = await userModal.findById(userId)
        const company =await userCompanyModal.findOne({user_id: new mongoose.Types.ObjectId(userId)})
        let address = {}
        if(withData == "address"){
            address= await userAddressModel.findOne({
                user_id:new mongoose.Types.ObjectId(userId)
            })
        }
        const returnData = {
                            ...user.toObject(),
                            company,
                        }
        
        return responseFun(true, {user:returnData, address}, 200)

    }catch(error){
        return responseFun(false, {error}, 401)
    }
 }
import { getUserByToken } from "@/Http/getUserHelper";
import { responseFun } from "@/Http/helper"
import { userAddressModel, userCompanyModal, userModal } from "@/Http/Models/userModel"
import mongoose from "mongoose"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    // const userToken = request.headers.get('user-token');
    
    const authHeader = request.headers.get('Authorization');
    const userToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null; 
    if(!userToken){
        return responseFun(false, { error: 'Unauthorized user' }, 403) 
    } 

    const user = getUserByToken(userToken)
    const userId = user?._id
    const withData = searchParams.get('with')

    try{
        const user = await userModal.findById(userId)
        if(!user){
            return responseFun(false, { error: 'user not found' }, 404) 
        }
        const company = await userCompanyModal.findOne({user_id: new mongoose.Types.ObjectId(userId)})
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
        return responseFun(false, {error:error.message}, 401)
    }
 }


 export async function POST(params) { 
    return responseFun(false, "", 200)
 }
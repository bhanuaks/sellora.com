import { encryptText, isEmpty, responseFun } from "@/Http/helper";
import { userCompanyModal, userModal } from "@/Http/Models/userModel";
// import { userModal } from "@/Http/Models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import { connectDb } from "../../../../../lib/dbConnect";
import { NextResponse } from "next/server";
import { updateCartWhenLogin } from "../user-login/verify-user-login-otp/route";


export async function POST(request) {
   
    connectDb();

    const {

        full_name,
        country,
        role_buyer_seller,
        role_consumer_business,
        tax_id,
        email,
        password ,
        confirm_password,
        company_name,
        address,
        mobile,
        mobile_code,
        mobile_s_name,
        otp,
        term_n_condition,
        cartData

    } = await request.json();

         const errors = {};
        if(isEmpty(full_name))errors.full_name = `name is required.`
        if(isEmpty(country))errors.country = `country is required.`
        if(isEmpty(email))errors.email = `email is required.`
        if(isEmpty(password))errors.password = `password is required.`
        if(isEmpty(confirm_password))errors.confirm_password = `confirm password is required.`
        if(isEmpty(address))errors.address = `address is required.`
        if(isEmpty(mobile))errors.mobile = `tel number is required.`
        if(isEmpty(term_n_condition))errors.term_n_condition = `Please accept term and condition.`
        if(isEmpty(company_name))errors.company_name = `company name is required.`
        if(isEmpty(otp))errors.otp = `required.`

        if(password && password.length < 8){ 
            errors.password = `password must be 8 min characters.` 
        }else if(password && confirm_password && password != confirm_password){
             errors.confirm_password = `password and confirm password must be same password.` 
        }


        if(Object.keys(errors).length>0){
             return responseFun(false, {errors, status_code:400}, 200); 
        } 

    try{

        const mobileExiste =  await userModal.findOne({mobile:mobile});
        const emailExiste =  await userModal.findOne({email:email});
        if(mobileExiste){
            errors.mobile = `this number already registered.`
            return responseFun(false, {errors, status_code:400}, 200); 
        }
        if(emailExiste){
            errors.email = `this email already registered.`
            return responseFun(false, {errors, status_code:400}, 200); 
        }

        const otpDataString = request.cookies.get('user_otp')
        const otpData = otpDataString ? JSON.parse(otpDataString.value) : null;
        if(!otpData){
            errors.otp = "invalid otp"
            return responseFun(false,{errors, status_code:400},200)
        }

        const hash_password = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT))
        if(otpData.otp_for == "user_otp" && otpData.otp == otp){

            const user = await userModal.create({
                full_name,
                country,
                role_buyer_seller,
                role_consumer_business,
                tax_id,
                email,
                password :hash_password,
                show_password: encryptText(password),
                company_name,
                address,
                mobile,
                mobile_code,
                mobile_s_name, 
                term_n_condition
            })


           
                const company = await userCompanyModal.create({
                    user_id:user._id,
                    company_name,
                    address,
                    tax_id,
                    role_consumer_business,
                    role_buyer_seller,
                    country
                })
                
             
            const cartItem = await updateCartWhenLogin(cartData, user)
            const token = jwt.sign({
                user:user
            }, process.env.JWT_SECRET)
             const response = NextResponse.json({status:200, cartItem, message:"Account has been created."},{status:200})
             response.cookies.set('userAuthToken',token,{
                expireIn:'1d'
             })

             response.cookies.set('user_otp','', {
                maxAge:"0"
             })
             return response;
        }else{ 
            errors.otp = "invalid otp1"
            return responseFun(false,{errors, status_code:400},200) 
        } 
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200);
    }

}
import { isEmpty, responseFun } from "@/Http/helper";
import { userModal } from "@/Http/Models/userModel";
import { NextResponse } from "next/server";


export async function POST(request) {
    const {searchParams} = new URL(request.url)
    const resend = searchParams.get('searchParams');
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
        term_n_condition

    } = await request.json();

         const errors = {};
        if(isEmpty(full_name))errors.full_name = `name is required.`
        if(isEmpty(country))errors.country = `country is required.`
        if(isEmpty(email))errors.email = `email is required.`
        if(isEmpty(password))errors.password = `password is required.`
        if(isEmpty(confirm_password))errors.confirm_password = `confirm password is required.`
        if(isEmpty(address))errors.address = `address is required.`
        if(isEmpty(company_name))errors.company_name = `company name is required.`
        if(isEmpty(mobile))errors.mobile = `tel number is required.`
        if(isEmpty(term_n_condition))errors.term_n_condition = `Please accept term and condition.`

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
         
        const new_otp = 123456  
        const subject = "Registration OTP";
        const message = `<p>Registration OTP is ${new_otp}. This otp valid for 5 minutes.</p>` 
          
        return sentOtoFun(mobile, new_otp, subject, message);  
         
    }catch(error){
        console.log(error);
        return responseFun(false, {error}, 200);
    }

}


export function sentOtoFun(mobile, otp, subject, message){
    const new_otp = otp  
    const expirationTime =  Date.now() + (5 * 60 * 1000);
    const otpData = {
        otp:new_otp,
        otp_for:"user_otp",
        time: new Date().getTime(), 
       
    } 
    const response = NextResponse.json({
        message:"Login Success",
        status:true, 
        expirationTime
    },  { status: 200 }); 
    response.cookies.set('user_otp', JSON.stringify(otpData), {
        maxAge: 5 * 60,
        // httpOnly: true,  
        // secure: true,
    }); 

    return response; 
}
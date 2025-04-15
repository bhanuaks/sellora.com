import { decodeJwt } from "@/Http/helper";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function getLoginUser() {  
    try {
        const cookieStore = cookies();
        const userToken = cookieStore.get("userAuthToken")?.value;

        if (!userToken) {
            return null; // Return `null` if no token is found
        }

        // Verify JWT token safely
        const decodedData = jwt.verify(userToken, process.env.JWT_SECRET);
        return decodedData.user; 
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null; // Return `null` instead of an error message
    }
}

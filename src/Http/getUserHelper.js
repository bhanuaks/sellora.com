import { decodeJwt } from "@/Http/helper"; 
import jwt from "jsonwebtoken";

export function getUserByToken(userToken) {  
    try { 
        if (!userToken) {
            return null;  
        }

        // Verify JWT token safely
        const decodedData = jwt.verify(userToken, process.env.JWT_SECRET);
        return decodedData.user; 
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null; // Return `null` instead of an error message
    }
}
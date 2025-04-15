"use client";
import { decodeJwt } from "@/Http/helper"; 
import { createContext, useEffect, useState } from "react";

 
export const AppContext = createContext();

 
export const AppProvider = ({ children }) => {
    const [globalData, setGlobalData] = useState({
        user: null,
        sellor: null,
        admin:null,
    });

    useEffect(() => {
        
        const sellorToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('sellerAuthToken='))?.split('=')[1];

        const userToken = document.cookie.split("; ").find((row)=>row.startsWith('userAuthToken'))?.split("=")[1];
        const adminToken = document.cookie.split("; ").find((row)=>row.startsWith('adminAuthToken'))?.split("=")[1];
        if (sellorToken) {
            try {
                // Decode the JWT and set sellor data
                const sellorData = decodeJwt(sellorToken);
                setGlobalData((previousData) => ({
                    ...previousData,
                    sellor: sellorData.seller,
                }));
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        }

        if (userToken) {
            try {
                // Decode the JWT and set User data
                const userData = decodeJwt(userToken);
                setGlobalData((previousData) => ({
                    ...previousData,
                    user: userData.user,
                }));
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        }

        if (adminToken) { 
            try {
                // Decode the JWT and set User data
                const adminData = decodeJwt(adminToken);
                setGlobalData((previousData) => ({
                    ...previousData,
                    admin: adminData.admin,
                }));
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        }
    }, []);

    return (
        <AppContext.Provider value={{ globalData, setGlobalData }}>
            {children}
        </AppContext.Provider>
    );
};

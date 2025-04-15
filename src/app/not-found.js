"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

const Page = () => {
    const currentPath = usePathname()
    if(currentPath.startsWith('/sellor/al')){ 
        return (
            <>
            {currentPath.startsWith('/sellor/al') && (
                        <html> 
                            <body> 
                                <div className="flex flex-col items-center justify-center h-screen">
                                    <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                                    <p className="text-lg mt-4">The page you are looking for does not exist.</p>
                                    <a href="/" className="mt-6 text-blue-600 hover:underline">Go back to Home</a>
                                </div>
                            </body>
                        </html>
                    )}
            </>
            )    
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
                                    <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                                    <p className="text-lg mt-4">The page you are looking for does not exist.</p>
                                    <a href="/" className="mt-6 text-blue-600 hover:underline">Go back to Home</a>
                                </div>
    )

 
    
   
}

export default Page
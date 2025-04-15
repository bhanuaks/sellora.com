export async function apiRequest(url, method = "GET", body = null, headers = {}) {
    try {
        const options = { method, headers }; 
        if (body) {
            if (body instanceof FormData) {
                options.body = body; 
            } else {
                options.body = JSON.stringify(body);
                options.headers["Content-Type"] = "application/json";
            }
        } 
        const response = await fetch(url, options); 
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong");
        } 
        return await response.json();  
    } catch (error) {
        console.error("API Request Error:", error.message);
        return { success: false, error: error.message };
    }
}

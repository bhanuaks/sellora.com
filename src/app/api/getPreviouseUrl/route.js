import { cookies } from 'next/headers';


export const  getPreviouseUrl= ()=>{

    const cookieStore = cookies();
    const requestUrl = cookieStore.get("requestUrl")?.value;
    return requestUrl
}
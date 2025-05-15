import { responseFun } from "@/Http/helper";
import Locations from "../../../../../../lib/career/Locations";


export async function GET(request) {
    
    try{
        const locations = await Locations.find({"status":"Active"}).sort({"name":1});
        return responseFun(true, {locations}, 200)

    }catch(error){
        console.log(error.mesage);
        return responseFun(false, {error:error.message}, 500)
    }
}
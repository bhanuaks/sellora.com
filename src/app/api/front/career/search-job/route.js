import { responseFun } from "@/Http/helper";
import CareerJob from "../../../../../../lib/career/CareerJob";
import Locations from "../../../../../../lib/career/Locations";
import mongoose from "mongoose";



export async function GET(request) {
    
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get("searchText") || "";
    const location_id = searchParams.get("location") || "";

    const jobQuery = {"status":"Active"}
    if (searchText) {
        jobQuery.jobTitle = { $regex: searchText, $options: "i" };
    }

     if (location_id) { 
        jobQuery.locationId = new mongoose.Types.ObjectId(location_id);
    }
    
    try{
        const jobs = await CareerJob.find(jobQuery).populate("categoryId slug")
        .select("_id slug jobTitle")
         return responseFun(true, {jobs}, 200);
    }catch(error){
        console.log(error);
        return responseFun(false, error.message, 500);
    }
}
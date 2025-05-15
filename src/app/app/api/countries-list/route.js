import {  countriesList, nationalities } from "@/Http/citizenList";
import { responseFun } from "@/Http/helper";


export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get("name") || null;
    let data = null;
    console.log(name);
    if(name == "natianality"){
        data = nationalities;
    }else{
        data = countriesList;
    }
    return responseFun(true, data, 200)
}

export async function POST(params) {
    return responseFun(false,"", 500)
}
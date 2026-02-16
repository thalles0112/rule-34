import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    
    
    const tag = req.url.split('?')[1].split('&')[0].split('=')[1]
    console.log(req.url.split('?')[1].split('&')[0].split('=')[1])

    try{
        
        const response = await axios.get(`https://api.rule34.xxx/autocomplete.php?q=${tag}&json=1&api_key=321207195b473b6ba36d87bd625e9eb93995b2fc8f04d8ef326bbb7512a6a06592ee97b59a0d932abff053ed19ad9a486a9ea56c77caca3ffc2d74ea1cc82342&user_id=4475901`)
        
        
        return NextResponse.json({success:true, data:response.data}, {status:200})
        

    }catch(e){
        return NextResponse.json({success:false, msg:e}, {status:401})
    }
    
}
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    let response
    try{
        const {username, password, email} = await req.json()
        console.log({username, password, email})
        /* */
        response = await axios.post(`${process.env.BACKEND_URL}/api/auth/register/`, {username:username, password:password, email:email})

        if(response.status==201){
            return NextResponse.json({success:true}, {status:200})
        }

    }catch(e){
        return NextResponse.json({success:false, msg:'Already used email or missing field(s)'}, {status:400})
    }

    
    

    

    
}
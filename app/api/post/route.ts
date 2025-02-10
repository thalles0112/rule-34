import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const access = (await cookies()).get('access')?.value // Pegando apenas o valor do cookie
        
        if (!access) {
            return NextResponse.json({ success: false, msg: "No access token" }, { status: 401 })
        }

        const body = await req.formData()
        console.log(body)

        // Enviando a requisição corretamente
        const response = await axios.put(
            `${process.env.BACKEND_URL}/api/authors/${body.get('author_id')}/`, 
            body, // O body vai aqui, como segundo argumento
            {
                headers: {
                    "Authorization": `Bearer ${access}`
                }
            }
        )

        console.log(response)

        if (response.status == 200) {
            return NextResponse.json({ success: true, data: response.data }, { status: 200 })
        }

    } catch (e: any) {
        console.error("Erro na requisição:", e.response?.data || e.message)

        return NextResponse.json(
            { success: false, msg: e.response?.data || e.message }, 
            { status: e.response?.status || 400 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const access = (await cookies()).get('access')?.value // Pegando apenas o valor do cookie
        
        if (!access) {
            return NextResponse.json({ success: false, msg: "No access token" }, { status: 401 })
        }

        const body = await req.formData()
        console.log(body)

        // Enviando a requisição corretamente
        const response = await axios.put(
            `${process.env.BACKEND_URL}/api/user`, 
            body, // O body vai aqui, como segundo argumento
            {
                headers: {
                    "Authorization": `Bearer ${access}`
                }
            }
        )

        console.log(response)

        if (response.status == 200) {
            return NextResponse.json({ success: true, data: response.data }, { status: 200 })
        }

    } catch (e: any) {
        console.error("Erro na requisição:", e.response?.data || e.message)

        return NextResponse.json(
            { success: false, msg: e.response?.data || e.message }, 
            { status: e.response?.status || 400 }
        )
    }
}

export async function GET(req:Request) {
    
    const access = (await cookies()).get('access')

    try{
        
        const response = await axios.get(`${process.env.BACKEND_URL}/api/post`,  {headers:{"Authorization": `Bearer ${access?.value}`}})

        if(response.status==200){
            return NextResponse.json({success:true, data:response.data}, {status:200})
        }

    }catch(e){
        return NextResponse.json({success:false, msg:e}, {status:401})
    }
    
}
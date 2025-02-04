'use client'
import Header from "@/app/components/ui/header/header"

import Footer from "../components/ui/footer"
import LoginForm from "../components/ui/login-form"
import Link from "next/link"


export default function Account(){
 

    return (
        <div className="page-config">
            <title>
                Account | NSFW HUB.net
            </title>
        
            <Header/>
            <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8 page-config--header">
                
                <LoginForm onLogin={()=>{}}/>
                <Link className="text-center border rounded-md w-44 justify-between items-center mx-auto p-4 flex" href={'/account/folders'}>My Folders <div>{'>'}</div></Link>
            </main>

            

            <Footer/>
        </div>
    )
}
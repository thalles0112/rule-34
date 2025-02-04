'use client'
import Header from "@/app/components/header/header"

import Footer from "../components/footer"
import LoginForm from "../components/login-form"


export default function Account(){
 

    return (
        <div className="page-config">
        
            <Header/>
            <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8 page-config--header">
                <h2 className="text-center w-full mt-10">Sign in</h2>
                <LoginForm onLogin={()=>{}}/>
            </main>
    

            <Footer/>
        </div>
    )
}
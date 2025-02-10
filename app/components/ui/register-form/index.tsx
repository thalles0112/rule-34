'use client'
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import { FormEvent, useEffect, useState, useRef } from "react"
import api from "../../services/backend";
import Link from "next/link";
import { useRouter } from "next/navigation";

type error = {
    msg:string
}

interface CustomFormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const RegisterForm: React.FC<CustomFormProps> = ({ className, ...props }) => {
    const [recaptchaToken, setRecaptchaToken] = useState('')
    const formRef = useRef<HTMLFormElement>(null)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const router = useRouter()
    const [error, setError] = useState<error>({msg:''})
    
    const handleLogin = async(e:FormEvent)=>{
        e.preventDefault()

        console.log('olha, ate aq foi')

        if (!formRef.current) return;
        
        const formdata = new FormData(formRef.current)

        const data = Object.fromEntries(formdata.entries())

        


        const res = await fetch('/api/register', {method:'POST', body: JSON.stringify({username:data.username, email:data.email, password:data.password})})
        
        if(res.status==200){
            router.push('/login?msg=success')
        }
        else{
            const rjson = await res.json()
            console.log(res)
            setError(rjson)
        }

        

        
    }
  return (
      <form ref={formRef} {...props} className="mt-10 max-sm:w-11/12 rounded-md w-fit mx-auto p-10 gap-y-4 flex flex-col items-center" onSubmit={handleLogin} id="login-form">
                   <span className="text-red-400"> {error.msg}</span>
                    <h2 className="text-center w-full mt-10">Register</h2>
                    <div className="flex flex-col w-full">
                            <label htmlFor="email">Email</label>
                            <input name="email" className="border-b w-full p-1 outline-none text-sm mt-2 bg-transparent text-gray-600 dark:text-gray-300"/>
                    </div>
                    
                    
                    <div className="flex flex-col w-full">
                            <label htmlFor="username">Username</label>
                            <input autoCapitalize="false" name="username" className="border-b w-full p-1 outline-none text-sm mt-2 bg-transparent text-gray-600 dark:text-gray-300"/>
                    </div>

                    <div className="flex flex-col relative w-full">
                        <label htmlFor="password">Password</label>
                        <input autoCapitalize="false" type={passwordVisible?"text":"password"} name="password" className="border-b outline-none p-1 text-sm mt-2 bg-transparent text-gray-600 dark:text-gray-300"/>
                        <button className="absolute top-10 accent-color right-4" onClick={()=>{setPasswordVisible(!passwordVisible)}} type="button">{passwordVisible?<IoEyeOutline color="purple"/>:<IoEyeOffOutline color="purple"/>}</button>
                    </div>

                    <ReCAPTCHA 
                            
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || ''} 
                            onChange={(token) => setRecaptchaToken(token || '')}
                        />
                    
                    <div>
                        <button className="active:bg-white dark:bg-slate-800 bg-neutral-200 active:bg-opacity-60 p-4 w-full" type="submit">Register</button>
                        <Link href={'/login'} className="active:bg-white w-full mt-4 text-sm text-center block">Go back to login</Link>
                    </div>
                     
                </form>
    
  );
};

export default RegisterForm;
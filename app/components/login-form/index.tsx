import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import { FormEvent, useEffect, useState, useRef } from "react"

interface CustomFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    onLogin: ()=>void
}

const LoginForm: React.FC<CustomFormProps> = ({ onLogin, className, ...props }) => {
    const [recaptchaToken, setRecaptchaToken] = useState('')
    const formRef = useRef<HTMLFormElement>(null)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [register, setRegister] = useState(false)
    
    
    const handleLogin = async(e:FormEvent)=>{
        e.preventDefault()

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
            username: e.target.username? e.target.username.value:''
        }


        if(register){
            const res = await axios.post('/api/auth/login', JSON.stringify(formData))
        }else{
            const res = await axios.post('/api/auth/register', JSON.stringify(formData))
        }

        

        
    }
  return (
      <form {...props} className="border max-sm:w-11/12 w-fit mx-auto p-10 gap-y-10 flex flex-col items-center" onSubmit={handleLogin} id="login-form">
                    <h2 className="text-center w-full mt-10">{register?'Sign up':'Sign in'}</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="email">Email</label>
                        <input name="email" className="border-b w-full outline-none text-sm mt-2 bg-transparent text-gray-600 dark:text-gray-300"/>
                    </div>
                    
                    {
                        register
                        ?<div className="flex flex-col w-full">
                            <label htmlFor="username">Username</label>
                            <input name="username" className="border-b w-full outline-none text-sm mt-2 bg-transparent text-gray-600 dark:text-gray-300"/>
                        </div>
                        
                        :<div></div>
                    }
                    

                    <div className="flex flex-col relative w-full">
                        <label htmlFor="password">Password</label>
                        <input type={passwordVisible?"text":"password"} name="password" className="border-b outline-none text-sm mt-2 bg-transparent text-gray-600 dark:text-gray-300"/>
                        <button className="absolute top-8 right-4" onClick={()=>{setPasswordVisible(!passwordVisible)}} type="button">{passwordVisible?<IoEyeOutline/>:<IoEyeOffOutline/>}</button>
                    </div>

                    <ReCAPTCHA 
                            
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || ''} 
                            onChange={(token) => setRecaptchaToken(token || '')}
                        />
                    
                    <div>
                        <button className="active:bg-white dark:bg-slate-800 bg-neutral-200 active:bg-opacity-60 p-4 w-full" type="submit">{register?"Register":"Login"}</button>
                        <button type="button" onClick={()=>{setRegister(!register)}} className="active:bg-white w-full mt-4 text-sm">{register?"Back to login":"Or register"}</button>
                    </div>
                     
                </form>
    
  );
};

export default LoginForm;
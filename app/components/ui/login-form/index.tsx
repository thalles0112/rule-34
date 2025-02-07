"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";

function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [registrationSucess, setRegistrationSucess] = useState('')
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const msg = useSearchParams().get('msg')

  useEffect(()=>{
    if(msg){
        setRegistrationSucess(msg)
    }
    
  },[])
  
  

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!formRef.current) return;
    
    const formdata = new FormData(formRef.current);
    const data = Object.fromEntries(formdata.entries());

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: data.username, password: data.password }),
    });

    if (response.ok) {
      router.push("/account"); // Redireciona após login
    } else {
      setError("Invalid Credentials.");
    }
  }

  return (
    <form ref={formRef} className="border mt-10 w-fit mx-auto p-10 gap-y-3 flex flex-col items-center" onSubmit={handleLogin}>
        <span className="text-sm text-green-300">{registrationSucess?'Registration success, now proceed to login':''}</span>
      <h2 className="text-center w-full mt-5">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="flex flex-col w-full">
        <label htmlFor="username">Username</label>
        <input name="username" className="border-b p-1 w-full outline-none text-sm mt-2 bg-transparent text-gray-600 dark:text-gray-300"/>
      </div>
      
      <div className="flex flex-col relative w-full">
        <label htmlFor="password">Password</label>
        <input type={passwordVisible ? "text" : "password"} name="password" className="border-b p-1 outline-none text-sm mt-2 bg-transparent text-gray-600 dark:text-gray-300"/>
      
        <button className="absolute top-8 right-4" onClick={() => setPasswordVisible(!passwordVisible)} type="button">
          {passwordVisible ? <IoEyeOutline/> : <IoEyeOffOutline/>}
        </button>
      </div>
      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || ''} onChange={() => {}} />
      
      <button className="active:bg-white dark:bg-slate-800 bg-neutral-200 active:bg-opacity-60 p-4 w-full" type="submit">
        Login
      </button>
      
      <Link href={'/register'} className="text-sm text-center block mt-4">Or register</Link>
    </form>
  );
}


export default function WrappedLoginForm(){
  return (
    <Suspense>
      <LoginForm/>
    </Suspense>
  )
}

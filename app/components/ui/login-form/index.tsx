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
  const [loading, setLoading] = useState(false)

  const msg = useSearchParams().get('msg')

  useEffect(()=>{
    if(msg){
        setRegistrationSucess(msg)
    }
    
  },[])
  
  

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true)
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
      localStorage.setItem('logged','true')
    } else {
      setError("Invalid Credentials.");
      setLoading(false)
    }

    
  }

  return (
    <form ref={formRef} className="mt-10 w-fit mx-auto p-10 gap-y-3 flex flex-col items-center" onSubmit={handleLogin}>
        <span className="text-sm text-green-300">{registrationSucess?'Registration success, now proceed to login':''}</span>
      <h2 className="text-center w-full mt-5">Login</h2>
      <h3 className="max-w-52">Hi, if you already had an account i'm very sorry, but the database got corrupted and I could not restore it, so i migrated to another one that is safer than previous one. Now it's 100% secure. You can just create another account and your folders will be there</h3>
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="flex flex-col w-full">
        <label htmlFor="username">Username</label>
        <input name="username" className="border-b p-2 w-full outline-none text-sm mt-2 bg-transparent text-gray-600 dark:text-gray-300"/>
      </div>
      
      <div className="flex flex-col relative w-full">
        <label htmlFor="password">Password</label>
        <input type={passwordVisible ? "text" : "password"} name="password" className="border-b p-2 outline-none text-sm mt-2 bg-transparent text-gray-600 dark:text-gray-300"/>
      
        <button className="absolute top-8 right-4" onClick={() => setPasswordVisible(!passwordVisible)} type="button">
          {passwordVisible ? <IoEyeOutline/> : <IoEyeOffOutline/>}
        </button>
      </div>
      <Link className="text-sm text-left w-full" href={'/forgot-password'}>Forgot password?</Link>
      
      
      <button className="active:bg-white dark:bg-slate-800 bg-neutral-200 active:bg-opacity-60 p-4 w-full" type="submit">
        {loading
        ?"Logging in..."
        :<span>Login</span>
        }
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

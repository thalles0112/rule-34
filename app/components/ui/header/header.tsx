'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Script from "next/script"
import React, { FormEvent, useState, useEffect, useRef , useCallback} from "react"
import { IoSearchOutline } from "react-icons/io5"
import './style.css'

interface headerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Header<HTMLElement>(props:headerProps) {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
    const [searchParam, setSearchParam] = useState('')
    const router = useRouter()
    const headerRef = useRef(null)
    const [fixed, setFixed] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [rowing, setRowing] = useState(false)

    function handleSearch(e: FormEvent) {
        e.preventDefault()
        sessionStorage.setItem('q', searchParam)
        router.push('/search/?q=' + searchParam)
    }

    function handleMobileSearch(e: FormEvent) {
        e.preventDefault()
        if (mobileSearchOpen && searchParam.length == 0) {
            setMobileSearchOpen(false)
        } else if (mobileSearchOpen && searchParam.length > 0) {
            sessionStorage.setItem('q', searchParam)
            router.push('/search/?q=' + searchParam)
        } else {
            setMobileSearchOpen(true)
        }
    }

     // Sticky Menu Area
     const onScroll = useCallback(() => {
        const body = document.querySelector('.page-config')
        
        if(body){
            
            if(body.scrollTop < lastScrollY){
                setRowing(true)
            }
            else{
                setRowing(false)
            }

            


            if(body.scrollTop >= 64){
                setFixed(true)
                body.classList.add('pt-16')
            }
            else{
                setFixed(false)
                body.classList.remove('pt-16')
            }


            setTimeout(()=>setLastScrollY(body.scrollTop), 200)
        }
        
        
        
        
    }, []);
  
    useEffect(() => {
      //add eventlistener to window
        const body = document.querySelector('.page-config')
        if(body){
            body.addEventListener("scroll", onScroll);
        }

      
      // remove event on unmount to prevent a memory leak with the cleanup
      return () => {
         body?.removeEventListener("scroll", onScroll);
      }
    }, []);
  

    useEffect(()=>{
        const cachedSearch = sessionStorage.getItem('q') || ''
        setSearchParam(cachedSearch)
    },[])





    return (
        <header
            ref={headerRef}
            className={`${fixed?'is-sticky transition-transform duration-300':'isnt-styicky'} w-full h-16 z-10 dark:bg-black bg-white lg:px-24 max-sm:px-4 sm:px-4 flex items-center justify-between`}
        >
            <Link href={'/'}>
                <img src={'/img/sitelogo.png'} width={462} height={268} className="max-w-20" alt="nsfwhub logo" />
            </Link>

            <form onSubmit={(e) => handleSearch(e)} id='desktop-search' className="border h-10 rounded-md flex overflow-hidden max-sm:hidden">
                <input defaultValue={searchParam} onChange={e => { setSearchParam(e.target.value) }} className="outline-none border-none px-2 text-sm text-gray-600" placeholder="Search" />
                <button name="search" className="flex justify-center items-center border-l px-3 active:opacity-40">
                    <IoSearchOutline />
                </button>
            </form>

            <div className="flex items-center justify-between gap-2">
                <form onSubmit={(e) => handleMobileSearch(e)} id='mobile-search' className={`${mobileSearchOpen ? 'max-sm:border' : ''} w-8/12 ml-auto h-10 rounded-md flex overflow-hidden`}>
                    <input value={searchParam} onChange={e => { setSearchParam(e.target.value) }} className={`outline-none border-none px-2 ${mobileSearchOpen ? 'max-sm:w-full' : 'w-0 hidden'} sm:hidden text-sm text-gray-600`} placeholder="Search" />
                    <button name="search" onClick={(e) => handleMobileSearch(e)} className={`flex justify-center items-center ${!mobileSearchOpen ? 'border rounded-md' : 'border-l'}  py-1 px-2 active:opacity-40 sm:hidden md:hidden lg:hidden`}>
                        <IoSearchOutline size={18} />
                    </button>
                </form>

                <Link href={'/account'}>
                    <div className="flex justify-center items-center border rounded-md p-2 active:opacity-40 w-20">
                        <span className="text-sm">Sign in</span>
                    </div>
                </Link>
            </div>
        </header>
    )
}
'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { IoSearchOutline } from "react-icons/io5"


export default function Header(){
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
    const [searchParam, setSearchParam] = useState('')
    const router = useRouter()


    function handleSearch(e:FormEvent){
        e.preventDefault()
        sessionStorage.setItem('q', searchParam)
        router.push('/search/?q='+searchParam)
    }

    function handleMobileSearch(e:FormEvent){
        e.preventDefault()
        if(mobileSearchOpen && searchParam.length == 0){
            setMobileSearchOpen(false)
            
        }

        else if(mobileSearchOpen && searchParam.length > 0){
            sessionStorage.setItem('q', searchParam)
            router.push('/search/?q='+searchParam)
        }

        else{
            setMobileSearchOpen(true)
        }
        
    }

    return(
        <header className="w-full h-16 z-10 bg-transparent lg:px-24 max-sm:px-4 sm:px-4 flex items-center justify-between">
            <Link href={'/'}>
                <img src={'/img/sitelogo.png'} width={462} height={268} className="max-w-20" alt="nsfwhub logo"/>
            </Link>
            

            
            <form onSubmit={(e)=>handleSearch(e)} id='desktop-search' className="border h-10 rounded-md flex overflow-hidden max-sm:hidden">
                <input defaultValue={searchParam} onChange={e=>{setSearchParam(e.target.value)}} className="outline-none border-none px-2 text-sm text-gray-600" placeholder="Search"/>
                <button name="search" className="flex justify-center items-center border-l px-3 active:opacity-40">
                    <IoSearchOutline/>
                </button>
            </form>

            
            <div className="flex items-center justify-between gap-2">
                
                <form onSubmit={(e)=>handleMobileSearch(e)} id='mobile-search' className={`${mobileSearchOpen?'max-sm:border':''} w-8/12 ml-auto h-10 rounded-md flex overflow-hidden`}>
                    <input value={searchParam} onChange={e=>{setSearchParam(e.target.value)}} className={`outline-none border-none px-2 ${mobileSearchOpen?'max-sm:w-full':'w-0 hidden'} sm:hidden text-sm text-gray-600`} placeholder="Search"/>
                    
                    <button name="search" onClick={(e)=>handleMobileSearch(e)} className={`flex justify-center items-center ${!mobileSearchOpen?'border rounded-md':'border-l'}  py-1 px-2 active:opacity-40 sm:hidden md:hidden lg:hidden`}>
                        <IoSearchOutline  size={18}/>
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
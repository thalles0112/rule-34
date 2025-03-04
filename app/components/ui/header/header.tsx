'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Script from "next/script"
import React, { FormEvent, useState, useEffect, useRef , useCallback} from "react"
import { IoPlayOutline, IoSearchOutline } from "react-icons/io5"
import './style.css'


interface headerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Header<HTMLElement>(props:headerProps) {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
    const [searchParam, setSearchParam] = useState('')
    const router = useRouter()
    const headerRef = useRef(null)
    const mobileInput = useRef<HTMLInputElement>(null)

    
    const [logged, setLogged] = useState(false)

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



    useEffect(()=>{
        const cachedSearch = sessionStorage.getItem('q') || ''
        const isLogged = localStorage.getItem('logged')
        if(isLogged == "true"){
            setLogged(true)
        }
        setSearchParam(cachedSearch)
    },[])


    useEffect(()=>{
        window.addEventListener('searchBarOpen', ()=>{
            if(mobileSearchOpen){
                setMobileSearchOpen(false)
            }
            else{
                setMobileSearchOpen(true)
            }
        })

        return ()=>{
            window.removeEventListener('searchBarOpen', ()=>{})
        }
    },[])


    useEffect(()=>{
        if(mobileSearchOpen){
            
            mobileInput.current && mobileInput.current.focus()
            
            
        }
    },[mobileSearchOpen])



    return (
        <>
        <header
            
            className={`w-full h-16  lg:px-24 max-sm:px-4 sm:px-4 flex items-center justify-between`}
        >
            

            
        </header>

        <header
            ref={headerRef}
            className={`is-sticky  w-full h-16 lg:px-24 max-sm:px-4 sm:px-4 flex items-center justify-between`}
        >
            <div className="flex items-center gap-4">
                <Link href={'/'}>
                    <img src={'/img/sitelogo.png'} width={462} height={268} className="max-w-16" alt="nsfwhub logo" />
                </Link>

                <Link className="max-md:hidden" href={'/quickies'}>
                <div className="flex items-center gap-1">
                   <IoPlayOutline size={18}/> <span className="text-sm">Quickies</span>
                </div>
                </Link>
            </div>

            <form onSubmit={(e) => handleSearch(e)} id='desktop-search' className="border h-10 rounded-md flex overflow-hidden max-sm:hidden">
                <input defaultValue={searchParam} onChange={e => { setSearchParam(e.target.value) }} className="outline-none border-none px-2 text-sm text-gray-600" placeholder="Search" />
                <button id="search-button" aria-label="search" title="search" name="search" className="flex justify-center items-center border-l px-3 active:opacity-40">
                    <IoSearchOutline />
                </button>
            </form>

            <div className="flex items-center justify-between gap-2">
                <form onSubmit={(e) => handleMobileSearch(e)} id='mobile-search' className={`${mobileSearchOpen ? 'max-sm:border' : ''} w-8/12 ml-auto h-10 rounded-md flex overflow-hidden`}>
                    <input ref={mobileInput} value={searchParam} onChange={e => { setSearchParam(e.target.value) }} className={`outline-none border-none px-2 ${mobileSearchOpen ? 'max-sm:w-full -translate-x-0 opacity-100' : 'w-0 translate-x-full opacity-0 -z-10'} transition duration-100 sm:hidden text-sm text-gray-600`} placeholder="Search" />
                    <button id="search-button" aria-label="search" title="search" name="search" onClick={(e) => handleMobileSearch(e)} className={`flex justify-center items-center ${!mobileSearchOpen ? 'border rounded-md' : 'border-l'}  py-1 px-2 active:opacity-40 sm:hidden md:hidden lg:hidden`}>
                        <IoSearchOutline size={18} />
                    </button>
                </form>

                <Link href={'/account'}>
                    <div className="flex justify-center items-center border rounded-md p-2 active:opacity-40 w-20">
                        <span className="text-sm">{logged?'Account':'Sign in'}</span>
                    </div>
                </Link>
            </div>
        </header>
        </>
    )
}
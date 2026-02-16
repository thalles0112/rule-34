'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Script from "next/script"
import React, { FormEvent, useState, useEffect, useRef , useCallback} from "react"
import { IoPlayOutline, IoSearchOutline } from "react-icons/io5"
import './style.css'
import axios from "axios"


interface headerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Header<HTMLElement>(props:headerProps) {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
    const [searchParam, setSearchParam] = useState('')
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
    const router = useRouter()
    const headerRef = useRef(null)
    const mobileInput = useRef<HTMLInputElement>(null)

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchParam(e.target.value)
        
        const timeoutId = setTimeout(async () => {
            if (e.target.value.length > 0) {
                const resp = await axios.get('/api/autocomplete?q=' + e.target.value)
                    .then(res => res.data)
                    setSearchSuggestions(resp.data)
            } else {
                setSearchSuggestions([])
            }

            console.log(searchSuggestions)
        }, 1000)

        return () => clearTimeout(timeoutId)
    }
    
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


    function handleSuggestionClick(suggestion: string) {
        setSearchParam(suggestion)
        setSearchSuggestions([])
        sessionStorage.setItem('q', suggestion)
        router.push('/search/?q=' + suggestion)
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
                <input value={searchParam} onChange={e => { handleInputChange(e) }} className="outline-none border-none px-2 text-sm text-gray-600" placeholder="Search" />
                <button id="search-button" aria-label="search" title="search" name="search" className="flex justify-center items-center border-l px-3 active:opacity-40">
                    <IoSearchOutline />
                </button>
                
            </form>

            <div className="flex items-center justify-between gap-2">
                <form onSubmit={(e) => handleMobileSearch(e)} id='mobile-search' className={`${mobileSearchOpen ? 'max-sm:border' : ''} w-8/12 ml-auto h-10 rounded-md flex overflow-hidden`}>
                    <input ref={mobileInput} value={searchParam} onChange={e => { handleInputChange(e) }} className={`outline-none border-none px-2 ${mobileSearchOpen ? 'max-sm:w-full -translate-x-0 opacity-100' : 'w-0 translate-x-full opacity-0 -z-10'} transition duration-100 sm:hidden text-sm text-gray-600`} placeholder="Search" />
                    <button id="search-button" aria-label="search" title="search" name="search" onClick={(e) => handleMobileSearch(e)} className={`flex justify-center items-center ${!mobileSearchOpen ? 'border rounded-md' : 'border-l'}  py-1 px-2 active:opacity-40 sm:hidden md:hidden lg:hidden`}>
                        <IoSearchOutline size={18} />
                    </button>
                </form>

                
            </div>

            <ul className={`suggestions absolute top-full mt-1 bg-white border rounded-md w-full left-0 ${searchSuggestions.length > 0 ? 'block' : 'hidden'}`}>
                    
                    {searchSuggestions.length > 0 && searchSuggestions.map((suggestion, index) => (
                        <li key={index} className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">
                           <Link onClick={()=>{handleSuggestionClick(suggestion.value)}} href={`/search?q=${suggestion.value}`}>{suggestion.value}</Link>
                        </li>
                    ))}
                </ul>
        </header>
        </>
    )
}
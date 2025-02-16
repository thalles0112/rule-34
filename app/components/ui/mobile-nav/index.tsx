'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Script from "next/script"
import React, { FormEvent, useState, useEffect, useRef , useCallback} from "react"
import { IoHomeOutline, IoPersonOutline, IoPlayOutline, IoSearchOutline } from "react-icons/io5"
import './style.css'

interface headerProps extends React.HTMLAttributes<HTMLDivElement> {}


export default function Header<HTMLElement>(props:headerProps) {
   
    const icon_size = 18

    function setMobileSearchBarOpen(){
        const myEvent:any = new CustomEvent('searchBarOpen')

        window.dispatchEvent(myEvent)
    }

    return (
        

        <nav className="fixed bottom-0 left-0 w-full h-12 md:hidden">
            <ul className="flex justify-around items-center h-full">
                <li>
                    <Link href={'/'}><IoHomeOutline size={icon_size}/></Link>
                </li>
                <li>
                    <Link href={'/quickies'}><IoPlayOutline size={icon_size}/></Link>
                </li>
                <li>
                    <button onClick={setMobileSearchBarOpen}><IoSearchOutline size={icon_size}/></button>
                </li>
                
                <li>
                    <Link href={'/account'}><IoPersonOutline size={icon_size}/></Link>
                </li>
            </ul>
           
           
           
           
        </nav>
        
    )
}
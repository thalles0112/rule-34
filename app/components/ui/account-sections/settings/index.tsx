'use client'

import { useState } from "react"
import NameForm from "./profile-name"
import CustomFiltersForm from "./custom-filters"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Settings(){
    const [settingName, setSettingName] = useState(false)
    const [settingFilters, setSettingFilters] = useState(false)
    const router = useRouter()

    function changeProfilePicture(file:any){

    }

    function changeProfileBanner(file:any){
        
    }

    async function handleLogout(){
        await fetch("/api/logout", {method: 'POST'})
        router.push('/login')
    }

    return(
        <section>
            
               
            <NameForm closer={setSettingName} active={settingName}/>
            <CustomFiltersForm closer={setSettingFilters} active={settingFilters}/>
               
            
            <ul className="space-y-2">                            
                <li className="relative p-2 border-l hover:border-main-color" onClick={()=>setSettingName(true)}>
                    <label className="cursor-pointer">Change profile name</label>
                </li>

                
                <li className="relative p-2 border-l">
                    <label className="cursor-pointer">Change profile picture</label>
                    <input onChange={changeProfilePicture} placeholder="Change profile picture" type="file" className="cursor-pointer h-full opacity-0 absolute top-0 left-0"/>
                </li>
                
                
                <li className="relative p-2 border-l">
                    <label className="cursor-pointer">Change profile banner</label>
                    <input onChange={changeProfileBanner} placeholder="Change profile picture" type="file" className="cursor-pointer h-full opacity-0 absolute top-0 left-0"/>
                </li>

                <li onClick={()=>{setSettingFilters(true)}} className="relative p-2 border-l">
                    <label className="cursor-pointer">Custom filters</label>
                </li>
                
                <li className="relative p-2 border-l">
                    <Link href={'/account/likes'}>
                        <label className="cursor-pointer">Liked posts</label>
                    </Link>
                </li>

                <li className="relative p-2 border-l">
                    <Link href={'/account/favourites'}>
                        <label className="cursor-pointer">Favourites</label>
                    </Link>
                </li>

                <li className="relative p-2 border-l">
                    <Link href={'/account/comments'}>
                        <label className="cursor-pointer">My comments</label>
                    </Link>
                </li>

                <li onClick={handleLogout} className="relative p-2 border-l border-red-500">
                    <label className="cursor-pointer">Logout</label>
                </li>

                <li className="relative p-2 border-l border-red-500 text-red-500">
                    <label className="cursor-pointer">Delete account</label>
                </li>
            </ul>
        </section>
    )
}
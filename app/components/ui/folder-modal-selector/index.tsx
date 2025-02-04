'use client'
import { folder } from "@/app/types"
import { useEffect, useState } from "react"
import { IoFolder } from "react-icons/io5"

export default function FolderModalSelector({onSelect, visible, handleHide}:{onSelect:(page:number)=>void, visible:boolean, handleHide:()=>void}){
    const [folders, setFolders] = useState<folder[]>([])
    useEffect(()=>{
        const savedFolders = localStorage.getItem('folders') || "[]"
        const jsavedFolders:folder[] = JSON.parse(savedFolders)
        if(jsavedFolders){
            setFolders(jsavedFolders)
        }
        
    },[visible])
    return(
        <div className={visible?'':'hidden'}>
            <div onClick={handleHide} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
            <div className="z-10 absolute w-52 h-52 overflow-y-scroll dark:bg-black bg-slate-200 rounded-md flex p-2 flex-col items-start  gap-y-2">
                
                {folders.map(folder=>{
                    return(
                        <button className="flex hover:font-bold gap-2 h-8 items-center p-2 rounded-md w-full bg-white dark:bg-slate-800 text-black dark:text-white active:bg-white" key={folder.id} onClick={()=>{onSelect(folder.id)}}>
                           <IoFolder color="#b331b3" size={20}/> {folder.name}
                        </button>
                    )
                })}
                
            </div>
        </div>
        
    )
}
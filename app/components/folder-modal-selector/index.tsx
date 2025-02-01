'use client'
import { folder } from "@/app/types"
import { useEffect, useState } from "react"

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
            <div className="border z-10 absolute w-52 h-52 overflow-y-scroll dark:bg-black bg-white flex p-2 flex-col items-start">
                
                {folders.map(folder=>{
                    return(
                        <button className="border w-full text-black dark:text-white active:bg-white" key={folder.id} onClick={()=>{onSelect(folder.id)}}>
                            {folder.name}
                        </button>
                    )
                })}
                
            </div>
        </div>
        
    )
}
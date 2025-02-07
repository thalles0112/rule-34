'use client'
import { FormEvent, useEffect, useState, useRef } from "react"
import type { folder } from "../../../../types"
import { produce } from "immer"
import Link from "next/link"

import { IoFolder } from "react-icons/io5"
import CustomImage from "@/app/components/ui/Image"

export default function Folders(){
    const [creatingFolder, setCreatingFolder] = useState(false)
    const [folders, setFolders] = useState<folder[]>([])
    const formRef = useRef<HTMLFormElement>(null)
    function deleteFolder(idx:number){
        const nextState = produce(folders, draft=>{
            draft.splice(idx,1)
        })

        setFolders(nextState)
        localStorage.setItem('folders', JSON.stringify(nextState))
    }

    function createFolder(e:FormEvent){
        e.preventDefault()
        
        if(formRef.current != null){
            const formdata = new FormData(formRef.current)
            const data = Object.fromEntries(formdata.entries())
    
            const lastId:number = folders&&folders.length?folders[folders.length-1].id : 0
            const newFolder:folder = {name:`${data.name}`, owner:`${data.author}`, private:true, id:lastId+1, items:[]}
            const nextState = produce(folders, draft=>{
                draft.push(newFolder)
            })
            setFolders(nextState)
            
            localStorage.setItem('folders', JSON.stringify(nextState))
    
            setCreatingFolder(false)
        }  
        
    }


    function handleBlur(){
        if(formRef.current != null){
            const formdata = new FormData(formRef.current)
            const data = Object.fromEntries(formdata.entries())
            console.log(data)
            if (data.name){
                const lastId:number = folders&&folders.length?folders[folders.length-1].id : 0
                const newFolder:folder = {name:`${data.name}`, owner:`${data.author}`, private:true, id:lastId+1, items:[]}
                const nextState = produce(folders, draft=>{
                    draft.push(newFolder)
                })
                setFolders(nextState)
                
                localStorage.setItem('folders', JSON.stringify(nextState))
        
                setCreatingFolder(false)
            }

            else{
                setCreatingFolder(false)
            }

            
        }  
        
    }
    
    useEffect(()=>{
        function getFolders(){
            const test = localStorage.getItem('folders')
            if (test){
                setFolders(JSON.parse(test))
            }
        }
        
        getFolders()
    },[])

    

    return (
       
                <div className="w-full max-w-full h-fit flex flex-wrap items-center gap-2">
                
                {
                    folders && folders.map((folder,idx)=>{
                        return(
                            <Link  className="h-fit" key={idx}  href={`/account/folders/${folder.id}`}>
                            <div className="flex flex-wrap  w-40 h-40 rounded-md justify-start">
                                {folder.items.length?
                                folder.items.slice(0,4).map((item, idx)=>{
                                    return(
                                        <div key={idx} className="w-1/2 h-1/2 overflow-hidden">
                                            
                                            <CustomImage className="w-full object-cover h-full" src={item.preview_url} width={100} height={100} alt="folder preview"/>
                                        </div>
                                        
                                    )
                            })
                            : <div className="flex flex-wrap shadow-md rounded dark:bg-slate-900 w-40 h-40 justify-center items-center gap-2 hover:font-bold">
                                <IoFolder color="purple"/> {folder.name}
                            </div>
                                
                                }
                                
                            

                                
                            </div>
                            </Link>
                        )
                    })
                }
                
                {
                    creatingFolder && (
                        <form ref={formRef} className="border w-40 h-40 flex flex-col rounded-md p-2 justify-end" onSubmit={createFolder}>
                            <input name="items" value={[]} type="hidden"/>
                            <input name="owner" value={'myself'} type="hidden"/>
                            <input placeholder="folder name" autoFocus onBlur={handleBlur} className="w-full bg-transparent outline-none border-b" name="name" type="text"/>
                            <button type="submit" onClick={createFolder} className="w-full mt-2 active:bg-white active:bg-opacity-55">Create</button>
                        </form>
                    )
                }

                <button className="border h-fit p-2 rounded-md" onClick={()=>{setCreatingFolder(!creatingFolder)}}>create folder</button>
                </div>
      
    )
}

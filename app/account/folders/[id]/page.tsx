'use client'
import { PageProps } from "@/.next/types/app/page"
import Footer from "@/app/components/ui/footer"
import Header from "@/app/components/ui/header/header"
import ListPosts from "@/app/components/ui/listpost"
import { post, type folder } from "@/app/types"
import { produce } from "immer"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function FolderPage(){
    const [posts, setPosts] = useState<folder>()
    const [folders, setFolders] = useState<folder[]>([])
    const params = useParams()
    const id = params.id || 0
    const router = useRouter()

    function deleteFolder(idx:number){
        
        const nextState = produce(folders, draft=>{
            draft.splice(idx,1)
        })

        
        localStorage.setItem('folders', JSON.stringify(nextState))
        router.back()
    }


    useEffect(()=>{
        const cachedfolders = localStorage.getItem('folders') || '[]'
        const _folders:folder[] = JSON.parse(cachedfolders)
        if(_folders){
            setFolders(_folders)
            const filteredFolder:folder = _folders.filter(f=>f.id==id)[0]
            setPosts(filteredFolder)
        }
        

    },[])

    return(
        <div className="page-config">
            <title>Folder {posts?posts.name:''}</title>
            <Header/>
            <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8">
                <h1 className="text-xl font-bold mt-10">{posts?posts.name:''}</h1>
                <div>{folders?.map((f,idx)=>{
                    return(
                        <button key={idx} onClick={()=>{deleteFolder(idx)}} className={f.id==id?'':'hidden'}>Delete Folder</button>
                    )
                })}</div>
                <ListPosts canDelete={false} posts={posts?posts.items:[]}/>
            </main>
            <Footer/>
        </div>
    )
}


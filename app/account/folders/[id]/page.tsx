'use client'
import { PageProps } from "@/.next/types/app/page"
import Footer from "@/app/components/footer"
import Header from "@/app/components/header/header"
import ListPosts from "@/app/components/listpost"
import { post, type folder } from "@/app/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function FolderPage(){
    const [posts, setPosts] = useState<folder>()
    const params = useParams()
    const id = params.id || 0

    useEffect(()=>{
        const cachedfolders = localStorage.getItem('folders') || '[]'
        const folders:folder[] = JSON.parse(cachedfolders)
        if(folders){
            const filteredFolder:folder = folders.filter(f=>f.id==id)[0]
            setPosts(filteredFolder)
        }
        

    },[])

    return(
        <div className="page-config">
            <title>Folder {posts?posts.name:''}</title>
            <Header/>
            <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8">
                <h1 className="text-xl font-bold mt-10">{posts?posts.name:''}</h1>
                <ListPosts posts={posts?posts.items:[]}/>
            </main>
            <Footer/>
        </div>
    )
}


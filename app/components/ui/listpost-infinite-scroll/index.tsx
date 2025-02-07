"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Post from "./post";
import "./style.css";
import { produce } from "immer";
import { IoReloadOutline } from "react-icons/io5";
import { post } from "@/app/types";

export default function ListPosts({ search, initialPosts }: { search: string; initialPosts: any[] }) {
    const [posts, setPosts] = useState<any[]>(initialPosts);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    
    const observer = useRef<IntersectionObserver | null>(null);
    const lastPostRef = useRef<HTMLLIElement | null>(null);
    const loadingRef = useRef(false); // 🔥 Evita requisições duplicadas

    useEffect(()=>{
        setPage(1)
        setPosts([])
        fetchOtherPosts()
    },[search])

    async function fetchOtherPosts(){
        setLoading(true);
        loadingRef.current = true; // Evita múltiplas chamadas
        try {
            const resp = await axios.get(
                `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${search}&limit=25&pid=${1}&json=1`
            );
            const newPosts = resp.data || [];
           
            setPosts(newPosts)
            setPage(prev => prev + 1);
        }
        catch(e){

        }
        finally{
            setLoading(false)
            loadingRef.current = false; // Libera a flag para nova requisição
        }
    }

    async function fetchPosts() {
        if (loading || !hasMore || loadingRef.current) return;
        
        setLoading(true);
        loadingRef.current = true; // Evita múltiplas chamadas

        try {
            const resp = await axios.get(
                `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${search}&limit=25&pid=${page}&json=1`
            );
            const newPosts = resp.data || [];

            if (newPosts.length === 0) {
                setHasMore(false);
            } else {
                
                const nextState = produce(posts, draft=>{
                    draft.push(...newPosts)
                })
                const withAds = injectAd(nextState)
                setPosts([...nextState, ...withAds])
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.error("Erro ao carregar posts:", error);
        } finally {
            setLoading(false);
            loadingRef.current = false; // Libera a flag para nova requisição
        }
    }


    // Pesquisa por outros posts quando o termo de pesquisa muda
 



    // 📡 Observa último post para carregar mais
    useEffect(() => {
        if (loading || !hasMore) return;
        
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                fetchPosts();
            }
        });

        if (lastPostRef.current) observer.current.observe(lastPostRef.current);
    }, [hasMore, loading]); // Dependendo dos posts, evita problema do ref não estar pronto


    const injectAd = (posts: post[]) =>{
        return posts.flatMap((post, index)=>{
            const shouldInsertAd = Math.random() < 0.3
            if (shouldInsertAd){
                return [post, {id: `ad-${post.id}`}]
            }
            return [post]
        }
        
    )
    }
    

    return (
        <ul className="post-grid">
            {posts.map((post, index) => (
                <Post ad={post.id.toString().includes('ad')} key={index} post={post} ref={index === posts.length - 1 ? lastPostRef : null} />
            ))}



            
            <div className="w-full h-8">
              <div className="w-8 h-8 mx-auto">        
                <svg className="animate-spin " width="32" height="32" viewBox="-25 -25 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{transform:"rotate(-90deg)"}}>
                  <circle r="90" cx="100" cy="100" fill="transparent" stroke="#e0e0e0" strokeWidth="16px"></circle>
                  <circle r="90" cx="100" cy="100" stroke="#b331b3" strokeWidth="16px" strokeLinecap="round" strokeDashoffset="447px" fill="transparent" strokeDasharray="565.48px"></circle>
                </svg>
              </div>
            </div>
            
        </ul>
    );
}

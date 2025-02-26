"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Post from "./post";
import "./style.css";
import { produce } from "immer";
import { IoReloadOutline } from "react-icons/io5";
import { post } from "@/app/types";

export default function ListPosts({ search }: { search: string}) {
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    
    const observer = useRef<IntersectionObserver | null>(null);
    const lastPostRef = useRef<HTMLLIElement | null>(null);
    const loadingRef = useRef(false); // 🔥 Evita requisições duplicadas

    useEffect(()=>{
        loadInitialPosts()
    },[search])

    async function loadInitialPosts(){
        setLoading(true);
        loadingRef.current = true; // Evita múltiplas chamadas
        
            const cached = sessionStorage.getItem(search)
            
            if(cached && page==1){
                setPosts(JSON.parse(cached).posts)
                console.log('carregados os posts em cache')
                setPage(JSON.parse(cached).currentPage+1)
            }

            else{
                try {
                    const resp = await fetch(
                        `/api/post/?search=${search}&page=${1}`
                    );
                    
                    const resjson = await resp.json()
                    const newPosts = resjson.data || [];
                   
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

        setLoading(false)
        loadingRef.current = false

        
    }

    async function fetchMorePosts() {
        if (loading || !hasMore || loadingRef.current) return;
        
        setLoading(true);
        loadingRef.current = true; // Evita múltiplas chamadas
    
        try {
            const resp = await fetch(
                `/api/post/?search=${search}&page=${page}`
            );
            
            const resjson = await resp.json();
            let newPosts = resjson.data;
            console.log(newPosts);
    
            // 10% de chance de adicionar um post fictício
            if (Math.random() < 1) {
                const randomId = `ad${Math.floor(Math.random() * 10000)}`;
                const fakePost = { id: randomId, title: "Post Patrocinado", content: "Este é um anúncio fictício." };
                newPosts = [...newPosts, fakePost];
            }
    
            if (newPosts.length === 0) {
                setHasMore(false);
            } else {
                const nextState = produce(posts, draft => {
                    draft.push(...newPosts);
                });
                
                setPosts(nextState);
                sessionStorage.setItem(search, JSON.stringify({ posts: nextState, currentPage: page }));
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
                fetchMorePosts();
            }
        });

        if (lastPostRef.current) observer.current.observe(lastPostRef.current);
    }, [hasMore, loading, posts]); // Dependendo dos posts, evita problema do ref não estar pronto



    

    return (
        <ul className="post-grid relative">
            
            {posts.map((post, index) => (
                <Post ad={post.id.toString().includes('ad')} key={index} post={post} ref={index === posts.length - 1 ? lastPostRef : null} />
            ))}


            {
                hasMore
                ?<div className="absolute -bottom-8 w-full h-8 ">
                <div className="w-8 h-8 mx-auto">        
                  <svg className="animate-spin " width="32" height="32" viewBox="-25 -25 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{transform:"rotate(-90deg)"}}>
                    <circle r="90" cx="100" cy="100" fill="transparent" stroke="#e0e0e0" strokeWidth="16px"></circle>
                    <circle r="90" cx="100" cy="100" stroke="#b331b3" strokeWidth="16px" strokeLinecap="round" strokeDashoffset="447px" fill="transparent" strokeDasharray="565.48px"></circle>
                  </svg>
                </div>
              </div>
              :<></>
            }
            
            
        </ul>
    );
}

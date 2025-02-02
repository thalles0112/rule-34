"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Post from "./post";
import "./style.css";
import { produce } from "immer";

export default function ListPosts({ search, initialPosts }: { search: string; initialPosts: any[] }) {
    const [posts, setPosts] = useState<any[]>(initialPosts);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    
    const observer = useRef<IntersectionObserver | null>(null);
    const lastPostRef = useRef<HTMLLIElement | null>(null);
    const loadingRef = useRef(false); // 🔥 Evita requisições duplicadas



    async function fetchOtherPosts(){
        setLoading(true);
        loadingRef.current = true; // Evita múltiplas chamadas
        try {
            const resp = await axios.get(
                `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${search}&limit=25&pid=${page}&json=1`
            );
            const newPosts = resp.data || [];
            const nextState = produce(posts, draft=>{
                draft.push(...newPosts)
            })
            setPosts(nextState)
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
                setPosts(nextState)
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.error("Erro ao carregar posts:", error);
        } finally {
            setLoading(false);
            loadingRef.current = false; // Libera a flag para nova requisição
        }
    }



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
    }, [posts, hasMore, loading]); // ✅ Dependendo dos posts, evita problema do ref não estar pronto

    return (
        <ul className="post-grid">
            {posts.map((post, index) => (
                <Post key={index} post={post} ref={index === posts.length - 1 ? lastPostRef : null} />
            ))}
            {loading && <p>Loading more...</p>}
        </ul>
    );
}

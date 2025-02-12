'use client';
import Quickies from '../components/ui/quickies-component';
import React, { useState, useEffect, useRef } from 'react';
import { post } from '../types';
import Header from '../components/ui/header/header';
import './style.css';

export default function Home() {
  const [posts, setPosts] = useState<post[]>([]);
  const [loading, setLoading] = useState(false);
  const [pid, setPid] = useState(2);
  const lastPostRef = useRef(null);
  const observer = useRef<any>(null); // Ref para o IntersectionObserver

  const fetchInitialPosts = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=video&score:>100&limit=1&pid=${1}&json=1`
      );
      const newPosts = await response.json();

      // Verifica se há novos posts para evitar duplicatas
      if (newPosts.length > 0) {
        setPosts(newPosts);
        
      }
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar mais vídeos
  const fetchMorePosts = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=video&score:>100&limit=1&pid=${pid==1?2:pid}&json=1`
      );
      const newPosts = await response.json();

      // Verifica se há novos posts para evitar duplicatas
      if (newPosts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        
      }
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Efeito para configurar o IntersectionObserver
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect(); // Desconecta o observer anterior
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPid(pid+1)
        }
      },
      { threshold: 0.5 } // Dispara quando 50% do último vídeo estiver visível
    );

    if (lastPostRef.current) {
      observer.current.observe(lastPostRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [posts, loading]); // Reconfigura o observer quando posts ou loading mudam

  // Efeito para carregar os primeiros vídeos
  useEffect(() => {
    fetchInitialPosts(); // Carrega o primeiro post ao montar o componente
  }, []); // Executa apenas uma vez

  useEffect(()=>{
    fetchMorePosts()
  },[pid])

  return (
    <div className="">
      <Header />
      <main className="snap-y snap-mandatory overflow-y-scroll quickies-container">
        {posts.map((reel, index) => (
          <Quickies
            ref={index === posts.length - 1 ? lastPostRef : null}
            key={reel.id}
            comment_count={reel.comment_count}
            score={reel.score}
            src={reel.file_url}
          />
        ))}
        {loading && <p className="text-white text-center">Carregando...</p>}
      </main>
    </div>
  );
}
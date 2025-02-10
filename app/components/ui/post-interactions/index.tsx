'use client'

import { IoBookmark, IoBookmarkOutline, IoHeart, IoHeartOutline, IoPersonOutline, IoThumbsDownOutline, IoThumbsUp, IoThumbsUpOutline } from 'react-icons/io5'
import {fullPost} from '../../../types'
import { FormEvent, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Comment from '../comment'
import FolderModalSelector from '../folder-modal-selector'
import type { folder } from '../../../types'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import Script from 'next/script'
import './style.css'
import AdComponent from '../../services/adloader'


export default function PostInteractions({post}:{post:fullPost}){
    const [following, setFollowing] = useState(false)
    const [showAllTags, setShowAllTags] = useState(false)
    const [comment, setComment] = useState({text:'', replyTo:null})
    const [saved, setSaved] = useState(false)
    const [showFolders, setShowFolders] = useState(false)
    const divRef = useRef<HTMLDivElement>(null);
    const [liked, setLiked] = useState(post.liked)
    const [favorited, setFavorited] = useState(post.favorited)

    useEffect(() => {
      const updateHeight = () => {
        if (divRef.current) {
          divRef.current.style.height = "auto"; // Reseta a altura pra calcular o novo tamanho
          divRef.current.style.height = `${divRef.current.scrollHeight}px`; // Ajusta conforme o conteúdo
        }
      };
  
      const observer = new MutationObserver(updateHeight);
      if (divRef.current) {
        observer.observe(divRef.current, { childList: true, subtree: true, characterData: true });
      }
  
      return () => observer.disconnect();
    }, []);

    function savePost(folder: number) {
        const savedFolders = localStorage.getItem("folders") || "[]";
        let jsavedFolders: folder[] = JSON.parse(savedFolders);
        let postExists = false;
    
        // Atualiza as pastas e verifica se o post já está salvo
        let updatedFolders = jsavedFolders.map((f) => {
            if (f.id === folder) {
                const postIndex = f.items.findIndex((p) => p.id === post.id);
                if (postIndex !== -1) {
                    // Remove o post se já estiver salvo
                    f.items.splice(postIndex, 1);
                    postExists = true;
                } else {
                    // Adiciona o post se não estiver salvo
                    f.items.push(post);
                }
            }
            return f;
        });
    
        // Atualiza o LocalStorage
        localStorage.setItem("folders", JSON.stringify(updatedFolders));
    
        // Define se o post está salvo ou não
        setSaved(!postExists);
        setShowFolders(false);
    }
    
    // Verifica se o post já está salvo ao carregar a página
    useEffect(() => {
        const savedFolders = JSON.parse(localStorage.getItem("folders") || "[]");
        const isSaved = savedFolders.some((f: folder) =>
            f.items.some((p: any) => p.id === post.id)
        );
    
        setSaved(isSaved);
    }, [post]);

    

    function handleComment(e:FormEvent){
        e.preventDefault()
    }

    function handleLike(){
        setLiked(!liked)
    }

    function handleFavorite(){
        setFavorited(!favorited)
    }

    function hideFolderSelector(){
        setShowFolders(false)
    }


    return(
        <section className="lg:w-5/12 md:w-6/12 max-sm:w-full max-h-full mt-10">
            <div className='flex items-center gap-2 mb-2'>
                <div className='relative flex items-center'>
                    <button onClick={()=>{setShowFolders(!showFolders)}}>{!saved?<IoBookmarkOutline size={20}/>:<IoBookmark className='accent-color' size={20}/>} </button>
                    <FolderModalSelector onSelect={savePost} visible={showFolders} handleHide={hideFolderSelector}/>
                </div>
                
                    <button onClick={handleLike}>{liked?<AiFillLike className='accent-color' size={20}/>:<AiOutlineLike size={20}/>}</button>
                    <button onClick={handleFavorite}>{favorited?<IoHeart className='accent-color' size={20}/>:<IoHeartOutline size={20}/>}</button>
                
            </div>
            
                    <div ref={divRef} className="dark:bg-slate-800 border dark:border-slate-700 rounded-md p-4 flex items-center gap-4">
                      
                      <div className="rounded-full bg-gray-300 w-8 h-8 flex items-center justify-center">
                        {
                          post.authorpicture
                            ?<img src={post.authorpicture} className="w-full h-full object-cover"/>
                            :<IoPersonOutline color="#fff" size={24}/>
                        }
                      </div>
                      
                      <div className="flex gap-4 w-fit items-center">
                        <Link href={post.author.url}>
                            <h2 className="text-sm font-bold">{post.user.username || post.owner}</h2>
                        </Link>
                        <button onClick={()=>setFollowing(!following)} 
                                className={`p-1 rounded-md text-sm border w-24 ${following?'accent-color text-white':'Follow'}`}>
                                    {following?'Following':'Follow'}
                        </button>
                        <span className='text-sm'>{post.author.subscribers.length}</span>
                      </div>

                      
                    </div>

                    <div className='my-4'>
                        <span className='text-sm text-gray-400'>upload date: {post.createdAt?new Date(post.createdAt).toUTCString().replace('00:00:00 GMT','') : 'not specifed'}</span>
                    </div>

                    <div className={`dark:bg-slate-800 border dark:border-slate-700 rounded-md p-4 flex flex-col items-start gap-4 `}>
                        {post.title?<h1 className='text-lg font-bold'>{post.title}</h1>:<div/>}
                        <p className={`text-sm flex items-center flex-wrap ${showAllTags?'':'max-h-52 overflow-hidden'}`}>
                            Tags: {post.tags.split(' ').map((tag, idx)=>{
                                return(
                                <Link key={idx} href={'/search?q='+tag} className='border flex rounded-md p-1 m-1 hover:opacity-35'>
                                    {tag}
                                </Link>)
                            })}
                        </p>
                        <button className='text-sm text-gray-400' onClick={()=>{setShowAllTags(!showAllTags)}}>{showAllTags?'show less':'show all'}</button>
                    </div>
                    
                    <div className="dark:bg-slate-800 border dark:border-slate-700 p-4 flex flex-col items-start gap-4 my-4 relative" id="banner-ad">
                        <AdComponent type='leaderboard'/>
                    </div>
                    

                    <div className="dark:bg-slate-800 border h-96 dark:border-slate-700 p-4 flex flex-col items-start gap-4">
                         <form onSubmit={(e)=>handleComment(e)} id='desktop-search' className="min-h-10 items-center flex max-sm:hidden">
                            <div onChange={(e)=>{console.log(e)}} contentEditable={true} className="min-w-96 max-w-96 min-h-[40px] p-2 border-b focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden break-words">

                            </div>

                            <button className="flex justify-center items-center border rouded-md px-3 active:opacity-40 h-10">
                                {'>'}
                            </button>
                        </form>
                        
                        <h3>Comments</h3>
                        
                        <ul className='w-full max-h-full overflow-y-scroll'>
                        {post.comments && post.comments.map((comment,idx)=>{
                            return(
                                <Comment key={comment.id || comment.$.id} comment={comment}/>
                            )
                        })}
                        </ul>

                    </div>

                </section>
    )
}
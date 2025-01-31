'use client'

import { IoPersonOutline } from 'react-icons/io5'
import {fullPost} from '../../types'
import { FormEvent, useState } from 'react'
import Link from 'next/link'
import Comment from '../comment'


export default function PostInteractions({post}:{post:fullPost}){
    const [following, setFollowing] = useState(false)
    const [showAllTags, setShowAllTags] = useState(false)
    const [comment, setComment] = useState({text:'', replyTo:null})

    function handleComment(e:FormEvent){
        e.preventDefault()
    }


    return(
        <section className="lg:w-5/12 md:w-6/12 max-sm:w-full max-h-full mt-10">
                    <div className="dark:bg-slate-800 border dark:border-slate-700 rounded-md p-4 flex items-center gap-4">
                      
                      <div className="rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center">
                        {
                          post.authorpicture
                            ?<img src={post.authorpicture} className="w-full h-full object-cover"/>
                            :<IoPersonOutline color="#fff" size={24}/>
                        }
                      </div>
                      
                      <div className="flex gap-4 w-fit items-center">
                        <Link href={post.author.url}>
                            <h2 className="text-lg font-bold">{post.author.name || post.owner}</h2>
                        </Link>
                        <button onClick={()=>setFollowing(!following)} 
                                className={`p-1 rounded-md border w-24 ${following?'bg-blue-500 text-white':'Follow'}`}>
                                    {following?'Following':'Follow'}
                        </button>
                        <span className='text-sm'>{post.author.subscriptions}</span>
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
                        <button onClick={()=>{setShowAllTags(!showAllTags)}}>{showAllTags?'show less':'show all'}</button>
                    </div>

                    <div className='my-4'></div>

                    <div className="dark:bg-slate-800 border h-96 dark:border-slate-700 rounded-md p-4 flex flex-col items-start gap-4">
                         <form onSubmit={(e)=>handleComment(e)} id='desktop-search' className="min-h-10 h-10 border-b rounded-md flex max-sm:hidden">
                            <div contentEditable className='font-sm outline-none flex items-center p-2 border-b'>
                                {
                                    comment.text==''?<span className='text-gray-500'>Publish a comment</span>:comment.text
                                }
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
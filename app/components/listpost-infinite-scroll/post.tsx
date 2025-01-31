import { post } from "@/app/types";
import Link from "next/link";
import { forwardRef } from "react";
import { IoChatboxOutline, IoHeartOutline, IoBookmarkOutline, IoThumbsUp, IoPersonOutline } from 'react-icons/io5'

const Post = forwardRef(({post}:{post:post}, ref) =>{
    return(

        <li className="post-item rounded-md overflow-hidden relative max-sm:w-full">
                <Link ref={ref as any} href={post.url || `/p/${post.id}`}>
            <article className="w-full h-full">
              <figure className="h-full w-full">
                <img
                  className="post-image"
                  src={post.previewImageUrl || post.preview_url}
                  alt={post.title || post.tags}
                  width="1000"
                  height="1000"
                  loading="lazy"
                />
                <figcaption className="absolute bottom-0 w-full p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      {
                        post.authorpicture
                        ?<img src={post.authorpicture}/>
                        :<IoPersonOutline size={24}/>
                      }
                      
                    </div>
                    <div>
                      <label className="post-author font-semibold text-white">{post.author || 'Rule 34 Artist'}</label>
                    </div>
                  </div>
                  <h2 className="post-title text-xl font-bold text-white">{post.title}</h2>

                  <div className="post-interactions w-full flex items-center gap-4">
                    <div className="bg-black flex items-center gap-2 bg-opacity-30 rounded-full py-1 px-2 w-fit">
                      <div className="flex gap-1 items-center">
                        <IoHeartOutline color={'#fff'} size={12}/>
                        <span className="text-sm font-bold text-white">{post.favorites || 0}</span>
                      </div>

                      <div className="flex gap-1 items-center">
                        <IoChatboxOutline color={'#fff'} size={12}/>
                        <span className="text-sm font-bold text-white">{post.comments || post.comment_count}</span>
                      </div>
                      
                      <div className="flex gap-1 items-center">
                        <IoBookmarkOutline color={'#fff'} size={12}/>
                        <span className="text-sm font-bold text-white">{post.saves}</span>
                      </div>
                    </div>

                    <div className="bg-black flex items-center gap-2 bg-opacity-30 rounded-full py-1 px-2 w-fit">
                    <IoThumbsUp color={'#fff'} size={12}/>
                    <span className="text-sm font-bold text-white">{post.likes || post.score}</span>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </article>
            </Link>
          </li>
          
    )
})

export default Post
import { post } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import { IoChatboxOutline, IoHeartOutline, IoBookmarkOutline, IoThumbsUp, IoPersonOutline } from 'react-icons/io5'
import CustomImage from "../Image";
import { AiOutlineLike } from 'react-icons/ai'
import AdComponent from "../../services/adloader";

const Post = forwardRef(({post, ad}:{post:post, ad:boolean}, ref) =>{
    const icon_size = 18
    return(

      <li ref={ref as any} className="post-item rounded-md overflow-hidden relative max-sm:w-full">
      <Link href={post.url || `/p/${post.id}`}>
        <article className="w-full h-full">
          <figure className="h-full w-full">
            <CustomImage
                className="post-image"
                src={post.file_url}
                placeholderSrc={post.preview_url}
                alt={post.title || post.tags}
                width={post.width}
                height={post.height}
                
              />
            <figcaption className="absolute bottom-0 w-full p-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 text-white rounded-full mb-2 flex justify-center items-center overflow-hidden bg-black bg-opacity-30">
                  {
                    post.author && post.author.picture
                    ?<img width={40} height={40} alt={post.user.username} src={post.author.picture || '/img/profile.jpeg'}/>
                    :<IoPersonOutline size={icon_size}/>
                  }
                  
                </div>
                <div>
                  <label className="post-author font-semibold text-white">{post.user && post.user.username? post.user.username:'Rule 34 Artist'}</label>
                </div>
              </div>
              <h2 className="post-title text-xl font-bold text-white">{post.title}</h2>

              <div className="post-interactions w-full flex items-center gap-4">
                <div className="bg-black flex items-center gap-2 bg-opacity-30 rounded-full py-1 px-2 w-fit">
                  <div className="flex gap-1 items-center">
                    <IoHeartOutline color={'#fff'} size={icon_size}/>
                    <span className="text-sm font-bold text-white">{post.favorites || 0}</span>
                  </div>

                  <div className="flex gap-1 items-center">
                    <IoChatboxOutline color={'#fff'} size={icon_size}/>
                    <span className="text-sm font-bold text-white">{post.comment_count || post.comments}</span>
                  </div>
                  
                  <div className="flex gap-1 items-center">
                    <IoBookmarkOutline color={'#fff'} size={icon_size}/>
                    <span className="text-sm font-bold text-white">{post.saves}</span>
                  </div>
                </div>

                <div className="bg-black flex items-center gap-2 bg-opacity-30 rounded-full py-1 px-2 w-fit">
                <AiOutlineLike color={'#fff'} size={icon_size}/>
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
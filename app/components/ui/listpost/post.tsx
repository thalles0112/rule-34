import { post } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import { IoChatboxOutline, IoHeartOutline, IoBookmarkOutline, IoThumbsUp, IoPersonOutline, IoTrashOutline } from 'react-icons/io5'
import { AiOutlineLike } from 'react-icons/ai'
import CustomImage from "../Image";


export default function Post({post, canDelete}:{post:post, canDelete:boolean}){
    const icon_size = 18
    const handleDelete = async()=>{
      const isConfirmed = window.confirm('Do you really wanna delete this post?')
      if(isConfirmed){
        const repsonse = await fetch(`/api/post?id=${post.id}`, {method:'DELETE'})
        window.location.reload()
      }
 

    }
    return(
        <li className="post-item rounded-md overflow-hidden relative max-sm:w-full">
          {
            canDelete
            ?<button onClick={handleDelete}><IoTrashOutline/></button>
            :<></>
          }
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
}
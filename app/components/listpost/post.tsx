import { post } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import { IoChatboxOutline, IoHeartOutline, IoBookmarkOutline, IoThumbsUp, IoPersonOutline } from 'react-icons/io5'

export default function Post({post}:{post:post}){
    return(
      <Link href={post.url || `/p/${post.id}`}>
        <li className="post-item rounded-md overflow-hidden relative max-sm:w-full">
            <article className="w-full h-full">
              <figure className="h-full w-full">
                <Image
                  className="post-image"
                  src={post.previewImageUrl || post.preview_url}
                  alt={post.title || post.tags}
                  width="600"
                  height="400"
                  loading="lazy"
                />
                <figcaption className="absolute bottom-0 w-full p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex justify-center items-center overflow-hidden bg-black bg-opacity-30">
                      {
                        post.authorpicture
                        ?<Image width={40} height={40} alt={post.author} src={post.authorpicture}/>
                        :<IoPersonOutline size={20}/>
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
          </li>
          </Link>
    )
}
'use client'
import { comment } from "@/app/types";
import { useState } from "react";
import { IoPersonOutline, IoHeartOutline, IoHeart } from 'react-icons/io5'



export default function Comment({comment}:{comment:comment}){
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(comment.likes)

    function handleLike(){
        if(liked){
            setLikes(likes-1)
            setLiked(false)
        }
        else{
            setLikes(likes+1)
            setLiked(true)
        }
    }

    return(
        <li className="flex items-start gap-2 p-1 my-1  rounded-md w-full">
            <div className="rounded-full overflow-hidden flex justify-center items-center bg-black bg-opacity-40 p-1 h-6 w-6">
                {
                    comment.userpicture != ""
                    ?<img src={comment.userpicture} className="w-full h-full object-cover"/>
                    :<IoPersonOutline/>
                }
            </div>

            <div className="w-fit">
                <div className="text-sm font-bold">@{comment.username || comment.$.creator}</div>
                <p className="text-sm">{comment.content || comment.$.body}</p>

                <div className="mt-2 flex items-center gap-2">
                    <button onClick={handleLike}>
                        {
                            liked
                            ?<IoHeart color="red"/>
                            :<IoHeartOutline/>
                        }
                        
                    </button>
                    <span className="text-sm">{likes}</span>
                </div>
            </div>
        </li>
    )
}
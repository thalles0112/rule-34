'use client'
import Post from "./post"
import './style.css'

export default function ListPosts({posts}:{posts:any[]}){
    return(
        <ul className="post-grid">
        {posts && posts.map((post, index) => (
          <Post key={index} post={post}/>
        ))}
      </ul>
    )
}



export  function ListPostsFlex({posts}:{posts:any[]}){
    return(
        <ul className="post-flex">
        {posts && posts.map((post, index) => (
          <Post key={index} post={post}/>
        ))}
      </ul>
    )
}
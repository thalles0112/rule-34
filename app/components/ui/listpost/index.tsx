'use client'
import Post from "./post"
import './style.css'

export default function ListPosts({posts, canDelete}:{posts:any[], canDelete:boolean}){
    return(
        <ul className="post-grid">
        {posts && posts.map((post, index) => (
          <Post canDelete={canDelete} key={index} post={post}/>
        ))}
      </ul>
    )
}


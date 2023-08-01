import React from 'react'
import './posts.css'
import Post from '../post/Post'
export default function Posts({posts}) {
  console.log(posts);
  return (
    <div className='posts'>
        {posts.map((p,index)=>{
          return <Post key={index} post={p}/>
        })}
    </div>
  )
}

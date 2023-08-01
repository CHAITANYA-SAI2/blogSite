import React, { useContext, useEffect, useState } from 'react'
import './singlePost.css'
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { Context } from '../../context/Context';
export default function SinglePost() {
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [updateMode,setUpdateMode]=useState(false);
    const {user}=useContext(Context);
    const PF="http://localhost:5000/images/";
    const location=useLocation();
    const path=location.pathname.split("/")[2];
    const [post,setPost]=useState({})

    useEffect(()=>{
        const getPost= async ()=>{
        const res=await axios.get("/posts/"+path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        }
        getPost();
    },[path])

    const handleDelete= async(e)=>{
        try{
            await axios.delete(`/posts/${post._id}`,{data:{username:user.username}});
            window.location.replace("/");
        }catch(error){

        }
    }
    const handleUpdate=async ()=>{
        try{
            await axios.put(`/posts/${post._id}`,{username:user.username,title,desc});
            setUpdateMode(false);
        }catch(error){

        }
    }

  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
            {post.photo&&<img className="singlePostImage" src={PF+post.photo} alt="" />}
            {updateMode ? <input type="text" value={title} className="singlePostTitleInput "onChange={(e)=>setTitle(e.target.value)} autoFocus /> : 
            <h1 className="singlePostTitle">
                {title}
                {post.username===user?.username &&
                <div className="singlePostEdit">
                    <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                    <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                </div>
                }
            </h1>}
            <div className="singlePostInfo">
                <span className="singlePostAuthor">Author: 
                <Link to={`/?user=${post.username}`} className='link'>
                    <b>{post.username}</b>
                </Link>
                </span>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? <textarea value={desc} className='singlePostDescInput' onChange={(e)=>setDesc(e.target.value)}/>:<p className='singlePostDescription'>{desc}</p>}
            {updateMode&&<button className="singlePostButton" onClick={handleUpdate} >Update</button>}
        </div>
    </div>
  )
}

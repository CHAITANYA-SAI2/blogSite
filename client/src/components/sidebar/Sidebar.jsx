import React, { useContext, useEffect, useState } from 'react'
import './sidebar.css'
import axios from 'axios'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Context } from '../../context/Context';
export default function Sidebar() {
    const [cats,setCats]=useState([]);
    const {user,dispatch}=useContext(Context);
    const PF="http://localhost:5000/images/";
    useEffect(()=>{
        const getCats=async ()=>{
            const res=await axios.get("/categories");
            setCats(res.data);
        }
        getCats();
    },[])
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>

            {user && user.profilePic ? (
                <img className='sidebarImg' src={PF + user.profilePic} alt='Profile' />) : 
                (<img className='sidebarImg' src="https://img.freepik.com/free-vector/question-mark-sign-brush-stroke-trash-style-typography-vector_53876-140880.jpg" alt='Profile' />)}
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus necessitatibus consectetur, ab nam recusandae quidem ad magnam labore quae! Quibusdam.</p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                {cats.map((c) => {
                    return <Link to={`/?cat=${c.name}`} className='link'>
                    <li className="sidebarListItem">{c.name}</li>
                    </Link>
                })}
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
            <i className="sidebarIcon fa-brands fa-facebook"></i>
            <i className="sidebarIcon fa-brands fa-square-twitter"></i>
            <i className="sidebarIcon fa-brands fa-square-instagram"></i>
            </div>
        </div>
    </div>
  )
}

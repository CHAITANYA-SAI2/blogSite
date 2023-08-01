import React, { useContext } from 'react'
import './TopBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
export default function TopBar() {
  const {user,dispatch}=useContext(Context);
  const PF="http://localhost:5000/images/";
  const Logout=()=>{
      console.log("nikki");
      dispatch({type:"LOGOUT"})
      window.location.href = '/register'
  }
  return (
    <div className='top'>
      <div className='topLeft'>
      <i className="topIcon fa-brands fa-facebook"></i>
      <i className="topIcon fa-brands fa-square-twitter"></i>
      <i className="topIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className='topCenter'>
        <ul className='topList'>
            <li className='topListItem'>
            <Link to="/" className='link'>HOME</Link>
            </li>
            <li className='topListItem'><Link to="/" className='link'>ABOUT</Link></li>
            <li className='topListItem'><Link to="/" className='link'>CONTACT</Link></li>
            <li className='topListItem'><Link to="/write" className='link'>WRITE</Link></li>
            <li className='topListItem' onClick={Logout}>
            {user ? (
              <span className='link'>LOGOUT</span>
            ) : (
              <Link to='/register' className='link'>REGISTER</Link>
            )}
          </li>

        </ul>
      </div>
      <div className='topRight'>
      {user?
      <Link to="/settings">
      <img className='topImage' src={user.profilePic ? PF+user.profilePic : "https://img.freepik.com/free-vector/question-mark-sign-brush-stroke-trash-style-typography-vector_53876-140880.jpg"} alt='' />
      </Link>:
      <ul className='topList'>
      <li className='topListItem'>
      <Link to="/login" style={{marginRight:'20px'}} className='link'>LOGIN</Link>
      </li>
      <li className='topListItem'>
      <Link to="/register" className='link'>REGISTER</Link>
      </li>
      </ul>
      }
      <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}

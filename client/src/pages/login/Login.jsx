import React,{useEffect, useRef} from 'react'
import './login.css'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from 'axios'
import { useContext } from 'react';
export default function Login() {
  const userRef=useRef();
  const passwordRef=useRef();
  const {dispatch,isFetching}=useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      const userExists = res.data; // Check if the user exists
      if (userExists) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: "User does not exist" });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: "Error occurred" });
    }
  };
  

  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input className='loginInput'
         type="username" 
         placeholder='Enter your username..'
         ref={userRef}
         />
        <label>Password</label>
        <input className='loginInput' 
         type="password"
         placeholder='Enter your password..'
         ref={passwordRef} />
        <button className='loginButton' type='submit' disabled={isFetching}>Login</button>
      </form>
      <button className='loginRegisterButton' type='submit'>
      <Link className='link' to='/register'>REGISTER</Link>
      </button>
    </div>
  )
}

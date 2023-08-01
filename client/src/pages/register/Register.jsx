import React,{useState,useRef} from 'react'
import './register.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios';
export default function Register() {
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState(false);
    async function handleSubmit (e){
      setError(false);
      e.preventDefault();
      try{
        const res=await axios.post("/auth/register",{
          username,
          email,
          password
        });
        res.data&&window.location.replace("/login");
      }catch(error){
        setError(true);
      }
    }
  return (
    <div className='register'>
        <span className="registerTitle">Register</span>
      <form className='registerForm' onSubmit={handleSubmit}>
      <label>Username</label>
        <input 
        className='registerInput' 
        type="text" 
        placeholder='Enter your username..'
        onChange={e=>{setUsername(e.target.value)}}
        />
        <label>Email</label>
        <input className='registerInput' 
        type="email" 
        placeholder='Enter your email..'
        onChange={e=>{setEmail(e.target.value)}}
        />
        <label>Password</label>
        <input className='registerInput' 
        type="password" 
        placeholder='Enter your password..'
        onChange={e=>{setPassword(e.target.value)}} 
         />
        <button className='registerButton' type='submit'>Register</button>
      </form>
      <button className='registerLoginButton'>
        <Link className='link' to='./login'>Login</Link>
      </button>
      {error&&<span style={{color:'red',marginTop:'10px'}}><b>Something went wrong!</b></span>}
    </div>
  )
}

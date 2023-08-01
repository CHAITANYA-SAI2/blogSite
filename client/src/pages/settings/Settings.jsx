import React, { useContext,useState } from 'react'
import './settings.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { Context } from '../../context/Context';
import axios from 'axios';
export default function Settings() {
    const {user,dispatch}=useContext(Context);
    const [file,setFile]=useState(null);
    const [username,setUsername]=useState(user.username);
    const [email,setEmail]=useState(user.email);
    const [password,setPassword]=useState(user.password);
    const [success,setSuccess]=useState(false);
    const PF="http://localhost:5000/images/";
    const handleSubmit=async(e)=>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"});
        const updatedUser={
          userId:user._id,
          username,
          email,
          password,
        };
        if(file){
          const data=new FormData();
          const filename=Date.now()+file.name;
          data.append("name",filename);
          data.append("file",file)
          updatedUser.profilePic=filename;
          try{
            await axios.post("/upload",data)
          }catch(error){
            console.log(error);
          }
        }
        try{
          const res=await axios.put("/users/"+user._id,updatedUser);
          setSuccess(true);
          dispatch({type:"UPDATE_SUCCESS",payload:res.data});
        }catch(error){
            dispatch({type:"UPDATE_FAILURE"});
        }
    }
  return (
    <div className='settings'>
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Profile</span>
                <span className="settingsDeleteTitle">Delete your Profile</span>
            </div>
            <form action="" className="settingsForm" onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img src={file ? URL.createObjectURL(file):PF+user.profilePic} alt="" />
                    <label htmlFor='fileInput'><i className="settingsPPIcon fa-regular fa-image"></i></label>
                    <input type='file'
                     style={{display:'none'}}
                     id='fileInput'
                     onChange={(e)=>{setFile(e.target.files[0])}}
                     ></input>
                </div>
                <label>Username</label>
                <input type="text" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)}/>
                <label>Email</label>
                <input type="email" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button className="settingsUpdate" type='submit'>Update</button>
                {success && <span style={{color:"green",fontSize:"20px",marginTop:"20px", textAlign:"center"}}>Profile is updated successfully..</span>}
            </form>
        </div>
        <Sidebar />
    </div>
  )
}

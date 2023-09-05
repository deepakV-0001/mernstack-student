import React ,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'

const SignUp = () => {
     
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

   useEffect(()=>{
     const auth=localStorage.getItem('user');
     if(auth){
      navigate("/");
     }
   })




    const collectData= async ()=>{
        let result = await fetch('http://localhost:5000/register',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
        
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          
          },
          body:JSON.stringify({name,email,password}),
         
        }) 
        result= await result.json();
        console.log(result);
        if(result){
          localStorage.setItem("user",JSON.stringify(result.result));
          localStorage.setItem("token",JSON.stringify(result.auth));
          navigate('/');
        }
    }

  return (
    <div className='register'>
        <h2>Register</h2>
        <input className='inputbox' type='text' value={name}  onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'/>
        <input className='inputbox' type='email' value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'/>
        <input className='inputbox' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter Password'/>
        <button type='button' onClick={collectData} className='signup-button'>SignUp</button>
    </div>
  )
}

export default SignUp;
import React, { useState } from 'react';

const AddStudent = () => {

 const [name,setName]=useState("");
 const [age,setAge]=useState("");
 const [email,setEmail]=useState("");
 const [mobile,setMobile]=useState("");
 const [error,setError]=useState(false);

 const addStudent=async ()=>{
    
    if(!name || !age ||!email || !mobile){
        setError(true);
        return false;
    }

    const userId=JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch('http://localhost:5000/add-student',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          
           authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        
        },
        body:JSON.stringify({name,age,email,mobile,userId}),
       
      }) 
      result= await result.json();
     if(result){
      alert("New Student Added");
     }
 }

  return (
    <div className='student'>
        <h1>Add Student</h1>
        <input type='text' onChange={(e)=>{setName(e.target.value)}} value={name} className='inputbox' placeholder='Enter Name'/>
        {error && !name && <span className='invalid-input'>Enter valid name </span>}


        <input type='text' onChange={(e)=>{setAge(e.target.value)}} value={age} className='inputbox' placeholder='Enter Age'/>
        {error && !age && <span className='invalid-input'>Enter valid age </span>}


        <input type='text' onChange={(e)=>{setEmail(e.target.value)}} value={email} className='inputbox' placeholder='Enter Email'/>
        {error && !email && <span className='invalid-input'>Enter valid email </span>}


        <input type='text' onChange={(e)=>{setMobile(e.target.value)}} value={mobile} className='inputbox' placeholder='Enter Mobile no.'/>
        {error && !mobile && <span className='invalid-input'>Enter valid mobile no. </span>}


        <button onClick={addStudent} className='login-btn' type='button'>Add student</button>
    </div>
  )
}

export default AddStudent
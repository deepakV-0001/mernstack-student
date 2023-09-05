import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateStudent = () => {

  const [name,setName]=useState("");
  const [age,setAge]=useState("");
  const [email,setEmail]=useState("");
  const [mobile,setMobile]=useState("");
    const params =useParams();
    const navigate = useNavigate();

      useEffect(()=>{
        getStudentDetails();
      },[]);

      const getStudentDetails= async ()=>{
        let result = await fetch(`http://localhost:5000/student/${params.id}`,{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        });
        result = await result.json();
        setName(result.name);
        setAge(result.age);
        setEmail(result.email);
        setMobile(result.mobile);
      }

    const UpdateStudent =async () => {
       let result= await fetch(`http://localhost:5000/student/${params.id}`,{method:'Put',
       body:JSON.stringify({name,age,email,mobile}),
       headers:{
        "Content-Type":"application/json",
        
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      
       }
    
    });
    result = await result.json();
    navigate("/");

    }

    return (
        <div className='student'>
            <h1>Update Record</h1>
            <input type='text' onChange={(e) => { setName(e.target.value) }} value={name} className='inputbox' placeholder='Enter Name' />

            <input type='text' onChange={(e) => { setAge(e.target.value) }} value={age} className='inputbox' placeholder='Enter Age' />

            <input type='text' onChange={(e) => { setEmail(e.target.value) }} value={email} className='inputbox' placeholder='Enter Email' />

            <input type='text' onChange={(e) => { setMobile(e.target.value) }} value={mobile} className='inputbox' placeholder='Enter Mobile no.' />

            <button onClick={UpdateStudent} className='login-btn' type='button'>Update</button>
        </div>
    )
}

export default UpdateStudent
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    })



    const handleLogin = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                
            },
            body: JSON.stringify({ email, password }),

        })
        result = await result.json();
       
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify( result.user ));
            localStorage.setItem("token", JSON.stringify( result.auth ));
            navigate("/");
        } else {
            alert("Enetr Correct Details");
        }
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <input className='inputbox' onChange={(e) => setEmail(e.target.value)} value={email} type='text' placeholder='Enter Email' />
            <input className='inputbox' onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Enter Password' />
            <button type='button' onClick={handleLogin} className='login-btn'>Login</button>
        </div>
    )
}

export default Login
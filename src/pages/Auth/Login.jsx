import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';

const Login = ({setCurrentPage}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  //handle login from submit
  const handleLogin = async (e) => {
    e.preventDefault();

/*
    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }*/

    if(!password){
      setError("Please enter the correct password.");
    }

    setError("");

    //Login API call
    /*try{
      
    }*/
  };  
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back!</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in.
      </p>

      <form onSubmit={handleLogin}>

        <Input
          value={email}
          onChange={({target}) => setEmail(target.value)}
          label="Email Address"
          placeholder="abcd@example.com"
          type="text"
          />

          <Input
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
          />

        {error && <p className="text-redd-500 text-xs pb-2,5">{error}</p>}

        <button type="submit" className="btn-primary">
          Log In
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button 
            className="font-medium text-primary underline cursor-pointer"
            onClick={() =>{
              setCurrentPage("signup");
            }}
            >
            Sign Up
            </button>
        </p>
      </form>
    </div>
  )
}

export default Login

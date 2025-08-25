/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import {validateEmail} from '../utils/helper.js';
//import Input from '../Components/Inputs';



const SignUp = ({setCurrentPage}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

//handle signup form submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl="";

    if(!fullName){
      setError("Please enter your full name.");
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please enter the correct password.");
      return;
    }

    setError("");

    //Signup API call
    try{
      /* empty */
    }
    // eslint-disable-next-line no-unused-vars
    catch(error){
      /*empty*/
    }
  }
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an account</h3>
      
      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={({target}) => setFullName(target.value)}
            label="FullName"
            placeholder="Kamal"
            type="text"
            />

          <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email"
            placeholder="abcd@example.com"
            type="text"
            />

          <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="password"
            placeholder="Min 8 characters"
            type="password"
            />

        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          Sign Up
        </button>

        <p className="text-[13px] text-slate-800 mt-3">Already have an account?{" "}
          <button 
            className="font-medium text-primary underline cursor-pointer"
            onClick={() =>{
              setCurrentPage("login");
              }}>
            Login
          </button>
        </p>

      </form>

    </div>
  )
}

export default SignUp

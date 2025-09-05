import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';

const CreateResumeForm = () => {

  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
 
  const navigate = useNavigate();

  // Handle Create Resume
  const handleCreateResume = async (e) =>{
    e.preventDefault();

    if (!title) {
      setError("Please enter a resume title");
      return;
    }

    setError("");

    //Create Resume API Call
    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });

      if(response.data?._id){
        navigate(`/resume/${response.data?._id}`);
      }
    } catch (error){
      if (error.response && error.response.data.message) {
        setError (error.response.data.message);
      }
      else{
        setError("Something wrong. Try again");
      }
    }
  };

    
  
  return (
    <div className="w-[90vw] md:w-[70vh] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create new resume</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">Give your resume a title to get started</p>

      <form onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={({target}) => setTitle(target.value)}
          label="Resume title"
          placeholder="Eg: Kamal's Resume"
          type="text"></Input>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type='submit' className='btn-primary'>Create Resume</button>
      </form>
      
    </div>
  )
}

export default CreateResumeForm
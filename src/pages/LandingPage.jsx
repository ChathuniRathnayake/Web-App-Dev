{/*import React from 'react'
import IMAGE from '../assets/image.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LandingPage = () => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [openAuthModal, setOpenAuthModal] = useState (false);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {};
  return (
    <div className="w-full min-h-full bg-white">
      <div className="container mx-auto px-4 py-6">       */}
        {/* Header Section */}{/*}
        <header  className="flex justify-between items-center mb-16">
          <div className="text-xl font-bold">Resume Builder</div>
          <button
            className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
            onClick={() => setOpenAuthModal(true)}>
            Login / Sign Up
          </button>
        </header>*/}

        {/*image content*/}{/*}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Build Your{""}
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
                Resume effortlessly
              </span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Create a professional resume in minutes with our easy-to-use builder.
            </p>
            <button
              classname="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={handleCTA}>
                Get Started
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={IMAGE}
              alt="image"
              className="w-full rounded-lg"
              />
          </div>
        </div>
        

      </div>
    </div>
  )
}

export default LandingPage
*/}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMAGE from '../assets/image.png'
import Modal from '../Components/Modal';

const LandingPage = () => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [openAuthModal, setOpenAuthModal] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    // Logic for handling the main call to action
    console.log("Create My Resume button clicked!");
  };

  const handleLogin = () => {
    setOpenAuthModal(true);
    setCurrentPage("login");
    console.log("Log In button clicked!");
  };

  const handleSignUp = () => {
    setOpenAuthModal(true);
    setCurrentPage("signup");
    console.log("Sign Up button clicked!");
  };

  return (
    <div className="w-full min-h-screen bg-[#F0F7FF] font-sans">
      <div className="container mx-auto px-4 py-6">

        {/* Header Section */}
        <header className="flex justify-between items-center px-8">
          <div className="flex items-center space-x-2">
            {/* Using an SVG for the logo icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-[#007BFF]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="3" x2="16" y2="21"></line>
              <line x1="8" y1="3" x2="8" y2="21"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
            </svg>
            <div className="text-2xl font-bold text-[#1F2937]">Resumate</div>
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-[#007BFF] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#0056b3] transition-colors cursor-pointer"
              onClick={handleLogin}
            >
              Log In
            </button>
            <button
              className="bg-transparent border-2 border-[#007BFF] text-[#007BFF] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#007BFF] hover:text-white transition-colors cursor-pointer"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center py-12">
          <div className="w-full md:w-1/2 px-15 mb-4 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 leading-tight text-[#1F2937]">
              A Smarter Resume <br />for a Smarter Career
            </h1>
            <p className="text-lg text-[#4B5563] mb-8">
              Just click, fill, and go pro.
            </p>
            <button
              className="bg-[#007BFF] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#0056b3] transition-colors cursor-pointer shadow-lg"
              onClick={handleCTA}
            >
              Create My Resume
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={IMAGE}
              alt="Resume Template"
              className="max-w-xs md:max-w-sm lg:max-w-md rounded-lg "
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="py-10 text-center">
          <h2 className="text-4xl font-bold mb-12 text-[#1F2937]">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            {/* Feature Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-2 text-[#1F2937]">Easy Editing</h3>
              <p className="text-base text-[#4B5563]">
                Update your resume sections easily and instant formatting
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-2 text-[#1F2937]">Choose your vibe</h3>
              <p className="text-base text-[#4B5563]">
                Customize templates with our color palettes
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-2 text-[#1F2937]">Easy Download</h3>
              <p className="text-base text-[#4B5563]">
                Download your resume as a PDF in one click!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        is0pen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader>
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage}/>
          )}
        </div>
      </Modal>


    </div>
  );
};

export default LandingPage;

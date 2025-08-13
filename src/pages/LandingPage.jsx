import React from 'react'
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
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <header  className="flex justify-between items-center mb-16">
          <div className="text-xl font-bold">Resume Builder</div>
          <button
            className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
            onClick={() => setOpenAuthModal(true)}>
            Login / Sign Up
          </button>
        </header>

        {/*image content*/}
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

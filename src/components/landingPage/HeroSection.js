// src/components/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import landingImage from '../../assets/landingImage.jpg';

const HeroSection = () => {
  return (
    <div className="relative px-12 flex h-[100vh] w-full">
      {/* Top corner text */}
      <div className="absolute top-4 left-4 rounded-l-full rounded-r-full text-white bg-gradient-to-r from-blue-500 to-purple-400 flex p-2 pr-8">
      <i className="pi pi-slack text-2xl text-white">&nbsp;</i> <h2 className="text-2xl font-bold text-white">Ultimate Dashboard</h2>
      </div>

      <div className="flex flex-col justify-center items-start p-6 text-blue-600">
        <div className="flex flex-col max-w-[500px]">
          <h1 className="text-5xl font-extrabold text-indigo-500 mb-4">Welcome to</h1>
          <h1 className="text-5xl text-purple-500 font-extrabold mb-4">Universal Dashboard</h1>
          <p className="py-4 mb-6">
            Manage your websites and databases effortlessly with our intuitive platform. 
            Gain insights, streamline workflows, and enhance productivity with powerful tools designed for everyone.
          </p>
          <div className="flex space-x-4">
            <Link to="/login" className="inline-block px-8 py-4 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:bg-blue-700 transition">
              Login
            </Link>
            <Link to="/signup" className="inline-block px-8 py-4 text-blue-600 bg-white border border-blue-600 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center relative">
        <img 
          src={landingImage} 
          alt="Landing" 
          className="object-contain max-h-full w-auto" 
        />
      </div>
    </div>
  );
};

export default HeroSection;

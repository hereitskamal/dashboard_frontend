// src/pages/LandingPage.js
import React from 'react';
import HeroSection from '../components/landingPage/HeroSection';
import FeaturesSection from '../components/landingPage/FeaturesSection';
import PricingSection from '../components/landingPage/PricingSection';

const LandingPage = () => {
  return (
    <div className="relative">
      <HeroSection />
      <div className="w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 mb-4 shadow-inner"></div>
      <FeaturesSection />
      <PricingSection />
    </div>
  );
};

export default LandingPage;

// src/components/PricingSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      features: [
        "1 Module",
        "Add up to 5 Products",
        "1 Event",
        "1 Company Registration"
      ],
      price: "0",
    },
    {
      name: "Basic",
      features: [
        "3 Modules",
        "Add up to 50 Products",
        "5 Events",
        "5 Company Registrations"
      ],
      price: "999", // Example price in INR
    },
    {
      name: "Pro",
      features: [
        "Unlimited Modules",
        "Add up to 200 Products",
        "Unlimited Events",
        "Unlimited Company Registrations"
      ],
      price: "1999", // Example price in INR
    },
  ];

  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
        <h2 className="text-4xl font-bold leading-tight text-center text-purple-600 mb-8">Pricing Plans</h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="flex flex-col lg:gap-2 sm:flex-row justify-center pt-12 my-12 sm:my-4">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-lg bg-white mt-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex-1 bg-white text-gray-600 rounded-t-lg overflow-hidden">
                <div className="p-8 text-3xl font-bold text-center border-b-4 border-purple-500">{plan.name}</div>
                <ul className="w-full text-center text-sm">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="border-b py-4">{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b-lg overflow-hidden p-6">
                <div className="w-full pt-6 text-3xl text-gray-600 font-bold text-center">₹{plan.price}</div>
                <div className="flex items-center justify-center">
                  <Link to="/signup" className="mx-auto lg:mx-0 hover:underline bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg transition transform hover:scale-105">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

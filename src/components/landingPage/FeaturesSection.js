// src/components/FeaturesSection.js
import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      title: "Real-time Database Updates",
      items: [
        "Instant updates",
        "Seamless sync",
        "Always fresh content",
      ]
    },
    {
      title: "User-Friendly Interface",
      items: [
        "Intuitive design",
        "Easy navigation",
        "All skill levels welcome",
      ]
    },
    {
      title: "High Security",
      items: [
        "Data encryption",
        "User authentication",
        "Regular backups",
      ]
    },
    {
      title: "Cross-Platform Compatibility",
      items: [
        "Accessible on all devices",
        "Sync across platforms",
        "Consistent user experience",
      ]
    },
    {
      title: "Customizable Dashboard",
      items: [
        "Personalized layouts",
        "Widgets for insights",
        "User-defined settings",
      ]
    },
    {
      title: "24/7 Customer Support",
      items: [
        "Dedicated support team",
        "Live chat available",
        "Comprehensive FAQs",
      ]
    },
  ];

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4 pt-4 pb-12">
        <h2 className="text-4xl font-bold text-center text-purple-600 mb-6">Key Features</h2>
        <div className="w-full mb-6">
          <div className="h-1 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 w-32 opacity-25 rounded"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl text-gray-800 font-semibold mb-3">{feature.title}</h3>
              <ul className="list-disc list-inside text-gray-600">
                {feature.items.map((item, idx) => (
                  <li key={idx} className="py-1">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

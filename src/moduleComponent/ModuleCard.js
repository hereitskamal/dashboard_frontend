import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ModuleCard = ({ module }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex items-center justify-between p-2 rounded-lg shadow-sm transition-shadow hover:shadow-lg cursor-pointer
        ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-800 border-gray-300'}
      `}
    >
      {/* Module Icon */}
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
        <i className={`pi ${module.icon || ' pi-list'} text-l`}></i>
      </div>

      {/* Module Details */}
      <div className="flex-1 ml-4">
        <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
          {module.label}
        </p>
      </div>
    </div>
  );
};

export default ModuleCard;

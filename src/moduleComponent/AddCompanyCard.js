import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Tag } from 'primereact/tag';

const AddCompanyCard = ({ onClick }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="col-12 md:col-6 lg:col-4">
      <div
        className={`shadow-sm rounded-lg cursor-pointer hover:shadow-xl transition-shadow p-5 flex flex-col justify-center items-center ${isDarkMode ? 'bg-gray-800 text-gray-50' : 'bg-white text-gray-800'}`}
        onClick={onClick}
      >
        {/* Icon */}
        <div className="flex justify-center items-center mb-4">
          <i className={`pi pi-plus-circle text-4xl ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}></i>
        </div>

        {/* Text */}
        <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Add New Company
        </p>

        {/* Tag */}
        <Tag
          value="Create"
          className={`mt-2 ${isDarkMode ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-600'}`}
          icon="pi pi-plus"
          rounded
        />
      </div>
    </div>
  );
};

export default AddCompanyCard;

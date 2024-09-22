import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'primereact/tag'; 
import { useTheme } from '../contexts/ThemeContext';

const CompanyCard = ({ company, onClick }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleClick = () => {
    if (onClick) {
      onClick(company);
    }
    navigate(`/${company._id}`);
  };

  return (
    <div className="col-12 md:col-6 lg:col-4 ">
      <div
        className={` ${isDarkMode ? "bg-gray-800 text-gray-50" : "bg-white text-gray-800"} shadow-sm rounded-lg cursor-pointer hover:shadow-xl transition-shadow p-5`}
        onClick={handleClick}
      >
        {/* Company Header */}
        <div className="flex justify-between items-center mb-4">
          {/* Company Name and Admin */}
          <div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
              {company.name.length < 16 ? company.name : `${company.name.slice(0, 15)}...`}
            </h2>


            <Tag
              value={company.admin}
              className={`bg-green-100 text-green-900 mt-2 ${isDarkMode ? "bg-green-800 text-green-300" : ""}`}
              icon="pi pi-user"
              rounded
            />
          </div>
        </div>

        {/* Company Start Date */}
        <div className="mb-2 text-vsm">
          <i className={`pi pi-calendar ${isDarkMode ? "text-blue-300" : "text-blue-500"} mr-2`}></i>
          <span className={`text-gray-700 ${isDarkMode ? "text-gray-400" : ""}`}>Started on: </span>
          <span className={`font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
            {new Date(company.startDate).toLocaleDateString()}
          </span>
        </div>

        {/* Employee Range */}
        <div className="mb-2 text-vsm">
          <i className={`pi pi-users ${isDarkMode ? "text-blue-300" : "text-blue-500"} mr-2`}></i>
          <span className={`text-gray-700 ${isDarkMode ? "text-gray-400" : ""}`}>Employees: </span>
          <span className={`font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
            {company.employeeRange}
          </span>
        </div>

        {/* Contact Number */}
        <div className="mb-2 text-vsm">
          <i className={`pi pi-phone ${isDarkMode ? "text-blue-300" : "text-blue-500"} mr-2`}></i>
          <span className={`text-gray-700 ${isDarkMode ? "text-gray-400" : ""}`}>Contact: </span>
          <span className={`font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
            {company.contactNumber}
          </span>
        </div>

        {/* Address */}
        {company.address && (
          <div className="mb-2 text-vsm">
            <i className={`pi pi-map-marker ${isDarkMode ? "text-blue-300" : "text-blue-500"} mr-2`}></i>
            <span className={`text-gray-700 ${isDarkMode ? "text-gray-400" : ""}`}>Location: </span>
            <span className={`font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
              {company.address.city}, {company.address.state}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;

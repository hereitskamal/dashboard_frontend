import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { useTheme } from '../../contexts/ThemeContext';
import { Dialog } from 'primereact/dialog';
import UserDetailsForm from './UserDetailsForm';
import CompanyForm from '../../moduleComponent/CompanyForm'; // Import CompanyForm component

const Navbar = ({ company}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [user, setUser] = useState(null); // State to hold user details
  const [isUserDetailsModalOpen, setUserDetailsModalOpen] = useState(false);

  // Fetch user details from session storage
  useEffect(() => {
    const userDetails = JSON.parse(sessionStorage.getItem('user'));
    setUser(userDetails);
  }, []);

  const getUserInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return '';
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  const handleAvatarClick = () => {
    setUserDetailsModalOpen(true);
  };



  return (
    <div className={`flex justify-between items-center p-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      {/* Display 'Universal Dashboard' or the selected company name */}
      <div className="flex items-center flex-grow">
        <h1 className={`text-xl px-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {company ? company.name : (<><i className="pi pi-slack">&nbsp;</i>Dashboard</>)}
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Show Create Company Button only if no company is selected */}
        {/* {!company && (
          <Button 
            label="Create Company"
            icon="pi pi-plus"
            onClick={handleCreateCompanyClick}
            className={`p-button-sm ${isDarkMode ? 'p-button-primary' : 'p-button-outlined'}`}
          />
        )} */}
        <Button 
          icon="pi pi-bell" 
          className={`p-button-rounded p-button-text ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'} text-sm`} 
        />

        <div className="relative">
          <Avatar 
            label={user ? getUserInitials(user.firstName, user.lastName) : 'U'} // Use user initials or fallback to 'U'
            className={`${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'} cursor-pointer`} 
            onClick={handleAvatarClick}
          />
          {/* Display crown icon if the user has the specific registrationType */}
          {user && user.registrationType === "K_%%110_%%545" && (
            <i 
              className={`pi pi-crown absolute -top-2 -left-2 ${isDarkMode ? 'text-yellow-300' : 'text-green-500'}`} 
              style={{ fontSize: '1rem' }}
            ></i>
          )}
        </div>

        <Button 
          icon={isDarkMode ? 'pi pi-sun' : 'pi pi-moon'} 
          onClick={toggleTheme}
          className={`p-button-rounded p-button-text ${isDarkMode ? 'text-yellow-500 hover:bg-gray-700' : 'text-blue-500 hover:bg-gray-200'} text-sm`}
        />
      </div>

      {/* User Details Modal */}
      <Dialog
        header="User Details"
        visible={isUserDetailsModalOpen}
        style={{ width: '50vw' }}
        onHide={() => setUserDetailsModalOpen(false)}
        className="p-dialog p-component"
      >
        {user ? (
          <UserDetailsForm user={user} onClose={() => setUserDetailsModalOpen(false)} />
        ) : (
          <p>Loading user details...</p>
        )}
      </Dialog>

      {/* Create Company Modal */}
      
    </div>
  );
};

export default Navbar;

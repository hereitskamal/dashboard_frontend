// src/components/DashboardUserForm.js
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const UserDetailsForm = ({ user, onClose }) => {
  const registrationTypes = [
    { label: 'Client', value: 'client' },
    { label: 'Employee', value: 'employee' },
    { label: 'Admin', value: 'admin' }
  ];
  const bloodGroups = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' }
  ];
  const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  return (
    <div className="p-4">
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-800 font-semibold mb-2">First Name</label>
            <InputText
              id="firstName"
              value={user.firstName}
              className="w-full p-3 border border-gray-300 rounded-lg"
              disabled
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-gray-800 font-semibold mb-2">Last Name</label>
            <InputText
              id="lastName"
              value={user.lastName}
              className="w-full p-3 border border-gray-300 rounded-lg"
              disabled
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Email</label>
            <InputText
              id="email"
              value={user.email}
              className="w-full p-3 border border-gray-300 rounded-lg"
              disabled
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-gray-800 font-semibold mb-2">Username</label>
            <InputText
              id="username"
              value={user.username}
              className="w-full p-3 border border-gray-300 rounded-lg"
              disabled
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="registrationType" className="block text-gray-800 font-semibold mb-2">Registration Type</label>
            <Dropdown
              id="registrationType"
              value={user.registrationType}
              options={registrationTypes}
              disabled
              className="w-full border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="bloodGroup" className="block text-gray-800 font-semibold mb-2">Blood Group</label>
            <Dropdown
              id="bloodGroup"
              value={user.bloodGroup}
              options={bloodGroups}
              disabled
              className="w-full border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="gender" className="block text-gray-800 font-semibold mb-2">Gender</label>
            <Dropdown
              id="gender"
              value={user.gender}
              options={genders}
              disabled
              className="w-full border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="contactNumber" className="block text-gray-800 font-semibold mb-2">Contact Number</label>
            <InputText
              id="contactNumber"
              value={user.contactNumber}
              className="w-full p-3 border border-gray-300 rounded-lg"
              disabled
            />
          </div>
        </div>

        {user.registrationType === 'employee' && (
          <div className="mb-4">
            <label htmlFor="employeeID" className="block text-gray-800 font-semibold mb-2">Employee ID</label>
            <InputText
              id="employeeID"
              value={user.employeeID}
              className="w-full p-3 border border-gray-300 rounded-lg"
              disabled
            />
          </div>
        )}

        <div className="flex justify-end">
          <Button label="Close" icon="pi pi-times" onClick={onClose} className="p-button-secondary" />
        </div>
      </form>
    </div>
  );
};

export default UserDetailsForm;

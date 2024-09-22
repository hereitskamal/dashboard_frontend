import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { createCompany, fetchAllModules } from '../services/api';

const numberOfEmployeesOptions = [
  { label: '0-10', value: '0-10' },
  { label: '10-50', value: '10-50' },
  { label: '50-100', value: '50-100' },
  { label: '100-500', value: '100-500' },
  { label: '500-1000', value: '500-1000' },
  { label: '1000-5000', value: '1000-5000' },
  { label: '5000-10000', value: '5000-10000' },
  { label: '10000+', value: '10000+' }
];

const CompanyForm = ({ setCompany }) => {
  const [name, setName] = useState('');
  const [uuid, setUuid] = useState('');
  const [selectedModules, setSelectedModules] = useState([]);
  const [availableModules, setAvailableModules] = useState([]);
  const [admin, setAdmin] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [employeeRange, setEmployeeRange] = useState(null);
  const [address, setAddress] = useState({ city: '', state: '', country: '', mapLink: '' });
  const [contactNumber, setContactNumber] = useState('');
  const toast = React.useRef(null); // Toast reference for notifications

  useEffect(() => {
    const loadModules = async () => {
      try {
        const modules = await fetchAllModules();
        const formattedModules = modules.map(module => ({
          label: module.label,
          value: module._id
        }));
        setAvailableModules(formattedModules);
      } catch (error) {
        console.error('Failed to fetch modules:', error);
      }
    };
    loadModules();
  }, []);

  const handleSubmit = async () => {
    if (name && uuid && selectedModules.length && admin && adminEmail && startDate && employeeRange && address.city && address.state && address.country && address.mapLink && contactNumber) {
      try {
        const companyData = {
          name,
          uuid,
          modules: selectedModules,
          admin,
          adminEmail,
          startDate,
          employeeRange,
          address,
          contactNumber
        };
        const createdCompany = await createCompany(companyData);
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Company created successfully!' });
        setCompany(createdCompany);
        
      } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to create company.' });
        console.error('Failed to create company:', error);
      }
    } else {
      toast.current.show({ severity: 'warn', summary: 'Validation Error', detail: 'Please fill all required fields.' });
    }
  };

  const handleClear = () => {
    setName('');
    setUuid('');
    setSelectedModules([]);
    setAdmin('');
    setAdminEmail('');
    setStartDate(null);
    setEmployeeRange(null);
    setAddress({ city: '', state: '', country: '', mapLink: '' });
    setContactNumber('');
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="uuid" className="block text-sm font-medium text-gray-700 mb-2">UUID</label>
          <InputText
            id="uuid"
            value={uuid}
            onChange={(e) => setUuid(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="modules" className="block text-sm font-medium text-gray-700 mb-2">Select Modules</label>
          <MultiSelect
            id="modules"
            options={availableModules}
            value={selectedModules}
            onChange={(e) => setSelectedModules(e.value)}
            optionLabel="label"
            placeholder="Select Modules"
            className="w-full"  
            display="chip"
          />
        </div>
        <div>
          <label htmlFor="admin" className="block text-sm font-medium text-gray-700 mb-2">Company Admin</label>
          <InputText
            id="admin"
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-2">Admin Email ID</label>
          <InputText
            id="adminEmail"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Company Starting Date</label>
          <Calendar
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.value)}
            dateFormat="yy-mm-dd"
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="employeeRange" className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
          <Dropdown
            id="employeeRange"
            options={numberOfEmployeesOptions}
            value={employeeRange}
            onChange={(e) => setEmployeeRange(e.value)}
            placeholder="Select Number of Employees"
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <InputText
            id="city"
            value={address.city}
            onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <InputText
            id="state"
            value={address.state}
            onChange={(e) => setAddress(prev => ({ ...prev, state: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <InputText
            id="country"
            value={address.country}
            onChange={(e) => setAddress(prev => ({ ...prev, country: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="mapLink" className="block text-sm font-medium text-gray-700 mb-2">Google Maps Link</label>
          <InputText
            id="mapLink"
            value={address.mapLink}
            onChange={(e) =>             setAddress(prev => ({ ...prev, mapLink: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
          <InputText
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button
          label="Clear"
          icon="pi pi-times"
          className="p-button-secondary"
          onClick={handleClear}
        />
        <Button
          label="Save"
          icon="pi pi-check"
          className="p-button-primary"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CompanyForm;


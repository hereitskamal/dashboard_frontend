import React, { useState } from 'react';
import UserModule from '../features/Users/UserModule';
import ProductsModule from '../features/Products/ProductsModule';
import EventModule from '../features/Events/EventModule';
import CompanyForm from './CompanyForm';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { useTheme } from '../contexts/ThemeContext';
import ModuleCard from './ModuleCard';
import { Dialog } from 'primereact/dialog';
import AddCompanyCard from './AddCompanyCard';
import CompanyCard from './CompanyCard';

const ModuleComponent = ({
  module,
  companyId,
  companies,
  onCompanySelect,
  modulesCount,
  companiesCount,
  onCompanyCreated,
  modules,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState('company'); 
  const { isDarkMode } = useTheme(); 
  const [isCreateCompanyOpen, setCreateCompanyOpen] = useState(false); 

  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  const handleCreateCompanyClick = () => {
    setCreateCompanyOpen(true);
  };
  const handleCompanyCreation = (newCompany) => {
    setCreateCompanyOpen(false);
    onCompanyCreated(newCompany);
  };
  const renderModuleContent = () => {
    if (!module) {
      return (
        <Card
          title="Module Not Found"
          className={`p-mt-4 p-p-4 ${isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'}`}
        >
          Module not found
        </Card>
      );
    }

    switch (module.label) {
      case 'Users':
        return <UserModule companyId={companyId} />;
      case 'Products':
        return <ProductsModule companyId={companyId} />;
      case 'Events':
        return <EventModule companyId={companyId} />;
      default:
        return (
          <Card
            title={module.label}
            className={`p-mt-4 p-p-4 ${isDarkMode ? 'text-gray-300 bg-gray-800' : 'text-gray-800 bg-white'}`}
          >
            <p>Content for {module.label} in Company ID: {companyId}</p>
          </Card>
        );
    }
  };

  return (
    <div className="flex-1 p-2 px-6">
      {/* Overview Section */}


      {/* Conditional Form and Companies/Modules Display */}
      {companyId ? (
        renderModuleContent()
      ) : (
        <>
          {isFormVisible && (
            <div>
              <CompanyForm setCompany={(company) => {
                setIsFormVisible(false);
              }} />
              <button
                onClick={handleFormClose}
                className={`mt-4 p-2 rounded-md shadow-md hover:bg-gray-600 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-500 text-white'}`}
              >
                Close
              </button>
            </div>
          )}
          <div className="">
            <div className="mb-4 flex items-center space-x-4">
              {/* Company Tag */}
              <div
                className={`flex items-center space-x-2 shadow rounded-md p-2 cursor-pointer ${isDarkMode ? 'bg-gray-800' : 'bg-white'} ${selectedTag === 'company' ? 'ring-2 ring-green-500' : ''}`}
                onClick={() => setSelectedTag('company')}
              >
                <Tag
                  value={<i className={`pi text-sm pi-building ${isDarkMode ? 'text-green-400' : 'text-green-500'}`}></i>}
                  className={`${isDarkMode ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-600'} rounded-full p-2`}
                />
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Companies: {companiesCount}</p>
              </div>

              {/* Module Tag */}
              <div
                className={`flex items-center space-x-2 shadow rounded-md p-2 cursor-pointer ${isDarkMode ? 'bg-gray-800' : 'bg-white'} ${selectedTag === 'module' ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedTag('module')}
              >
                <Tag
                  value={<i className={`pi text-sm pi-list ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}></i>}
                  className={`${isDarkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'} rounded-full p-2`}
                />
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Modules: {modulesCount}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Add Company Card */}

              {selectedTag === 'company'
                ? <><AddCompanyCard onClick={handleCreateCompanyClick} /> {companies.map((company) => (
                  <CompanyCard
                    key={company._id}
                    company={company}
                    onClick={onCompanySelect}
                    isDarkMode={isDarkMode} // Pass dark mode prop to CompanyCard if needed
                  />
                ))}</>
                : modules.map((moduleItem) => (
                  <ModuleCard
                    key={moduleItem._id}
                    module={moduleItem}
                    isDarkMode={isDarkMode} // Pass dark mode prop to ModuleCard if needed
                  />
                ))}
            </div>
          </div>
          <Dialog
            header="Create a New Company"
            visible={isCreateCompanyOpen}
            style={{ width: '50vw' }}
            onHide={() => setCreateCompanyOpen(false)}
            className="p-dialog p-component"
          >
            <CompanyForm setCompany={handleCompanyCreation} />
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ModuleComponent;

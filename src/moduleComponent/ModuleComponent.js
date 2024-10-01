import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
import Skeleton from '../microComponents/Skeleton';

const ModuleComponent = ({
  module,
  companyId,
  companies,
  onCompanySelect,
  modulesCount,
  companiesCount,
  onCompanyCreated,
  modules,
  isLoading,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState('company');
  const { isDarkMode } = useTheme();
  const [isCreateCompanyOpen, setCreateCompanyOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [companyList, setCompanyList] = useState(companies);

  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  const handleCreateCompanyClick = () => {
    setCreateCompanyOpen(true);
    setShowOverlay(false);
  };

  const handleCompanyCreation = (newCompany) => {
    setCreateCompanyOpen(false);
    onCompanyCreated(newCompany);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedCompanies = Array.from(companyList);
    const [removed] = reorderedCompanies.splice(result.source.index, 1);
    reorderedCompanies.splice(result.destination.index, 0, removed);
    
    setCompanyList(reorderedCompanies);
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
    <div className="flex-1 px-1 py-2 sm:px-6">
      {companyId ? (
        renderModuleContent()
      ) : (
        <>
          {isFormVisible && (
            <div>
              <CompanyForm setCompany={(company) => setIsFormVisible(false)} />
              <button
                onClick={handleFormClose}
                className={`mt-4 p-2 rounded-md shadow-md hover:bg-gray-600 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-500 text-white'}`}
              >
                Close
              </button>
            </div>
          )}
          <div className="relative">
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
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

                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="companies">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex flex-wrap gap-4"
                      >
                        {selectedTag === 'company' ? (
                          <>
                            <div>
                              {/* Overlay */}
                              {showOverlay && (
                                <div
                                  className="absolute -left-[30px] -top-[70px] md:-left-[48px] md:-top-[70px] h-full w-[100vw] md:h-[100vh] bg-blue-400 opacity-50 z-10"
                                  onClick={() => setShowOverlay(false)}
                                />
                              )}

                              {/* Add Company Card */}
                              <div className="relative z-20">
                                <AddCompanyCard onClick={handleCreateCompanyClick} />
                                {showOverlay && (
                                  <div className="absolute top-0 left-0 transform -translate-y-8 bg-green-500 text-white border p-2 rounded shadow-md">
                                    Click to create new company
                                  </div>
                                )}
                              </div>
                            </div>
                            {companyList.map((company, index) => (
                              <Draggable key={company._id} draggableId={company._id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="lg:max-w-[220px] w-full md:w-1/4 lg:w-1/6"
                                  >
                                    <CompanyCard
                                      company={company}
                                      onClick={onCompanySelect}
                                      isDarkMode={isDarkMode}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </>
                        ) : (
                          modules.map((moduleItem) => (
                            <ModuleCard
                              key={moduleItem._id}
                              module={moduleItem}
                              isDarkMode={isDarkMode}
                            />
                          ))
                        )}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </>
            )}
          </div>
          <Dialog
            header="Create a New Company"
            visible={isCreateCompanyOpen}
            className="p-dialog p-component w-9/10 md:w-1/2"
            onHide={() => setCreateCompanyOpen(false)}
          >
            <CompanyForm setCompany={handleCompanyCreation} />
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ModuleComponent;

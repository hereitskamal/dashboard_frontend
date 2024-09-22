import React, { useState, useEffect } from 'react';
import ModuleComponent from '../moduleComponent/ModuleComponent';
import Navbar from '../components/navbar/Navbar'; 
import Sidebar from '../components/Sidebar';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { fetchAllCompanies, fetchAllModules, fetchCompanyById, fetchCompanyModules } from '../services/api';

const UniversalDashboard = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [modules, setModules] = useState([]);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const _Id = "";

  useEffect(() => {
    const sessionData = sessionStorage.getItem('user');
    const userData = sessionData ? JSON.parse(sessionData) : {};
    const registrationType = userData.registrationType;
    const _Id = userData.companyId;
    
    if (registrationType !== 'K_%%110_%%545' && _Id !== "") {
      fetchCompanyData(_Id);
    }
  }, [_Id]);

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      setCompany(null);
      setSelectedModule(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (companyId && location.pathname !== '/dashboard') {
      fetchCompanyData(companyId);
    } else if (location.pathname === '/dashboard') {
      loadAllCompanies();
    }
  }, [companyId, location.pathname]);

  useEffect(() => {
    if (company) {
      loadCompanyModules(company._id);
    } else {
      loadAllModules();
    }
  }, [company]);

  const fetchCompanyData = async (id) => {
    try {
      const companyData = await fetchCompanyById(id);
      setCompany(companyData);
    } catch (error) {
      console.error('Failed to fetch company', error);
    }
  };

  const loadAllCompanies = async () => {
    try {
      const companiesData = await fetchAllCompanies();
      setCompanies(companiesData);
    } catch (error) {
      console.error('Failed to fetch companies', error);
    }
  };

  const loadCompanyModules = async (companyId) => {
    try {
      const modulesData = await fetchCompanyModules(companyId);
      setModules(modulesData);
    } catch (error) {
      console.error('Failed to fetch modules', error);
    }
  };

  const loadAllModules = async () => {
    try {
      const modulesData = await fetchAllModules();
      setModules(modulesData);
    } catch (error) {
      console.error('Failed to fetch all modules', error);
    }
  };

  const handleCompanyCreated = (newCompany) => {
    // Fetch companies again after creating the new company
    loadAllCompanies();
    setCompany(newCompany);
    navigate(`/${newCompany._id}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar company={company}/>
      <div className="flex flex-1">
        {company && (
          <Sidebar
            company={company}
            onSelectModule={setSelectedModule}
            modules={modules}
          />
        )}
        <main className={`flex-1 p-6 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
          {company ? (
            selectedModule ? (
              <ModuleComponent
                company={company}
                module={selectedModule}
                companyId={company._id}
                companies={companies}
                modulesCount={modules.length}
                companiesCount={companies.length}
                modules={modules}
                setCompany={setCompany}
                onCompanyCreated={handleCompanyCreated}
              />
            ) : (
              <div className="text-gray-600">Select a module to view its content.</div>
            )
          ) : (
            <ModuleComponent
              companies={companies}
              modulesCount={modules.length}
              companiesCount={companies.length}
              modules={modules}
              onCompanyCreated={handleCompanyCreated} // Ensure this prop is passed
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default UniversalDashboard;


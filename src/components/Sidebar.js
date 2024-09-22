import React, { useState } from 'react';
import { Menu } from 'primereact/menu';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar = ({ company, onSelectModule, modules }) => {
  const { isDarkMode } = useTheme();
  const [activeModule, setActiveModule] = useState(null); // State to track the active module

  const handleSelectModule = (module) => {
    setActiveModule(module); 
    onSelectModule(module);  
  };

  return (
    <div className={`w-56 h-full p-2 flex flex-col ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex-1">
        {company ? (
          <Menu
            model={modules.map((mod) => ({
              label: mod.label,
              icon: mod.icon,
              className: activeModule?._id === mod._id ? 'bg-blue-200 ' : '',
              command: () => handleSelectModule(mod),
            }))}
            className={`p-menu p-component text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white text-gray-800'}`}
          />
        ) : (
          <div className="space-y-4">
            {/* Placeholder content if no company is selected */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

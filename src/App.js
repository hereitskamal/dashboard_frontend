import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import UniversalDashboard from './pages/UniversalDashboard';
import SignUpPage from './pages/SignUpPage';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';         
import 'primeicons/primeicons.css';                     
import './index.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/:_Id" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<UniversalDashboard />} />
        <Route path="/:companyId" element={<UniversalDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

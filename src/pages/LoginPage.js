import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = React.useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.current.show({ severity: 'warn', summary: 'Input Required', detail: 'Please enter both email and password', life: 3000 });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email: username,
        password: password
      });
  
      const { token, user } = response.data;
  
      if (token && user) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
      }
  
      setLoading(false);
      toast.current.show({ severity: 'success', summary: 'Login Successful', detail: 'Welcome back!', life: 3000 });
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response?.data?.message || 'An unexpected error occurred';
      toast.current.show({ severity: 'error', summary: 'Login Failed', detail: errorMsg, life: 3000 });
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <Toast ref={toast} />
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-4">Don't have an account? 
            <Link to="/signup" className="text-blue-500 hover:underline ml-1">Create today!</Link>
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <InputText
              id="email"
              type="text"
              placeholder="Email address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Checkbox
                id="rememberme"
                onChange={(e) => setChecked(e.checked)}
                checked={checked}
                className="mr-2"
              />
              <label htmlFor="rememberme" className="text-gray-700">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot your password?</Link>
          </div>

          <Button
            label="Sign In"
            icon="pi pi-user"
            type="submit"
            loading={loading}
            className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

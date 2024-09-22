import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the default styles
import axios from 'axios';
import { BloodGroupDropdown, GenderDropdown } from '../utils/CustomDropdowns';

function SignUpPage() {
    const { _Id } = useParams();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        registrationType: '',
        bloodGroup: '',
        employeeID: '',
        gender: '',
        contactNumber: '',
        firstName: '',
        middleName: '',
        lastName: '',
        companyId: _Id || '',
    });
    const [loading, setLoading] = useState(false);
    const toast = React.useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (_Id) {
            setFormData(prevState => ({ ...prevState, registrationType: 'admin' }));
        }
    }, [_Id]);

    const handleChange = (e) => {
        const { id, value, type, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: type === 'file' ? files[0] : value
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.username) errors.username = 'Username is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords must match';
        if (!formData.registrationType) errors.registrationType = 'Registration Type is required';
        if (formData.registrationType === 'employee' && !formData.employeeID) errors.employeeID = 'Employee ID is required';
        if (!formData.gender) errors.gender = 'Gender is required';
        if (!formData.contactNumber) errors.contactNumber = 'Contact Number is required';
        if (!formData.firstName) errors.firstName = 'First Name is required';
        if (!formData.lastName) errors.lastName = 'Last Name is required';
        return errors;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Set registrationType to 'admin' if _Id is present
        if (_Id) {
            setFormData(prevState => ({ ...prevState, registrationType: 'admin' }));
        }

        const errors = validateForm();
        if (Object.keys(errors).length) {
            toast.current.show({ severity: 'error', summary: 'Validation Error', detail: Object.values(errors).join(', '), life: 3000 });
            setLoading(false);
            return;
        }

        try {
             await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            toast.current.show({ severity: 'success', summary: 'Sign Up Successful', detail: 'You can now log in!', life: 3000 });
            navigate('/login');
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Sign Up Failed', detail: 'Please try again', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-6">
            <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-3xl">
                <Toast ref={toast} />
                <div className="text-center mb-8">
                    <h1 className="text-4xl text-gray-900 mb-4">Create an Account</h1>
                    <p className="text-gray-600 mb-6">Already have an account?
                        <Link to="/login" className="text-blue-600 hover:underline font-semibold">Log in here!</Link>
                    </p>
                </div>

                <form onSubmit={handleSignUp}>
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label htmlFor="firstName" className="block text-gray-800 font-semibold mb-2">First Name</label>
                            <InputText
                                id="firstName"
                                type="text"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label htmlFor="middleName" className="block text-gray-800 font-semibold mb-2">Middle Name (optional)</label>
                            <InputText
                                id="middleName"
                                type="text"
                                placeholder="Middle Name"
                                value={formData.middleName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-gray-800 font-semibold mb-2">Last Name</label>
                            <InputText
                                id="lastName"
                                type="text"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Email, Username, and Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Email</label>
                            <InputText
                                id="email"
                                type="text"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-gray-800 font-semibold mb-2">Username</label>
                            <InputText
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="password" className="block text-gray-800 font-semibold mb-2">Password</label>
                            <InputText
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-gray-800 font-semibold mb-2">Confirm Password</label>
                            <InputText
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Conditionally Render Registration Type */}
                    {!_Id && (
                        <div className="mb-4">
                            <label htmlFor="registrationType" className="block text-gray-800 font-semibold mb-2">Register As</label>
                            <Dropdown
                                id="registrationType"
                                value={formData.registrationType}
                                onChange={(e) => handleChange({ target: { id: 'registrationType', value: e.value } })}
                                options={[
                                    { label: 'Client', value: 'client' },
                                    { label: 'Employee', value: 'employee' },
                                    { label: 'Admin', value: 'admin' }
                                ]}
                                placeholder="Select Role"
                                className="w-full border border-gray-300 rounded-lg"
                            />
                        </div>
                    )}

                    {formData.registrationType === 'employee' && (
                        <div className="mb-4">
                            <label htmlFor="employeeID" className="block text-gray-800 font-semibold mb-2">Employee ID</label>
                            <InputText
                                id="employeeID"
                                type="text"
                                placeholder="Employee ID"
                                value={formData.employeeID}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    )}

                    {/* Gender and Contact Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="gender" className="block text-gray-800 font-semibold mb-2">Gender</label>
                            <GenderDropdown
                                value={formData.gender}
                                onChange={(e) => handleChange({ target: { id: 'gender', value: e.value } })}
                                className="w-full border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label htmlFor="contactNumber" className="block text-gray-800 font-semibold mb-2">Contact Number</label>
                            <PhoneInput
                                id="contactNumber"
                                international
                                value={formData.contactNumber}
                                onChange={(value) => setFormData(prevState => ({ ...prevState, contactNumber: value }))}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            />
                        </div>
                    </div>

                    {/* Blood Group */}
                    <div className="mb-4">
                        <label htmlFor="bloodGroup" className="block text-gray-800 font-semibold mb-2">Blood Group</label>
                        <BloodGroupDropdown
                            value={formData.bloodGroup}
                            onChange={(e) => handleChange({ target: { id: 'bloodGroup', value: e.value } })}
                            className="w-full border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        label={loading ? 'Submitting...' : 'Sign Up'}
                        className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg"
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;

import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { useTheme } from '../../contexts/ThemeContext';
import { addUserToCompany, getUsersByCompany } from '../../services/api';

const UserModule = ({ companyId }) => {
    const [users, setUsers] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [userDetails, setUserDetails] = useState({
        companyUser: '',
        email: '',
        mobileNumber: '',
        dob: '',
        address: ''
    });
    const toast = useRef(null);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        fetchUsers();
    }, [companyId]);

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await getUsersByCompany(companyId);
            setUsers(fetchedUsers);
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
        }
    };

    const handleAddUser = async () => {
        const { companyUser, mobileNumber } = userDetails;
        
        if (!companyUser || !mobileNumber) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Name and Mobile number are required' });
            return;
        }

        try {
            await addUserToCompany(companyId, userDetails);
            clearForm();
            setFormVisible(false);
            fetchUsers();
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'User added successfully' });
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
        }
    };

    const clearForm = () => {
        setUserDetails({
            companyUser: '',
            email: '',
            mobileNumber: '',
            dob: '',
            address: ''
        });
    };

    const handleCancel = () => {
        clearForm();
        setFormVisible(false);
    };

    return (
        <div className={`p-6 rounded-lg text-sm ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <div className="flex justify-between">
                <Button 
                    label={isFormVisible ? "Back to List" : "Add User"} 
                    icon={isFormVisible ? "pi pi-arrow-left" : "pi pi-plus"} 
                    onClick={() => setFormVisible(!isFormVisible)} 
                    className="p-button-primary" 
                />
            </div>
            
            {isFormVisible ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {/* Form fields */}
                    <div>
                        <label htmlFor="companyUser" className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
                        <InputText
                            id="companyUser"
                            value={userDetails.companyUser}
                            onChange={(e) => setUserDetails({ ...userDetails, companyUser: e.target.value })}
                            placeholder="User name"
                            className="w-full border border-gray-200 rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <InputText
                            id="email"
                            value={userDetails.email}
                            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                            placeholder="Email"
                            className="w-full border border-gray-200 rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">Mobile Number <span className="text-red-500">*</span></label>
                        <InputText
                            id="mobileNumber"
                            value={userDetails.mobileNumber}
                            onChange={(e) => setUserDetails({ ...userDetails, mobileNumber: e.target.value })}
                            placeholder="Mobile Number"
                            className="w-full border border-gray-200 rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        <InputText
                            id="dob"
                            value={userDetails.dob}
                            onChange={(e) => setUserDetails({ ...userDetails, dob: e.target.value })}
                            placeholder="Date of Birth"
                            className="w-full border border-gray-200 rounded-lg p-2"
                            type="date"
                        />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <InputText
                            id="address"
                            value={userDetails.address}
                            onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                            placeholder="Address"
                            className="w-full border border-gray-200 rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-2 flex justify-end gap-4 mt-6">
                        <Button 
                            label="Clear" 
                            icon="pi pi-refresh" 
                            onClick={clearForm} 
                            className="p-button-secondary" 
                        />
                        <Button 
                            label="Add User" 
                            icon="pi pi-check" 
                            onClick={handleAddUser} 
                            className="p-button-success" 
                        />
                        <Button 
                            label="Cancel" 
                            icon="pi pi-times" 
                            onClick={handleCancel} 
                            className="p-button-danger" 
                        />
                    </div>
                </div>
            ) : (
                users.length > 0 && (
                    <div className="mt-6">
                        <DataTable value={users} paginator rows={10} className="p-datatable-customers text-sm">
                            <Column field="companyUser" header="User Name" sortable />
                            <Column field="email" header="Email" sortable />
                            <Column field="mobileNumber" header="Mobile Number" sortable />
                            <Column field="dob" header="Date of Birth" sortable />
                            <Column field="address" header="Address" sortable />
                        </DataTable>
                    </div>
                )
            )}
            <Toast ref={toast} />
        </div>
    );
};

export default UserModule;

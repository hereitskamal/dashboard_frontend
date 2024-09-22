import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { useTheme } from '../../contexts/ThemeContext';
import ProductForm from './components/ProductForm';
import { addProduct, fetchProducts } from '../../services/api';

const ProductModule = ({ companyId }) => {
    const [products, setProducts] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        description: '',
        category: '',
        sku: '',
        price: '',
        manufacturer: '',
        brand: '',
        dimensions: {
            height: '',
            length: '',
            width: '',
            weight: '',
        },
        materials: [],
        color: [],
        image: '',
        specifications: '',
        features: '',
        instructions: '',
        warranty: '',
        compliance: '',
        targetAudience: '',
        availability: '',
        reviews: '',
        shipping: '',
        returnPolicy: '',
        legalInfo: '',
    });
    const toast = useRef(null);
    const { isDarkMode } = useTheme();

    const loadProducts = useCallback(async () => {
        try {
            const productsData = await fetchProducts(companyId);
            setProducts(productsData);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
        }
    }, [companyId]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]); // Now includes loadProducts as a dependency

    const handleAddProduct = async () => {
        const { name, price, sku } = productDetails;

        if (!name || !price || !sku) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Name, SKU, and Price are required' });
            return;
        }

        try {
            await addProduct(companyId, productDetails);
            clearForm();
            setFormVisible(false);
            loadProducts();
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Product added successfully' });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
        }
    };

    const clearForm = () => {
        setProductDetails({
            name: '',
            description: '',
            category: '',
            sku: '',
            price: '',
            manufacturer: '',
            brand: '',
            dimensions: {
                height: '',
                length: '',
                width: '',
                weight: '',
            },
            materials: [],
            color: [],
            image: '',
            specifications: '',
            features: '',
            instructions: '',
            warranty: '',
            compliance: '',
            targetAudience: '',
            availability: '',
            reviews: '',
            shipping: '',
            returnPolicy: '',
            legalInfo: '',
        });
    };

    const handleCancel = () => {
        clearForm();
        setFormVisible(false);
    };

    const handleBackToList = () => {
        setFormVisible(false);
    };

    return (
        <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <Toast ref={toast} />
            <div className="flex justify-between text-sm">
                <Button
                    label={isFormVisible ? "Back to List" : "Add Product"}
                    icon={isFormVisible ? "pi pi-arrow-left" : "pi pi-plus"}
                    onClick={() => setFormVisible(!isFormVisible)}
                    className="p-button-primary"
                />
            </div>
            {isFormVisible ? (
                <ProductForm
                    productDetails={productDetails}
                    setProductDetails={setProductDetails}
                    clearForm={clearForm}
                    handleAddProduct={handleAddProduct}
                    handleCancel={handleCancel}
                    handleBackToList={handleBackToList}
                />
            ) : (
                products.length > 0 && <div className='pt-6'>
                    <DataTable value={products} paginator rows={10}>
                        <Column field="name" header="Name" />
                        <Column field="sku" header="SKU" />
                        <Column field="price" header="Price" />
                        <Column field="category" header="Category" />
                    </DataTable>
                </div>
            )}
        </div>
    );
};

export default ProductModule;

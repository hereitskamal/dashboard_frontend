import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { formatLabel } from './labelFormatter';
import DimensionsInput from './DimensionsInput';
import { ColorDropdown, MaterialDropdown } from '../../../utils/CustomDropdowns';

const ProductForm = ({ productDetails, setProductDetails, clearForm, handleAddProduct, handleCancel, handleBackToList }) => {
    return (
        <div className="p-6 rounded-lg mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.keys(productDetails).filter(key => !['description', 'instructions'].includes(key)).map((key) => {
                    if (key === 'color') {
                        return (
                            <div key={key} className="p-4 rounded-lg col-span-1">
                                <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-2">{formatLabel(key)}</label>
                                <ColorDropdown
                                    id={key}
                                    value={productDetails[key]}
                                    onChange={(e) => setProductDetails({ ...productDetails, [key]: e.value })}
                                    className="w-full border-gray-300 rounded-lg"
                                />
                            </div>
                        );
                    }
                    if (key === 'materials') {
                        return (
                            <div key={key} className="p-4 rounded-lg col-span-1">
                                <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-2">{formatLabel(key)}</label>
                                <MaterialDropdown
                                    id={key}
                                    value={productDetails[key]}
                                    onChange={(e) => setProductDetails({ ...productDetails, [key]: e.value })}
                                    className="w-full border-gray-300 rounded-lg"
                                />
                            </div>
                        );
                    }
                    if (key === 'dimensions') {
                        return (
                            <div key={key} className="p-2 rounded-lg col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                                <DimensionsInput
                                    dimensions={productDetails.dimensions}
                                    setProductDetails={setProductDetails}
                                    productDetails={productDetails}
                                />
                            </div>
                        );
                    }
                    return (
                        <div key={key} className="p-2 rounded-lg col-span-1">
                            <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-2">{formatLabel(key)}</label>
                            <InputText
                                id={key}
                                value={productDetails[key]}
                                onChange={(e) => setProductDetails({ ...productDetails, [key]: e.target.value })}
                                placeholder={formatLabel(key)}
                                className="w-full border border-gray-200 rounded-lg p-2"
                            />
                        </div>
                    );
                })}

                {/* InputTextarea fields */}
                <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
                    <InputTextarea
                        id="description"
                        value={productDetails.description}
                        onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
                        placeholder="Product Description"
                        rows={5}
                        className="w-full border border-gray-200 rounded-lg p-2"
                    />
                </div>
                <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                    <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">Instructions/Manual</label>
                    <InputTextarea
                        id="instructions"
                        value={productDetails.instructions}
                        onChange={(e) => setProductDetails({ ...productDetails, instructions: e.target.value })}
                        placeholder="Instructions/Manual"
                        rows={5}
                        className="w-full border border-gray-200 rounded-lg p-2"
                    />
                </div>

                {/* Buttons */}
                <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-end gap-4 mt-6">
                    <Button
                        label="Clear"
                        icon="pi pi-refresh"
                        onClick={clearForm}
                        className="p-button-secondary"
                    />
                    <Button
                        label="Add Product"
                        icon="pi pi-check"
                        onClick={handleAddProduct}
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
        </div>
    );
};

export default ProductForm;

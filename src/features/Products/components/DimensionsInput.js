import React from 'react';
import { InputText } from 'primereact/inputtext';
import { formatLabel } from './labelFormatter';

const DimensionsInput = ({ dimensions, setProductDetails, productDetails }) => {
    return (
        <div className="p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions (in cm)</label>
            <div className="flex gap-4">
                {Object.keys(dimensions).map(dimension => (
                    <div key={dimension}>
                        <InputText
                            id={dimension}
                            value={dimensions[dimension]}
                            onChange={(e) => setProductDetails({ 
                                ...productDetails, 
                                dimensions: { 
                                    ...dimensions, 
                                    [dimension]: e.target.value 
                                } 
                            })}
                            placeholder={formatLabel(dimension)}
                            style={{maxWidth:'100px'}}
                            className="w-full border border-gray-200 rounded-lg p-2"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DimensionsInput;

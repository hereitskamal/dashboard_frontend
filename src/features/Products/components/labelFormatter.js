// labelFormatter.js
export const formatLabel = (key) => {
    const labels = {
        name: 'Product Name',
        category: 'Category',
        sku: 'SKU',
        description: 'Product Description',
        price: 'Price',
        manufacturer: 'Manufacturer',
        brand: 'Brand',
        dimensions: 'Dimensions',
        height: 'Height',
        length: 'Length',
        width: 'Width',
        weight: 'Weight',
        materials: 'Materials/Ingredients',
        color: 'Color/Variant',
        image: 'Product Image',
        specifications: 'Specifications',
        features: 'Features',
        instructions: 'Instructions/Manual',
        warranty: 'Warranty Information',
        compliance: 'Compliance/Certifications',
        targetAudience: 'Target Audience',
        availability: 'Availability',
        reviews: 'Product Reviews/Feedback',
        shipping: 'Shipping Information',
        returnPolicy: 'Return Policy',
        legalInfo: 'Legal Information',
    };
    return labels[key] || key;
};

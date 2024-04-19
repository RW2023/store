import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SuccessPage from '../SuccessPage/SuccessPage';
import { db } from '../../firebase';

const ProductDetailsUpload = ({ image }) => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('₦ ');
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); // Initialize useHistory
    const [showSuccessPage, setShowSuccessPage] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const fullName = searchParams.get('fullName') || ''; // Access full name from query parameter
    const email = searchParams.get('email') || '';

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handlePriceChange = (event) => {
        const inputValue = event.target.value;
        // Ensure the Naira sign stays before user input
        if (inputValue.startsWith('₦')) {
            setPrice(inputValue);
        } else {
            setPrice('₦ ' + inputValue);
        }
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleClick = () => {
        setShowSuccessPage(true);
    }

    

    const handleFormSubmit = async (event) => {
        event.preventDefault();

         // Store product details in the database along with user information
     const productData = {
        // User information
        fullName,
        email,
        productName,
        price,
        quantity,
        description,
    };

    // Store product data in the database
    // Example code (replace with your actual database operation)
   await db.collection("products").add(productData);
        // Here you can handle the form submission, for example, by sending data to Firebase
        // Redirect to success page after successful submission
        navigate('/success');
    };

    return (

        <div>
            {image && typeof image !== 'string' && (
                <div>
                    <img src={URL.createObjectURL(image)} alt="Uploaded Product" className="thumbnail" />
                    <button type="button" className="add-more-button">
                        +
                    </button>
                </div>
            )}
            {!showSuccessPage && (
                <form onSubmit={handleFormSubmit}>
                    <input type="text" placeholder="Product Name" value={productName} onChange={handleProductNameChange} />
                    <input type="text" placeholder="Price" value={price} onChange={handlePriceChange} />
                    <input type="number" placeholder="Quantity" value={quantity} onChange={handleQuantityChange} />
                    <textarea placeholder="Description" value={description} onChange={handleDescriptionChange} />
                    <button type="submit" onClick={handleClick}>Add Product</button>
                </form>
            )}
            {showSuccessPage && <SuccessPage />}
        </div>
    );
};

export default ProductDetailsUpload;

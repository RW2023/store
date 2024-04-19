import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../ProductUpload/ProductUpload.css';
import { imageDb } from '../../Config';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { db } from '../../firebase';
import ProductDetailsUpload from '../ProductDetailsUpload/ProductDetailsUpload';

const ProductUpload = () => {
    const navigate = useNavigate(); // initialize useHistory hook
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const fullName = searchParams.get('fullName') || ''; // Access full name from query parameter
    // State to manage the business details input
    const [productDetails, setProductDetails] = useState('');
    const [image, setImage] = useState(''); // State to manage the uploaded image
    const [quantity, setQuantity] = useState(1); // State to manage product quantity
    const [alwaysAvailable, setAlwaysAvailable] = useState(false); // State to manage "always available" checkbox
    const [buttonClicked, setButtonClicked] = useState(false); // State to track button click
    const [showProductDetailsUpload, setShowProductDetailsUpload] = useState(false);
    const email = searchParams.get('email') || '';

    // Function to handle changes in the business details input
    const handleProductDetailsChange = (event) => {
        setProductDetails(event.target.value);
    };

    // Function to handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleClick = async () => {
        const imgRef = ref(imageDb, `files/${v4()}`)
        uploadBytes(imgRef, image)

        // Store product details in the database along with user information
        const productData = {
            // User information
            fullName,
            email,
            image: imgRef.fullPath, // Store the image path instead of the image itself
        };

        // Store product data in the database
        // Example code (replace with your actual database operation)
        await db.collection("products").add(productData);

        // Set the state to indicate button clicked
        setButtonClicked(true);

        setShowProductDetailsUpload(true); // Show ProductDetailsUpload component

    }


    // Function to handle  quantity increment
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    // Function to handle quantity decrement
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Function to handle "always available" checkbox change
    const handleAlwaysAvailableChange = (event) => {
        setAlwaysAvailable(event.target.checked);
    };

    // Function to handle removing the uploaded image
    const handleRemoveImage = () => {
        setImage(null);
    };

    // Event handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Here, you can handle the image upload, for example, by sending it to a server.
        // Navigate to the Dashboard
        navigate('/dashboard');
    };
    return (
        <div className="row">
            <div className="col-md-12">
                {!showProductDetailsUpload && (
                    <><form onSubmit={handleSubmit}>

                        <h1>Let's upload your first product </h1>
                        <fieldset required>
                            {/* Input for image upload */}
                            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} capture="user" className="file-input" />

                            {/* Display the uploaded image and close icon */}
                            {image && (
                                <div className="uploaded-image-container">
                                    <img src={URL.createObjectURL(image)} alt="Uploaded Product" className="uploaded-image" />
                                    <button type="button" className="close-icon" onClick={handleRemoveImage}>
                                        &#x2715;
                                    </button>
                                </div>
                            )}
                            {/* "Always available" checkbox */}
                            <div>
                                <input type="checkbox" id="alwaysAvailable" checked={alwaysAvailable} onChange={handleAlwaysAvailableChange} />
                                <label htmlFor="alwaysAvailable">Always Available</label>
                            </div>
                        </fieldset>
                        <button type="submit" onClick={handleClick} style={{ cursor: 'pointer' }}>
                            {buttonClicked ? "Proceed to add details" : "Add product"}
                        </button>
                    </form><progress max="100" value="75" className="node-js">
                            <div className="progress-bar">
                                <span style={{ width: 50 }}>35%</span>
                            </div>
                        </progress></>
                )}
                {showProductDetailsUpload && <ProductDetailsUpload fullName={fullName} email={email} image={image} />}
            </div>
        </div>
    );
}

export default ProductUpload;

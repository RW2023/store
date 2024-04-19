import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../SignUp/SignUp.css';
import { db } from '../../firebase';
import { getDocs, addDoc, collection, where, query, updateDoc } from 'firebase/firestore';

const CreateBusinessForm = () => {
  const [businessName, setBusinessName] = useState('');
  const navigate = useNavigate(); // initialize useHistory hook
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fullName = searchParams.get('fullName') || ''; // Access full name from query parameter
  console.log("Full Name in CreateBusinessForm:", fullName); // Check if fullName is correctly accessed
  // State to manage the business details input
  const [businessDetails, setBusinessDetails] = useState('');
  const dbref = collection(db, "Auth")
  const [metch, setMetch] = useState([]);
  const email = searchParams.get('email') || '';


  const createBusiness = async () => {
    const matchBusinessName = query(dbref, where('BusinessName', '==', businessName))
    try {
       // Query the document based on the user's email
    const userQuery = query(dbref, where('Email', '==', email));
    const snapshot = await getDocs(userQuery);
    snapshot.forEach(async (doc) => {
      // Update the document with business data
      await updateDoc(doc.ref, { BusinessName: businessName, BusinessDetails: businessDetails });
    });
  } catch (error) {
    alert(error);
  }

  }

  // Function to handle changes in the business name input
const handleBusinessNameChange = (event) => {
  setBusinessName(event.target.value);
};
  // Function to handle changes in the business details input
  const handleBusinessDetailsChange = (event) => {
    setBusinessDetails(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Navigate to the Dashboard

    navigate(`/dashboard?fullName=${fullName}&email=${email}`);
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <form onSubmit={handleSubmit}>
          <h1>{`Hi ${fullName},`}</h1>
          <h1>Let's setup your online shop </h1>
          <fieldset required>
            <input type="text" id="name" name="business_name" placeholder='Business name' value={businessName} onChange={handleBusinessNameChange} />
            <div className="business-details-input">
              {/* Label styled as placeholder */}
              <label htmlFor="business_details" className={businessDetails ? 'input-placeholder hidden' : 'input-placeholder'}>Tells us more about your business</label>
              {/* Textarea for business details */}
              <textarea id="business_details" name="business_details" value={businessDetails} onChange={handleBusinessDetailsChange} />
            </div> </fieldset>
          <button type="submit" onClick={createBusiness}>Create Business</button>
        </form>

        <progress max="100" value="75" class="node-js">
          <div class="progress-bar">
            <span style={{ width: 50 }}>35%</span>
          </div>
        </progress>
      </div>
    </div>
  );
}

export default CreateBusinessForm;

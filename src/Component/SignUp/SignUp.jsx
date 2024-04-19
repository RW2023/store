import React, { useState } from 'react';
import './SignUp.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { getDocs, addDoc, collection, where, query } from 'firebase/firestore';

const SignUpForm = () => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); // initialize useHistory hook
  const dbref = collection(db, "Auth")
  const [metch, setMetch] = useState([]);
  const signup = async () => {
    const matchEmail = query(dbref, where('Email', '==', email))
    try {
      const snapshot = await getDocs(matchEmail)
      const emailMatchingArray = snapshot.docs.map((doc) => doc.data())
      if (emailMatchingArray.length > 0) {
        alert("This Email Address Already Exists")
      }
      else {
        await addDoc(dbref, { Email: email, Name: fullName, Password: password, PhoneNumber: phoneNumber })

      }
    }
    catch (error) {
      alert(error)
    }

  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (confirmPassword && event.target.value !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (password && event.target.value !== password) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
      // Proceed with form submission or further processing
      const fullName = event.target.user_name.value;
      console.log("Full Name:", fullName); // Check if fullName is correctly set

      navigate(`/create-business?fullName=${fullName}&email=${email}`);

    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <form onSubmit={handleSubmit}>
          <h1>Create your account</h1>

          <fieldset required>
            <input type="text" id="name" name="user_name" placeholder='Full name' onChange={(e) => setFullName(e.target.value)} />
            <input type="email" id="mail" name="user_email" placeholder='Email address' onChange={(e) => setEmail(e.target.value)} />
            <input type="phone number" id="phoneNumber" name="user_phonenumber" placeholder='Whatsapp Phone number' onChange={(e) => setPhoneNumber(e.target.value)} />
            <div className="password-input">
              <input type={showPassword ? 'text' : 'password'} value={password} name="user_password" placeholder='Your password' onChange={(e) => setPassword(e.target.value)} />
              <span className="eye-icon" onClick={toggleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="password-input">
              <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={handleConfirmPasswordChange} name="user_confirm_password" placeholder='Confirm Your password' />
              <span className="eye-icon" onClick={toggleShowConfirmPassword}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
          </fieldset>

          <button type="submit" onClick={signup}>Sign Up</button>
        </form>

        <progress max="100" value="35" class="node-js">
          <div class="progress-bar">
            <span style={{ width: 35 }}>35%</span>
          </div>
        </progress>
      </div>
    </div>
  );
}

export default SignUpForm;

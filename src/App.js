import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import SignUp from './Component/SignUp/SignUp';
import CreateBusinessForm from './Component/CreateBusiness/CreateBusinessForm';
import Dashboard from './Component/Dashboard/Dashboard';
import ProductDetailsUpload from './Component/ProductDetailsUpload/ProductDetailsUpload';
import SuccessPage from './Component/SuccessPage/SuccessPage';

function App() {

  return (
    <div className="App">
<Router>
  <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/signup" element={ <SignUp /> }/>
          <Route path='/create-business' element={ <CreateBusinessForm />} />
          <Route path='/dashboard' element={ <Dashboard /> }/>
          <Route path='/productdetailsupload' element={ <ProductDetailsUpload />} />
          <Route path='/success' element={ <SuccessPage />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;

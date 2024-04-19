import React from 'react';
import { Link } from 'react-router-dom';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const SuccessPage = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                
        <div className="success-page">
            <FontAwesomeIcon icon={faCircleCheck} />
            <h2 className="success-message">You have successfully added your product</h2>
            <Link to="/dashboard" className="continue-button">Continue</Link>
        </div>
        </div>
        </div>

    );
}

export default SuccessPage;

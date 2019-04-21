import React from 'react';
import {Link} from "react-router-dom";

const SignedInLinks = () => {
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/createPatient">Add patient</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="#">Logout</Link>
            </li>
        </ul>
    )
};

export default SignedInLinks;
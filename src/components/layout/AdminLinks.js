import React from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import { signOut} from "../../store/actions/authActions"

const AdminLinks = (props) => {
    let hrefLink = '';
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/createPatient">Add patient</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/alarms">Alarms</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href={hrefLink} onClick={props.signOut}>Logout</a>
            </li>
        </ul>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())

    }
};

export default connect(null, mapDispatchToProps)(AdminLinks);
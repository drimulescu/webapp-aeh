import React from 'react';
import {connect} from 'react-redux'
import {signOut} from "../../store/actions/authActions";

const UserLinks = (props) => {
    let hrefLink ='';
    return (
        <ul className="navbar-nav">
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

export default connect(null, mapDispatchToProps)(UserLinks);
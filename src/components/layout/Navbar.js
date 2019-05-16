import React from 'react';
import {Link} from "react-router-dom";
import AdminLinks from './AdminLinks'
import UserLinks from './UserLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
    const { auth } = props;
    const { role } = props;
    const links = role === 'admin' ? <AdminLinks/> : <UserLinks/>;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">BioMed</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                {auth.uid ? links : null}
            </div>
        </nav>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        role: state.firebase.profile.role
    }
};

export default connect(mapStateToProps)(Navbar);
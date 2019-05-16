import React from 'react'
import {connect} from 'react-redux'
import AdminDashboard from "./AdminDashboard";
import {Redirect} from 'react-router-dom'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const Dashboard = ({auth, role, filteredPatients}) => {

    if(!auth.uid) return <Redirect to='/signin' />;
    switch (role) {
        case 'admin':
            return <AdminDashboard filteredPatients={filteredPatients}/>;
        case 'user':
            return <Redirect to={'/patient/' + auth.uid}/>;
        default:
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )

    }

};

const mapStateToProps = (state) => {
    const authId = state.firebase.auth.uid;
    const patients = state.firestore.ordered.patients;
    let filteredPatients = [];
    if (patients !== undefined) {
        filteredPatients = patients.filter(patient => {
            return patient.doctorId === authId;
        })
    }

    return {
        patients: patients,
        filteredPatients: filteredPatients,
        auth: state.firebase.auth,
        role: state.firebase.profile.role,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'patients' }
    ])
)(Dashboard)
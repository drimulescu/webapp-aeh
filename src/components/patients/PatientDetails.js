import React from 'react';
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from 'redux'
import { Redirect } from 'react-router-dom'

const PatientDetails = (props) => {
    const {patient, auth} = props;
    if(!auth.uid) return <Redirect to='/signin' />;
    if (patient) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <p className="font-weight-bold">{patient.firstName} {patient.lastName}</p>
                        <address>{patient.address}</address>
                        <p>{patient.email}</p>
                    </div>
                    <div className="col-md-6 font-weight-bold">
                        <h4>Consultatii</h4>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container mt-5">
                <p>Patient details loading...</p>
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const patients = state.firestore.data.patients;
    const patient = patients ? (patients[id]) : null;
    return {
        patient: patient,
        auth: state.firebase.auth
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'patients'}
    ])
)(PatientDetails)
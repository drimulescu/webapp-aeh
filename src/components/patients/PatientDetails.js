import React from 'react';
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from 'redux'
import {Link, Redirect} from 'react-router-dom'
import {deletePatient} from "../../store/actions/patientActions";
import ConsultationsList from "../consultations/ConsultationsList";

const PatientDetails = (props) => {
    const {patient, auth,consultations} = props;
    if (!auth.uid) return <Redirect to='/signin'/>;
    if (patient) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <p className="font-weight-bold">{patient.firstName} {patient.lastName}</p>
                        <address>{patient.address}</address>
                        <p>{patient.email}</p>
                        <div className='row'>
                            <div className="col-md-3">
                                <span className='float-left'>Min val:</span>
                                <p>{patient.minValue}</p>
                            </div>
                            <div className="col-md-3">
                                <span className='float-left'>Max val:</span>
                                <p>{patient.maxValue}</p>
                            </div>
                        </div>
                        <p>{patient.recommendations}</p>
                        <Link to={'/update/patient/' + patient.id} className="card-link btn btn-primary">Update</Link>
                        <button className='btn btn-danger ml-2' onClick={() => props.deletePatient(patient)}>
                            Delete user
                        </button>
                    </div>
                    <div className="col-md-6 font-weight-bold">
                        <h4 className='float-left mr-5'>Consultations</h4>
                        <Link to={'/createConsultation/' + patient.id} className='btn btn-primary '>Add
                            consultation</Link>
                        <ConsultationsList consultations={consultations}/>
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
    const patients = state.firestore.ordered.patients;
    const patient = patients ? (patients.find(patient => {
        return patient.id === id;
    })) : null;

    let filteredConsultations = [];
    const consultations = state.firestore.ordered.consultations;
    if (consultations) {
        //get consultations assigned to patient
        filteredConsultations = consultations.filter(consultation => {
            return consultation.patientId === id;
        });
        //sort by timestamp
        filteredConsultations.sort((consultation1,consultation2) => {
            return consultation2.timestamp - consultation1.timestamp
        });
    }

    return {
        patient: patient,
        auth: state.firebase.auth,
        consultations: filteredConsultations
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deletePatient: (patient) => dispatch(deletePatient(patient))
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'patients'},
        {collection: 'consultations'}
    ])
)(PatientDetails)
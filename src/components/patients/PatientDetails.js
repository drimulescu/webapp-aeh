import React from 'react';
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from 'redux'
import {Link, Redirect} from 'react-router-dom'
import {deletePatient} from "../../store/actions/patientActions";
import ConsultationsList from "../consultations/ConsultationsList";
import AlarmSummary from '../alarms/AlarmSummary'

const PatientDetails = (props) => {
    const {patient, auth, consultations, alarms, role} = props;
    if (!auth.uid) return <Redirect to='/signin'/>;
    if (patient) {
        return (
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-4 patient-details'>
                        <h4 className='patient-details-title'>Personal info.</h4>
                        <p className="font-weight-bold">{patient.firstName} {patient.lastName}</p>
                        <span className="font-weight-bold">Address</span>
                        <address>{patient.address}</address>
                        <span className="font-weight-bold">Email</span>
                        <p>{patient.email}</p>
                        <div className='row'>
                            <div className="col-md-6">
                                <span className='float-left font-weight-bold'>Heart min: </span>
                                {patient.heartMaxValue ? (<p>{patient.heartMinValue}</p>) : <p>to be set</p>}
                            </div>
                            <div className="col-md-6">
                                <span className='float-left font-weight-bold'>Heart max: </span>
                                {patient.heartMaxValue ? (<p>{patient.heartMaxValue}</p>) : (<p>to be set</p>)}
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-6">
                                <span className='float-left font-weight-bold'>Temp min: </span>
                                {patient.tempMinValue ? (<p>{patient.tempMinValue}</p>) : (<p>to be set</p>)}

                            </div>
                            <div className="col-md-6">
                                <span className='float-left font-weight-bold'>Temp max: </span>
                                {patient.tempMaxValue ? (<p>{patient.tempMaxValue}</p>) : (<p>to be set</p>)}
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-6">
                                <span className='float-left font-weight-bold'>Humidity min: </span>
                                {patient.humidityMinValue ? (<p>{patient.humidityMinValue}</p>) : (<p>to be set</p>)}
                            </div>
                            <div className="col-md-6">
                                <span className='float-left font-weight-bold'>Humidity max: </span>
                                {patient.humidityMaxValue ? (<p>{patient.humidityMaxValue}</p>) : (<p>to be set</p>)}
                            </div>
                        </div>
                        <span className='font-weight-bold'>Recommendations</span>
                        {patient.recommendations ? (
                            <p>{patient.recommendations}</p>
                        ) : (
                            <p>No recommendation yet</p>
                        )}

                        {role === 'admin' ? (
                            <div className='patient-details-buttons'>
                                <Link to={'/update/patient/' + patient.id}
                                      className="card-link btn btn-primary">Update</Link>
                                <button className='btn btn-danger ml-2' onClick={() => props.deletePatient(patient)}>
                                    Delete user
                                </button>
                            </div>
                        ) : null}
                        <div className="btn-group mt-3" role="group" aria-label="First group">
                            <Link to={'/ekg/patient/' + patient.id}
                                  className="card-link btn btn-secondary">Ekg</Link>
                            <Link to={'/pulse/patient/' + patient.id}
                                  className="card-link btn btn-secondary">Pulse</Link>
                            <Link to={'/humidity/patient/' + patient.id}
                                  className="card-link btn btn-secondary">Humidity</Link>
                            <Link to={'/temperature/patient/' + patient.id}
                                  className="card-link btn btn-secondary">Temperature</Link>
                        </div>
                    </div>
                    <div className="col-md-4 patient-consultations">
                        <h4 className='patient-details-title'>Consultations</h4>
                        {role === 'admin' ? (
                            <Link to={'/createConsultation/' + patient.id} className='btn btn-primary '>Add
                                consultation</Link>
                        ) : null}
                        <ConsultationsList consultations={consultations}/>
                    </div>
                    <div className='col-md-4 patient-alarms'>
                        <h4 className='patient-details-title'>Alarms</h4>
                        <div className='alarms-list'>
                            {alarms ? (
                                alarms.map(alarm => {
                                    return (
                                        <AlarmSummary patient={patient} alarm={alarm} key={alarm.id}/>
                                    )
                                })
                            ) : (
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            )}
                            {alarms.length ? (null) : (<h5>No alarms yet</h5>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container mt-5">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
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
        filteredConsultations.sort((consultation1, consultation2) => {
            return consultation2.timestamp - consultation1.timestamp
        });
    }

    const alarms = state.firestore.ordered.alarms;
    let patientAlarms = [];
    if (patient && alarms) {
        patientAlarms = alarms.filter(alarm => {
            return alarm.userId === patient.id;
        })
    }

    if (patientAlarms.length) {
        patientAlarms.sort((alarm1, alarm2) => {
            let comparison = 0;
            if (alarm1.timestamp < alarm2.timestamp) {
                comparison = 1;
            } else if (alarm1.timestamp > alarm2.timestamp) {
                comparison = -1;
            }
            return comparison;
        })
    }

    return {
        patient: patient,
        auth: state.firebase.auth,
        consultations: filteredConsultations,
        alarms: patientAlarms,
        role: state.firebase.profile.role
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
        {collection: 'consultations'},
        {collection: 'alarms'}
    ])
)(PatientDetails)
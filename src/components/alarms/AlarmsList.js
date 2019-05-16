import React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import AlarmSummary from './AlarmSummary'
import {Redirect} from 'react-router-dom'

const AlarmsList = ({alarms, patients, auth, role}) => {
    if (!auth.uid) return <Redirect to='/signin'/>;
    if(role === 'user') return <Redirect to={'/patient/' + auth.uid}/>;
    return (
        <div className="container mt-5">
            <h1 className='col-md-3 offset-md-3 mb-4'>Alarms list</h1>
            <div className='col-md-6 offset-md-3'>
                {alarms && patients ? (
                    alarms.map(alarm => {
                        const patient = getPatientWithId(patients,alarm.userId);
                        return (
                            <AlarmSummary patient={patient} alarm={alarm} key={alarm.id}/>
                        )
                    })
                    ) : (
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
};

function getPatientWithId (patients,id) {
    return patients && patients.find(patient => patient.id === id)
}

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
        alarms: state.firestore.ordered.alarms,
        patients: filteredPatients,
        auth: state.firebase.auth,
        role: state.firebase.profile.role
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'patients'},
        {collection: 'alarms'}
    ])
)(AlarmsList)
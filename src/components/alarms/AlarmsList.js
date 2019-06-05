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
                        if(typeof patient !== 'undefined'){
                            return (
                                <AlarmSummary patient={patient} alarm={alarm} key={alarm.id}/>
                            )
                        } else {
                            return null;
                        }
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
    let patient =  patients && patients.find(patient => patient.id === id);
    console.log(patient,id);
    return patient;
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
    const alarms = state.firestore.ordered.alarms;
    let sortedAlarms=[];
    console.log(alarms);
    if(alarms){
        sortedAlarms = alarms.sort((alarm1, alarm2) => {
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
        alarms: sortedAlarms,
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
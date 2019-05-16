import React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import AlarmSummary from './AlarmSummary'

const AlarmPopup = (props) => {
    const {alarms, patients} = props;
    if (alarms.length) {
        return (
            <div className='alarm-popup'>
                {alarms && patients && alarms.map(alarm => {
                    const patient = patients.find(patient => patient.id === alarm.userId);
                    return (
                        <AlarmSummary patient={patient} alarm={alarm} displayCloseBtn={true} key={alarm.id}/>
                    )
                })}
            </div>
        )
    } else {
        return null
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

    let alarmsToDisplay = [];
    const alarms = state.firestore.ordered.alarms;
    if(alarms){
        alarmsToDisplay = alarms.filter(alarm => {
            return alarm.viewed === false;
        })
    }
    return {
        patients: filteredPatients,
        alarms: alarmsToDisplay
    }
};



export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'patients'},
        {collection: 'alarms'}
    ])
)(AlarmPopup)
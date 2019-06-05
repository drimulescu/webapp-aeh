import React from 'react'
import PatientSummary from './PatientSummary'
import {connect} from 'react-redux'

const PatientsList = ({patients}) => {

    return (
        <div className="patient-list">
            {patients && patients.map(patient => {
                return (
                    <PatientSummary patient={patient} key={patient.id}/>
                )
            })
            }
            {patients.length ? null : (<h3>No patients yet</h3>)}
        </div>
    )
};


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

export default connect(mapStateToProps)(PatientsList)
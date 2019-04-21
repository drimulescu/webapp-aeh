import React from 'react'
import PatientSummary from './PatientSummary'

const PatientsList = ({patients}) => {

    return (
        <div className="patient-list">
            {patients && patients.map(patient => {
                return (
                    <PatientSummary patient = {patient} key={patient.id} />
                )
            } )
        }
        </div>
    )
};

export default PatientsList
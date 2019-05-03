import React from 'react'
import {Link} from "react-router-dom";

const PatientSummary = ({patient}) => {
    console.log(patient);
    return (
        <div className="card bg-light mb-3">
            <div className="card-body">
                <h5 className="card-title">{patient.firstName} {patient.lastName}</h5>
                <p className="card-text">{patient.address}</p>
                {/*<p className="card-text">{patient.email}</p>*/}
                <Link to={'/patient/' + patient.id} className="card-link">Details</Link>
            </div>
        </div>
    )
};

export default PatientSummary
import React from 'react'
import {Link} from 'react-router-dom'

const ConsultationSummary = ({consultation}) => {
    console.log(consultation);
    const date = new Date(consultation.timestamp);
    const displayDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
    console.log(consultation.diagnostic,consultation.timestamp,displayDate);
    return (
        <div className="card bg-light mb-3">
            <div className="card-body">
                <p className="card-text">{consultation.diagnostic}</p>
                <p className='card-text'>{displayDate}</p>
                <Link to={'/consultation/' + consultation.id} className="card-link">Details</Link>
            </div>
        </div>
    )
};

export default ConsultationSummary
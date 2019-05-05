import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from "react-redux-firebase"
import {compose} from 'redux'
import {Link} from 'react-router-dom'

const ConsultationDetails = ({consultation}) => {

    if (consultation) {
        const date = new Date(consultation.timestamp);
        const displayDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();

        return (
            <div className="container mt-5 ">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border border-secondary p-5">
                        <p>{consultation.symptoms}</p>
                        <p>{consultation.presentationReason}</p>
                        <p>{consultation.diagnostic}</p>
                        <p>{consultation.prescription}</p>
                        <p>{consultation.referral}</p>
                        <p>{displayDate}</p>
                        <Link to={'/patient/' + consultation.patientId} className='btn btn-primary mt-3'>Back</Link>
                    </div>
                </div>
            </div>

        )
    } else {
        return (
            <div className="container mt-5">
                Loading... please wait
            </div>
        )
    }

};

const mapStateToProps = (state, ownProps) => {
    const consultationId = ownProps.match.params.id;
    const consultations = state.firestore.ordered.consultations;
    const consultation = consultations ? (consultations.find(consultation => {
        return consultation.id === consultationId;
    })) : null;

    return {
        consultation: consultation
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'consultations'}
    ])
)(ConsultationDetails)
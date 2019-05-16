import React from 'react';
import ConsultationSummary from './ConsultationSummary'

const ConsultationsList = ({consultations}) => {

    return (
        <div className='consultations-list mt-3'>
            {consultations && consultations.map(consultation => {
                return(
                    <ConsultationSummary consultation={consultation} key={consultation.id}/>
                )
            })}
        </div>
    )
};

export default ConsultationsList

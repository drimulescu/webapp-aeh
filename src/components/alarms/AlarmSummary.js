import React from 'react'
import {connect} from 'react-redux'
import {closeAlarmPopup} from "../../store/actions/alarmActions";

const AlarmSummary = ({patient, alarm, displayCloseBtn, closeAlarmPopup}) => {
    if(patient) {
        return (
            <div className='card bg-light mb-3'>
                <h5 className='card-header'>
                    {patient.firstName} {patient.lastName}
                    <i className='material-icons red-warning float-right'>warning</i>
                </h5>
                <div className='card-body'>
                    {alarm.limit === 'above' ? (
                        <span className='card-title'>Pulse above limit <span className='material-icons'>arrow_upward</span> </span>
                    ) : (
                        <span className='card-title'>Pulse below limit <span className='material-icons'>arrow_downward</span> </span>
                    )}
                    {alarm.viewed === true ? (
                        <i className='material-icons float-right'>check_box</i>
                    ) : null}
                    <hr/>
                    {displayCloseBtn ? (
                        <button type='button' className='btn btn-secondary float-left' onClick={() => closeAlarmPopup(alarm)}>Close</button>
                    ) : null}
                    <div className='card-text'><span className='float-right'>{new Date(alarm.timestamp).toDateString()}</span></div>
                </div>
            </div>
        )
    } else {
        return null;
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        closeAlarmPopup : alarm => dispatch(closeAlarmPopup(alarm))
    }
};

export default connect(null, mapDispatchToProps)(AlarmSummary)
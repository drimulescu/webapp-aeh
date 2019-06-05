import React from 'react'
import {connect} from "react-redux"
import {compose} from 'redux'
import {firestoreConnect} from "react-redux-firebase"
import DisplayTemp from "./displayCharts/DisplayTemp"
import {Link} from "react-router-dom";

const Ekg = ({tempList, patient}) => {
    if(tempList){
        tempList.forEach(function(temp){
            temp.timeStamp = convertDate(temp.timeStamp);
        });
        tempList.sort((temp1, temp2) => {
            let comparison = 0;
            if (temp1.timeStamp > temp2.timeStamp) {
                comparison = 1;
            } else if (temp1.timeStamp < temp2.timeStamp) {
                comparison = -1;
            }
            return comparison;
        });

        return (
            <div className='container mt-5'>
                <DisplayTemp tempList={tempList}/>
                <Link to={'/patient/' + patient.id} className='btn btn-secondary mt-4 ml-2'>Back</Link>
            </div>
        )
    } else {
        return (
            <div className='container mt-5'>
                <p>Loading..</p>
            </div>
        )
    }

};

function convertDate(date){
    const year = date.substring(6,10);
    const month = date.substring(3,5);
    const day = date.substring(0,2);
    const time = date.substring(12,20);
    return Date.parse(year + "-" + month + "-" + day + "T" + time);
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const patients = state.firestore.ordered.patients;
    const patient = patients ? (patients.find(patient => {
        return patient.id === id;
    })) : null;
    let tempList = patient && patient.Temp ? patient.Temp : null;

    return {
        tempList,
        patient
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(ownProps => {
        return [
            { collection: 'patients',
                doc: ownProps.match.params.id,
                subcollections: [
                    {
                        collection: 'Temp',
                    }
                ]
            }
        ]
    })
)(Ekg)
import React,{Component} from "react";
import Notifications from './Notifications'
import PatientsList from '../patients/PatientsList'
import { connect } from 'react-redux'
import {firestoreConnect} from "react-redux-firebase"
import {compose} from 'redux'

class Dashboard extends Component {
    render() {
        const {patients} = this.props;

        return(
            <div className='container mt-5'>
                <div className='row'>
                    <div className="col-md-6">
                        <PatientsList patients = {patients}/>
                    </div>
                    <div className="col-md-6">
                        <Notifications/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return{
      patients: state.firestore.ordered.patients
  }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'patients' }
    ])
)(Dashboard)
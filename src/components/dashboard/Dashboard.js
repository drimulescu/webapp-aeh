import React,{Component} from "react";
import Notifications from './Notifications'
import PatientsList from '../patients/PatientsList'
import { connect } from 'react-redux'
import {firestoreConnect} from "react-redux-firebase"
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'

class Dashboard extends Component {
    render() {
        const { patients, auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />;

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
      patients: state.firestore.ordered.patients,
      auth: state.firebase.auth
  }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'patients' }
    ])
)(Dashboard)
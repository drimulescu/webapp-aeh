import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from "react-redux-firebase"
import {compose} from 'redux'
import {updatePatient} from '../../store/actions/patientActions'

class PatientUpdate extends Component {
    state = {};

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.updatePatient(this.state);
        const patientId = this.props.patient.id;
        this.setState({docId : patientId}, () => {
            this.props.updatePatient(this.state).then((resp) => {
                if(resp){
                    this.props.history.push('/patient/' + patientId);
                }
            });
        });
    };

    render() {
        const {patient} = this.props;
        if (patient) {
            return (
                <div className="container mt-5">
                    <form onSubmit={this.handleSubmit} className="p-5">
                        <h3 className='mb-4'>Update patient</h3>
                        <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                            <input type="text" className="form-control" id="firstName" onChange={this.handleChange}
                                   placeholder={patient.firstName}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <input type="text" className="form-control" id="lastName" onChange={this.handleChange}
                                   placeholder={patient.lastName}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" onChange={this.handleChange}
                                   placeholder={patient.address}/>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-md-12'>
                                <span>Heart rate values (min & max)</span>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="minValue">min</label>
                                <input type="text" className="form-control" id="minValue"
                                       onChange={this.handleChange}
                                       placeholder={patient.minValue}/>
                            </div>
                            <div className='form-group col-md-6'>
                                <label htmlFor="maxValue">max</label>
                                <input type="text" className="form-control" id="maxValue"
                                       onChange={this.handleChange}
                                       placeholder={patient.maxValue}/>
                            </div>
                        </div>

                        {/*<div className='text-center'>*/}
                        {/*{authError ? <p className='alert alert-danger mt-2'>{authError}</p> : null}*/}
                        {/*</div>*/}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className="container mt-5">
                    <h3>Loading...</h3>
                </div>
            )

        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const patients = state.firestore.ordered.patients;
    const patient = patients ? (patients.find(patient => {
        return patient.id === id;
    })) : null;
    return {
        patient: patient
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePatient: patient => dispatch(updatePatient(patient))
    }
};

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: 'patients'},
    ]))(PatientUpdate)
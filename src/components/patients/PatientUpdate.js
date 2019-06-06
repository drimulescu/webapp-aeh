import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from "react-redux-firebase"
import {compose} from 'redux'
import {updatePatient} from '../../store/actions/patientActions'
import {Link} from "react-router-dom";

class PatientUpdate extends Component {
    state = {};

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleNumberChange = (e) => {
        if(e.target.value > 1000) {
            e.target.value = 1000;
        }
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.updatePatient(this.state);
        const patientId = this.props.patient.id;
        this.setState({docId: patientId}, () => {
            this.props.updatePatient(this.state).then((resp) => {
                if (resp) {
                    this.props.history.push('/patient/' + patientId);
                }
            });
        });
    };

    render() {
        const {patient, updateError} = this.props;
        if (patient) {
            return (
                <div className="container mt-5">
                    <div className='col-md-6 offset-md-3 border border-secondary patient-update-form'>
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
                                <div className="form-group col-md-6">
                                    <label htmlFor="heartMinValue">Heart rate min</label>
                                    <input type="number" className="form-control" id="heartMinValue"
                                           onChange={this.handleNumberChange}
                                           autoComplete='off'
                                           min='0'
                                           placeholder={patient.heartMinValue}/>
                                </div>
                                <div className='form-group col-md-6'>
                                    <label htmlFor="heartMaxValue">Heart rate max</label>
                                    <input type="number" className="form-control" id="heartMaxValue"
                                           onChange={this.handleNumberChange}
                                           autoComplete='off'
                                           min='0'
                                           max='1000'
                                           placeholder={patient.heartMaxValue}/>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className="form-group col-md-6">
                                    <label htmlFor="tempMinValue">Temperature min</label>
                                    <input type="number" className="form-control" id="tempMinValue"
                                           onChange={this.handleNumberChange}
                                           autoComplete='off'
                                           min='0'
                                           placeholder={patient.tempMinValue}/>
                                </div>
                                <div className='form-group col-md-6'>
                                    <label htmlFor="tempMaxValue">Temperature max</label>
                                    <input type="number" className="form-control" id="tempMaxValue"
                                           onChange={this.handleNumberChange}
                                           autoComplete='off'
                                           min='0'
                                           placeholder={patient.tempMaxValue}/>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className="form-group col-md-6">
                                    <label htmlFor="humidityMinValue">Humidity min</label>
                                    <input type="number" className="form-control" id="humidityMinValue"
                                           onChange={this.handleNumberChange}
                                           autoComplete='off'
                                           min='0'
                                           placeholder={patient.humidityMinValue}/>
                                </div>
                                <div className='form-group col-md-6'>
                                    <label htmlFor="humidityMaxValue">Humidity max</label>
                                    <input type="number" className="form-control" id="humidityMaxValue"
                                           onChange={this.handleNumberChange}
                                           autoComplete='off'
                                           min='0'
                                           placeholder={patient.humidityMaxValue}/>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="recommendations">Activity recommendation</label>
                                <textarea type="text" className="form-control" id="recommendations"
                                          onChange={this.handleNumberChange}
                                          placeholder={patient.recommendations}/>
                            </div>

                            <div className='text-center'>
                                {updateError ? <p className='alert alert-danger mt-2'>{updateError}</p> : null}
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to={'/patient/' + patient.id} className='btn btn-danger ml-2'>Cancel</Link>
                        </form>
                    </div>
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
        patient: patient,
        updateError: state.patient.updateError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePatient: patient => dispatch(updatePatient(patient))
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'patients'},
    ]))(PatientUpdate)
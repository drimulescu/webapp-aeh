import React, {Component} from 'react'
import {connect} from "react-redux"
import { createPatient } from '../../store/actions/patientActions'
import {Redirect} from 'react-router-dom'

class CreatePatient extends Component {
    state = {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        password: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createPatient(this.state);
        this.props.history.push('/');
    };

    render() {
        const {auth} = this.props;
        if(!auth.uid) return <Redirect to='/signin' />;
        return (
            <div className="container mt-5 border border-secondary">
                <form onSubmit={this.handleSubmit} className="p-5">
                    <h3 className='mb-4'>Add patient</h3>
                    <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input type="text" className="form-control" id="firstName" onChange={this.handleChange}
                               placeholder="Enter first name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" className="form-control" id="lastName" onChange={this.handleChange}
                               placeholder="Enter last name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" id="address" onChange={this.handleChange}
                               placeholder="Enter address"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" onChange={this.handleChange}
                               placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" onChange={this.handleChange}
                               placeholder="Enter password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPatient: (patient) => dispatch(createPatient(patient))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePatient)
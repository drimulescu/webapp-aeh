import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createConsultation} from "../../store/actions/consultationActions";

class CreateConsultation extends Component {

    state = {};

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(Date.now());
        this.setState({patientId: this.props.patientId, timestamp: Date.now()}, () => {
            this.props.createConsultation(this.state)
                .then(resp => {
                    if(resp){
                        this.props.history.push('/patient/' + this.props.patientId)
                    }
                });
        })
    };

    render() {
        const {createError} = this.props;
        return (
            <div className="container mt-5 border border-secondary">
                <form onSubmit={this.handleSubmit} className='p-5'>
                    <h3>Create consultation</h3>
                    <div className="form-group">
                        <label htmlFor="diagnostic">Diagnostic</label>
                        <input type="text" className="form-control" id="diagnostic" onChange={this.handleChange}
                               placeholder="Enter diagnostic" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="prescription">Prescription</label>
                        <input type="text" className="form-control" id="prescription" onChange={this.handleChange}
                               placeholder="Enter prescription" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="presentationReason">Presentation Reason</label>
                        <input type="text" className="form-control" id="presentationReason" onChange={this.handleChange}
                               placeholder="Enter presentation reason" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="referral">Referral</label>
                        <input type="text" className="form-control" id="referral" onChange={this.handleChange}
                               placeholder="Enter referral" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="symptoms">Symptoms</label>
                        <input type="text" className="form-control" id="symptoms" onChange={this.handleChange}
                               placeholder="Enter symptoms" required/>
                    </div>
                    <div className='text-center'>
                        {createError ? <p className='alert alert-danger mt-2'>{createError}</p> : null}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps);
    // console.log(state);
    return {
        consultation: state.consultation,
        patientId: ownProps.match.params.id
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createConsultation: consultation => dispatch(createConsultation(consultation))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateConsultation)
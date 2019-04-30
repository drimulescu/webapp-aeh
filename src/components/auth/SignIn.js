import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signIn} from "../../store/actions/authActions"
import {Redirect} from 'react-router-dom'

class SignIn extends Component{
    state = {
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
        this.props.signIn(this.state);
    };
    render() {
        const {authError, auth} = this.props;
        if(auth.uid) return <Redirect to='/' />;
        return (
            <div className="container sign-in-container mt-5">
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 text-center font-weight-normal">BioMed</h1>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input type="email" id="email" onChange={this.handleChange} className="form-control mb-1" placeholder="Email address" required/>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" id="password" onChange={this.handleChange} className="form-control mb-2" placeholder="Password" required/>
                    <div className='text-center'>
                        {authError ? <p className='alert alert-danger mt-2'>{authError}</p> : null}
                    </div>
                    <button className="btn btn-lg btn-primary btn-block mt-2" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; Radu Roman & Andrei Miklos</p>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
};

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
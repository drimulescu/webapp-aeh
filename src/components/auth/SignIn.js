import React, {Component} from 'react';

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
    };
    render() {
        return (
            <div className="container mt-5">
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input type="email" id="email" onChange={this.handleChange} className="form-control" placeholder="Email address" required/>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" id="password" onChange={this.handleChange} className="form-control" placeholder="Password" required/>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; Radu Roman & Andrei Miklos</p>
                </form>
            </div>
        )
    }
}

export default SignIn
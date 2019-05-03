import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import PatientDetails from './components/patients/PatientDetails'
import SignIn from './components/auth/SignIn'
import CreatePatient from './components/patients/CreatePatient'
import PatientUpdate from './components/patients/PatientUpdate'
import {connect} from 'react-redux'

class App extends Component {
    render() {
        const { auth } = this.props;
        return (
            <BrowserRouter>
                <div className='app'>
                    { auth.uid ? <Navbar/> : null }
                    <Switch>
                        <Route exact path='/' component={Dashboard}/>
                        <Route path='/patient/:id' component={PatientDetails}/>
                        <Route path='/update/patient/:id' component={PatientUpdate}/>
                        <Route path='/signin' component={SignIn}/>
                        <Route path='/createPatient' component={CreatePatient}/>
                    </Switch>
                </div>
            </BrowserRouter>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
};

export default connect(mapStateToProps)(App);

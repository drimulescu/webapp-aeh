import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import PatientDetails from './components/patients/PatientDetails'
import SignIn from './components/auth/SignIn'
import CreatePatient from './components/patients/CreatePatient'
import PatientUpdate from './components/patients/PatientUpdate'
import {connect} from 'react-redux'
import CreateConsultation from "./components/consultations/CreateConsultation";
import ConsultationDetails from "./components/consultations/ConsultationDetails";
import AlarmsList from './components/alarms/AlarmsList'
import AlarmPopup from "./components/alarms/AlarmPopup";
import Humidity from "./components/charts/Humidity"
import Temperature from "./components/charts/Temperature"
import Pulse from "./components/charts/Pulse"
import Ekg from "./components/charts/Ekg"

class App extends Component {
    render() {
        const { auth } = this.props;
        return (
            <BrowserRouter>
                <div className='app'>
                    { auth.uid ? (<Navbar/>) : null }
                    { auth.uid ? (<AlarmPopup/>) : null}
                    <Switch>
                        <Route exact path='/' component={Dashboard}/>
                        <Route path='/patient/:id' component={PatientDetails}/>
                        <Route path='/update/patient/:id' component={PatientUpdate}/>
                        <Route path='/signin' component={SignIn}/>
                        <Route path='/createPatient' component={CreatePatient}/>
                        <Route path='/createConsultation/:id' component={CreateConsultation}/>
                        <Route path='/consultation/:id' component={ConsultationDetails}/>
                        <Route path='/alarms' component={AlarmsList}/>
                        <Route path='/humidity/patient/:id' component={Humidity}/>
                        <Route path='/temperature/patient/:id' component={Temperature}/>
                        <Route path='/pulse/patient/:id' component={Pulse}/>
                        <Route path='/ekg/patient/:id' component={Ekg}/>

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

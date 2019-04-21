import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import PatientDetails from './components/patients/PatientDetails'
import SignIn from './components/auth/SignIn'
import CreatePatient from './components/patients/CreatePatient'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <Navbar/>
          <Switch>
              <Route exact path='/' component={Dashboard}/>
              <Route path='/patient/:id' component={PatientDetails}/>
              <Route path='/signin' component={SignIn}/>
              <Route path='/createPatient' component={CreatePatient}/>
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;

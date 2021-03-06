import authReducer from './authReducer'
import patientReducer from './patientReducer'
import {combineReducers} from 'redux'
import {firestoreReducer} from "redux-firestore"
import {firebaseReducer} from "react-redux-firebase";
import consultationReducer from "./consultationReducer";
import alarmReducer from "./alarmReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    patient: patientReducer,
    consultation: consultationReducer,
    alarm: alarmReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer
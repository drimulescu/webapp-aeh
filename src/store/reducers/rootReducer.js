import authReducer from './authReducer'
import patientReducer from './patientReducer'
import {combineReducers} from 'redux'
import {firestoreReducer} from "redux-firestore"

const rootReducer = combineReducers({
    auth: authReducer,
    patient: patientReducer,
    firestore: firestoreReducer
});

export default rootReducer
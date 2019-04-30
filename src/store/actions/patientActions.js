import firebaseSecondary from '../../config/fbConfigToCreatePatient'

export const createPatient = (patient) => {
    return (dispatch, getState, {getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        return firebaseSecondary.auth().createUserWithEmailAndPassword(
            patient.email,
            patient.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                role:'user'
            })
        }).then(() => {
            return firebaseSecondary.auth().signOut();
        })
        .then(() => {
            return firestore.collection('patients').add({
                ...patient,
            })
        }).then(() => {
            dispatch({type: 'CREATE_PATIENT', patient});
            return true;
        }).catch(err => {
            dispatch({type: 'CREATE_PATIENT_ERROR', err});
            return false;
        })
    }
};
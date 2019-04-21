export const createPatient = (patient) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

        const firestore = getFirestore();
        firestore.collection('patients').add({
            ...patient,
        }).then(() => {
            dispatch({type: 'CREATE_PATIENT', patient});
        }).catch((err) => {
            dispatch({type: 'CREATE_PATIENT_ERROR', err});
        })
    }
};
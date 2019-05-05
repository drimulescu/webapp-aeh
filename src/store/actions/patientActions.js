import firebaseSecondary from '../../config/fbConfigToCreatePatient'

export const createPatient = (patient) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        return firebaseSecondary.auth().createUserWithEmailAndPassword(
            patient.email,
            patient.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                role: 'user'
            }).then(() => {
                return firestore.collection('patients').doc(resp.user.uid).set({
                    ...patient
                });
            })
        }).then(() => {
            return firebaseSecondary.auth().signOut();
        }).then(() => {
            dispatch({type: 'CREATE_PATIENT', patient});
            return true;
        }).catch(err => {
            dispatch({type: 'CREATE_PATIENT_ERROR', err});
            return false;
        })
    }
};

export const updatePatient = (patient) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        const docId = patient.docId;
        delete patient.docId;

        return firestore.collection('patients').doc(docId).update({
            ...patient
        }).then(() => {
            dispatch({type: 'UPDATE_PATIENT'});
            return true;
        }).catch(err => {
            dispatch({type: 'UPDATE_PATIENT_ERROR', err});
            return false;
        })
    }
};

export const deletePatient = (patient) => {
    return (dispatch, getState, {getFirestore}) => {
        console.log(patient);
        const firestore = getFirestore();
        return firebaseSecondary.auth().signInWithEmailAndPassword(
            patient.email,
            patient.password
        ).then(() => {
            const uid = firebaseSecondary.auth().currentUser.uid;
            return firestore.collection('patients').doc(uid).delete()
                .then(() => {
                    return firestore.collection('users').doc(uid).delete()
                }).then(() => {
                    return firebaseSecondary.auth().currentUser.delete();
                })
        }).catch(err => {
            console.log(err);
        })

        // console.log(patient);
        // dispatch({type: 'DELETE_PATIENT', patient})
    }
};
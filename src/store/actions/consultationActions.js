export const createConsultation = (consultation) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        return firestore.collection('consultations').add({
            ...consultation
        }).then(() => {
            dispatch({type:'CREATE_CONSULTATION', consultation});
            return true;
        })
            .catch(err => {
            dispatch({type:'CREATE_ERROR', err});
                return false;
        });
    }
};
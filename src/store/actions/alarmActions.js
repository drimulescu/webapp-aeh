export const closeAlarmPopup = (alarm) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        return firestore.collection('alarms').doc(alarm.id).update({
            viewed: true
        }).then(() => {
            dispatch({type: 'ALARM_VIEWED'});
            return true;
        }).catch(err => {
            dispatch({type: 'ALARM_VIEWED_ERROR', err});
            return false;
        })
    }
};
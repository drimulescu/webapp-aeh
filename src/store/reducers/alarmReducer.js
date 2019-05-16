const initState = {
    closeAlarmPopupErr: null
};

const alarmReducer = (state=initState, action) => {
    switch (action.type) {
        case 'ALARM_VIEWED':
            return {
                ...state,
                closeAlarmPopupErr: null
            };
        case 'ALARM_VIEWED_ERROR':
            return {
                ...state,
                closeAlarmPopupErr: action.err.message
            };
        default:
            return state;
    }
};

export default alarmReducer
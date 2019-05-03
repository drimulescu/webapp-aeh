const initState = {
    authError: null,
    updateError: null
};

const patientReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PATIENT':
            console.log('patient created!', action);
            return {
                ...state,
                authError: null
            };
        case 'CREATE_PATIENT_ERROR':
            console.log('create patient error', action.err);

            return {
                ...state,
                authError: action.err.message
            };
        case 'UPDATE_PATIENT':
            console.log('update', action);
            return {
                ...state,
                updateError: null
            };
        case 'UPDATE_PATIENT_ERROR':
            console.log('update patient error', action.err);
            return {
                ...state,
                updateError: action.err.message
            };
        default:
            return state;
    }
};

export default patientReducer
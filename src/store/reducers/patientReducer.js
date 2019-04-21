const initState = {};

const patientReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PATIENT':
            console.log('patient created!', action);
            return state;
        case 'CREATE_PATIENT_ERROR':
            console.log('create patient error', action.err);
            return state;
        default:
            return state;
    }
};

export default patientReducer
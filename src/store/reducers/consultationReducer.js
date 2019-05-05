const initState = {
    createError: null
};

const consultationReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_CONSULTATION':
            console.log("consultation created", action);
            return {
                ...state,
                createError: null
            };
        case 'CREATE_ERROR':
            return {
                ...state,
                createError: action.err.message
            };
        default:
            return state;
    }
};

export default consultationReducer
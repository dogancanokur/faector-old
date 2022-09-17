const defaultState = {
    isLoggedIn: false,
    loggedUsername: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
};

const authReducer = (state = {...defaultState}, action) => {
    if (action.type === 'logout-success') {
        return defaultState;
    }
    return state;
};

export default authReducer;
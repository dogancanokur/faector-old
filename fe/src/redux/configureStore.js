import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import SecureLS from 'secure-ls';

const secureLS = new SecureLS();

const getStateFromStorage = () => {
    const authData = secureLS.get('faector-auth');

    let stateInLocalStorage = {
        isLoggedIn: false, loggedUsername: undefined, displayName: undefined, image: undefined, password: undefined
    }

    if (authData) {
        return authData;
    }
    return stateInLocalStorage;
}

const updateStateInStorage = newState => {
    secureLS.set('faector-auth', newState);
}

const configureStore = () => {

    const middlewareEnhancer = applyMiddleware(thunk)
    const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose /*for debugger*/;

    const store = createStore(authReducer, getStateFromStorage(), composedEnhancers(middlewareEnhancer)
        /*(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) /!*for debugger*!/*/);

    store.subscribe(() => {
        updateStateInStorage();
    })
    return store;
};

export default configureStore;
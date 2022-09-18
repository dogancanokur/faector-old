import {createStore} from "redux";
import authReducer from "./authReducer";

const configureStore = () => {
    const authData = localStorage.getItem('faector-auth');
    let stateInLocalStorage = {
        isLoggedIn: false,
        loggedUsername: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    }
    if (authData) {
        try {
            stateInLocalStorage = JSON.parse(authData);
        } catch (e) {
            console.warn('LocalStorage value error\n', e);
        }
    }
    const store = createStore(authReducer, stateInLocalStorage,
        (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) /*for debugger*/)
    store.subscribe(() => {
        localStorage.setItem('faector-auth', JSON.stringify(store.getState()))
    })
    return store;
};

export default configureStore;
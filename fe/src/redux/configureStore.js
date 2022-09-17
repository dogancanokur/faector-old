import {createStore} from "redux";
import authReducer from "./authReducer";

const loggedInState = {
    // isLoggedIn: false,
    // loggedUsername: undefined,
    // displayName: undefined,
    // image: undefined,
    // password: undefined
    isLoggedIn: true,
    loggedUsername: "user1",
    displayName: "Display 1",
    image: null,
    password: "psaf"
}

const configureStore = () => {
    return createStore(authReducer, loggedInState,
        (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) // for debugger
    );
};

export default configureStore;
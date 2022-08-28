import React, {Component} from 'react';
import LoginPage from "../pages/LoginPage";
import LanguageSelector from "../components/LanguageSelector";
import UserSignUpPage from "../pages/UserSignUpPage";

class App extends Component {
    render() {
        return (<div className="row">
            <div className="col">
                <UserSignUpPage/>
            </div>
            <div className="col">
                <LoginPage/>
            </div>
            <LanguageSelector/>
        </div>);
    }
}

export default App;
import React, {Component} from 'react';
import ApiProgress from "../shared/ApiProgress";
import LoginPage from "../pages/LoginPage";
import LanguageSelector from "../components/LanguageSelector";
import UserSignUpPage from "../pages/UserSignUpPage";

class App extends Component {
    render() {
        return (<div className="row">
            <div className="col">
                <ApiProgress path={'/api/1.0/users/create-user'}>
                    <UserSignUpPage/>
                </ApiProgress></div>
            <div className="col">
                <ApiProgress path={'/api/1.0/auth'}>
                    <LoginPage/>
                </ApiProgress>
            </div>
            <LanguageSelector/>
        </div>);
    }
}

export default App;
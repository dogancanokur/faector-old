import React, {Component} from 'react';
import LanguageSelector from "../components/LanguageSelector";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import UserSignUpPage from "../pages/UserSignUpPage";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";

class App extends Component {
    render() {
        return (<div>
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/signup" component={UserSignUpPage}/>
                    <Route path="/user:username" component={UserPage}/>
                    <Redirect to="/"/>
                </Switch>
            </HashRouter>
            <LanguageSelector/>
        </div>);
    }
}

export default App;
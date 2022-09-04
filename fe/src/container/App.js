import React, {Component} from 'react';
import LanguageSelector from "../components/LanguageSelector";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import UserSignUpPage from "../pages/UserSignUpPage";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import TopBar from "../components/TopBar";

class App extends Component {
    render() {
        const isLoggedIn = false;
        const loggedUsername = "";

        return (
            <div>
                <Router>
                    <TopBar/>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        {!isLoggedIn &&
                            <Route path="/login" component={(props) => {
                                return <LoginPage {...props}
                                                  onLoginSuccess={this.onLoginSuccess}/>
                            }}/>}
                        {!isLoggedIn && <Route path="/signup" component={UserSignUpPage}/>}
                        <Route path="/user/:username" component={(props) => {
                            return <UserPage {...props} loggedUsername={loggedUsername}/>
                        }}/>
                        <Redirect to="/"/>
                    </Switch>
                </Router>
                <LanguageSelector/>
            </div>
        );
    }
}

export default App;
import React, {Component} from 'react';
import LanguageSelector from "../components/LanguageSelector";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import UserSignUpPage from "../pages/UserSignUpPage";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import TopBar from "../components/TopBar";

class App extends Component {
    state = {
        isLoggedIn: false,
        loggedUsername: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    }

    onLoginSuccess = authState => {
        this.setState({
            ...authState,
            isLoggedIn: true
        });
    }
    onLogoutSuccess = () => {
        this.setState({
            loggedUsername: "",
            isLoggedIn: false
        });
    }

    render() {
        const {isLoggedIn, loggedUsername} = this.state;
        return (
            <div>
                <Router>
                    <TopBar onLogoutSuccess={this.onLogoutSuccess}
                            isLoggedIn={isLoggedIn}
                            loggedUsername={loggedUsername}/>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        {!isLoggedIn &&
                            <Route path="/login" component={(props) => {
                                return <LoginPage onLoginSuccess={this.onLoginSuccess} {...props}></LoginPage>
                            }}/>}
                        {!isLoggedIn && <Route path="/signup" component={UserSignUpPage}/>}
                        <Route path="/user/:username" component={(props) => {
                            return <UserPage loggedUsername={loggedUsername} {...props}></UserPage>
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
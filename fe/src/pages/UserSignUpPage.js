import React from "react";
import {signUp} from "../api/apiCalls";

class UserSignUpPage extends React.Component {
    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false
    }
    onChangeInput = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    onClickSignUp = async (event) => {
        event.preventDefault();
        const {username, displayName, password} = this.state;
        this.setState({pendingApiCall: true});
        const body = {username, displayName, password}
        try {
            const response = await signUp(body);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
        this.setState({pendingApiCall: false});
    }

    render() {
        const {pendingApiCall} = this.state;
        return (
            <div className={"container"}>
                <form>
                    <h1>Sign Up</h1>
                    <div className={"form-group"}>
                        <label htmlFor="username">Username</label>
                        <input className="form-control" type="text" id={"username"} name={"username"}
                               placeholder={"Username"} onChange={this.onChangeInput}/>
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor="displayName">Display Name</label>
                        <input className="form-control" type="text" id={"displayName"} name={"displayName"}
                               placeholder={"Display Name"} onChange={this.onChangeInput}/>
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" id={"password"} name={"password"}
                               placeholder={"Password"} onChange={this.onChangeInput}/>
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor="{passwordRepeat}">Password Repeat</label>
                        <input className="form-control" type="passwordRepeat" id={"passwordRepeat"}
                               placeholder={"Password Repeat"} name={"passwordRepeat"} onChange={this.onChangeInput}/>
                    </div>

                    <div className={"text-center"}>
                        <button className="btn btn-primary" disabled={pendingApiCall} onClick={this.onClickSignUp}>
                            {pendingApiCall &&
                                <span className="spinner-border-sm spinner-border mr-1"></span>}Sign Up
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UserSignUpPage;
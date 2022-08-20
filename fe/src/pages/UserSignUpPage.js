import React from "react";
import {signUp} from "../api/apiCalls";
import Input from "../components/Input";

class UserSignUpPage extends React.Component {
    state = {
        username: null, displayName: null, password: null, passwordRepeat: null, pendingApiCall: false, errors: {}
    }
    onChangeInput = (event) => {
        const {name, value} = event.target;
        const errors = {...this.state.errors};
        errors[name] = undefined;
        this.setState({
            [name]: value, errors
        });
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
            if (e.response.data.validationErrors) {
                this.setState({errors: e.response.data.validationErrors})
            }
        }
        this.setState({pendingApiCall: false});
    }

    render() {
        const {pendingApiCall, errors} = this.state;
        return (<div className={"container"}>
            <form>
                <h1>Sign Up</h1>
                <div className={"form-group"}>
                    <label htmlFor="username">Username</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input className={errors.username ? "form-control is-invalid" : "form-control"} type="text"
                               id={"username"} name={"username"}
                               placeholder={"Username"} onChange={this.onChangeInput}/>
                        <div className="invalid-feedback">{errors.username}</div>
                    </div>
                </div>

                <Input id={"displayName"}
                       label={"Display Name"}
                       error={errors.displayName}
                       type={"text"}
                       name={"displayName"}
                       placeholder={"Display Name"}
                       onchange={this.onChangeInput}></Input>

                <Input id={"password"}
                       label={"Password"}
                       error={errors.password}
                       type={"password"}
                       name={"password"}
                       placeholder={"Password"}
                       onchange={this.onChangeInput}></Input>

                <Input id={"passwordRepeat"}
                       label={"Password Repeat"}
                       error={errors.passwordRepeat}
                       type={"password"}
                       name={"password"}
                       placeholder={"Password Repeat"}
                       onchange={this.onChangeInput}></Input>

                <div className={"text-center"}>
                    <button className="btn btn-primary" disabled={pendingApiCall} onClick={this.onClickSignUp}>
                        {pendingApiCall && <span className="spinner-border-sm spinner-border mr-1"></span>}Sign Up
                    </button>
                </div>
            </form>
        </div>)
    }
}

export default UserSignUpPage;
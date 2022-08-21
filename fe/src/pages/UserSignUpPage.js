import React from "react";
import {signUp} from "../api/apiCalls";
import Input from "../components/Input";
import {withTranslation} from "react-i18next";

class UserSignUpPage extends React.Component {
    state = {
        username: null, displayName: null, password: null, passwordRepeat: null, pendingApiCall: false, errors: {}
    }
    onChangeInput = (event) => {
        const {t} = this.props;
        const {name, value} = event.target;
        const errors = {...this.state.errors};
        if (name === "password" || name === "passwordRepeat") {
            if ((name === "password" && value !== this.state.passwordRepeat) ||
                name === "passwordRepeat" && value !== this.state.password) {
                errors["passwordRepeat"] = t('PasswordMismatch');
            } else {
                errors["passwordRepeat"] = undefined;
                errors[name] = undefined;
            }
        } else {
            errors[name] = undefined;
        }
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
        const {t} = this.props;
        return (
            <div className={"container"}>
                <form>
                    <div>
                        <h1 className={'d-inline-flex'}>{t('SignUp')}</h1>
                    </div>

                    <Input id={'username'}
                           label={t('Username')}
                           error={errors.username}
                           type={'text'}
                           name={'username'}
                           placeholder={t('Username')}
                           onchange={this.onChangeInput}></Input>

                    <Input id={"displayName"}
                           label={t('DisplayName')}
                           error={errors.displayName}
                           type={"text"}
                           name={"displayName"}
                           placeholder={t('DisplayName')}
                           onchange={this.onChangeInput}></Input>

                    <Input id={"password"}
                           label={t('Password')}
                           error={errors.password}
                           type={"password"}
                           name={"password"}
                           placeholder={t('Password')}
                           onchange={this.onChangeInput}></Input>

                    <Input id={"passwordRepeat"}
                           label={t('PasswordRepeat')}
                           error={errors.passwordRepeat}
                           type={"password"}
                           name={"passwordRepeat"}
                           placeholder={t('PasswordRepeat')}
                           onchange={this.onChangeInput}></Input>

                    <div className={"text-center"}>
                        <button className="btn btn-primary"
                                disabled={pendingApiCall || errors.passwordRepeat !== undefined}
                                onClick={this.onClickSignUp}>
                            {pendingApiCall &&
                                <span className="spinner-border-sm spinner-border mr-1"></span>}{t('Sign Up')}
                        </button>
                    </div>
                </form>
            </div>)
    }
}

export default withTranslation()(UserSignUpPage);
import React from "react";
import {signUp} from "../api/apiCalls";
import Input from "../components/Input";
import {withTranslation} from "react-i18next";
import {withApiProgress} from "../shared/ApiProgress";
import ButtonWithProgress from "../components/ButtonWithProgress";

class UserSignUpPage extends React.Component {
    state = {
        username: null, displayName: null, password: null, passwordRepeat: null, errors: {}
    }
    onChangeInput = (event) => {
        const {t} = this.props;
        const {name, value} = event.target;
        const errors = {...this.state.errors};
        if (name === "password" || name === "passwordRepeat") {
            if ((name === "password" && value !== this.state.passwordRepeat) || (name === "passwordRepeat" && value !== this.state.password)) {
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
        const body = {username, displayName, password}
        try {
            await signUp(body);
        } catch (e) {
            if (e.response.data.validationErrors) {
                this.setState({errors: e.response.data.validationErrors})
            }
        }
    }

    render() {
        const {errors} = this.state;
        const {pendingApiCall, t} = this.props;
        return (<div className={"container"}>
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
                    <ButtonWithProgress
                        onClick={this.onClickSignUp}
                        pendingApiCall={pendingApiCall}
                        disabled={pendingApiCall || errors.passwordRepeat !== undefined}
                        text={t('Sign Up')}/>
                </div>
            </form>
        </div>)
    }
}

const UserSignUpPageWithTranslation = withTranslation()(UserSignUpPage);

export default withApiProgress(UserSignUpPageWithTranslation, '/api/1.0/users/create-user');
import React, {Component} from 'react';
import Input from "../components/Input";
import {withTranslation} from "react-i18next";
import {login} from "../api/apiCalls";

class LoginPage extends Component {
    state = {
        username: null, password: null, errors: {}
    }
    onChangeInput = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }
    onClickLogin = event => {
        event.preventDefault();
        const {username, password} = this.state;
        login({username, password});
    }

    render() {
        const {t} = this.props;
        const {errors} = this.state;
        return (
            <div className={"container"}>
                <form>
                    <div>
                        <h1 className={'d-inline-flex'}>{t('Login')}</h1>
                    </div>

                    <Input
                        id={'username'}
                        label={t('Username')}
                        error={errors.username}
                        type={'text'}
                        name={'username'}
                        placeholder={t('Username')}
                        onchange={this.onChangeInput}
                    ></Input>
                    <Input
                        id={'password'}
                        label={t('Password')}
                        error={errors.password}
                        type={'password'}
                        name={'password'}
                        placeholder={t('Password')}
                        onchange={this.onChangeInput}
                    ></Input>
                    <div className={'text-center'}>
                        <button className={'btn btn-primary'}
                                onClick={this.onClickLogin}>{t('Login')}</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withTranslation()(LoginPage);
import React, {Component} from 'react';
import Input from "../components/Input";
import {withTranslation} from "react-i18next";
import axios from "axios";
import {login} from "../api/apiCalls";

class LoginPage extends Component {
    state = {
        username: null, password: null, error: null, pendingApiCall: false
    }

    componentDidMount() {
        console.log("login page added to screen");
        axios.interceptors.request.use((request) => {
            this.setState({pendingApiCall: true});
            return request;
        });

        axios.interceptors.response.use((response) => {
            this.setState({pendingApiCall: false});
            return response;
        }, (error) => {
            this.setState({pendingApiCall: false});
            return error;
        });
    }

    onChangeInput = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
            error: null
        });
    }
    onClickLogin = async event => {
        event.preventDefault();
        const {username, password} = this.state;
        this.setState({error: null});
        try {
            await login({username, password});
        } catch (apiError) {
            this.setState({error: apiError.response.data.message});
        }
    }

    render() {
        const {t} = this.props;
        const {username, password, pendingApiCall} = this.state;
        const buttonDisabled = !(username && password);
        return (
            <div className={"container"}>
                <form>
                    <div>
                        <h1 className={'d-inline-flex'}>{t('Login')}</h1>
                    </div>
                    <Input
                        id={'login_username'}
                        label={t('Username')}
                        type={'text'}
                        name={'username'}
                        placeholder={t('Username')}
                        onchange={this.onChangeInput}
                    ></Input>
                    <Input
                        id={'login_password'}
                        label={t('Password')}
                        type={'password'}
                        name={'password'}
                        placeholder={t('Password')}
                        onchange={this.onChangeInput}
                    ></Input>
                    {this.state.error && <div className="alert alert-danger" role="alert">{this.state.error}</div>}
                    <div className={'text-center'}>
                        <button className={'btn btn-primary'} disabled={buttonDisabled || pendingApiCall}
                                onClick={this.onClickLogin}>{t('Login')}</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withTranslation()(LoginPage);
import React, {Component} from 'react';
import logo from "../assests/logo.png";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {Authentication} from "../shared/AuthenticationContext";

class TopBar extends Component {
    render() {
        const {t} = this.props;
        return (<Authentication.Consumer>
            {value => {
                const {state, onLogoutSuccess} = value;
                const {isLoggedIn, loggedUsername} = state;

                let links = (<ul className="navbar-nav ml-auto">
                    <li>
                        <Link className="nav-link" to="/login">{t('Login')}</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/signup">{t('Sign Up')}</Link>
                    </li>
                </ul>);

                if (isLoggedIn) {
                    links = (<ul className="navbar-nav ml-auto">
                        <li className="nav-link"><Link to={`/user/${loggedUsername}`}>{loggedUsername}</Link></li>
                        <li className="nav-link" style={{cursor: 'pointer'}}
                            onClick={onLogoutSuccess}>{t('Logout')}</li>
                    </ul>);
                }

                return (<div className="shadow-sm bg-light mb-2">
                    <nav className="navbar navbar-expand-lg navbar-light container navbar-expand">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} alt="Faector Logo" height="60px"/> Faector</Link>
                        {links}
                    </nav>
                </div>);
            }}
        </Authentication.Consumer>);
    }
}

export default withTranslation()(TopBar);
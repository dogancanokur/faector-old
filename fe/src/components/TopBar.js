import React, {Component} from 'react';
import logo from "../assests/logo.png";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";

class TopBar extends Component {

    onLogoutSuccess = () => {
        const action = {
            type: 'logout-success'
        };
        this.props.dispatch(action);
    }

    render() {
        const {t, isLoggedIn, loggedUsername} = this.props;

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
                    onClick={this.onLogoutSuccess}>{t('Logout')}</li>
            </ul>);
        }

        return (<div className="shadow-sm bg-light mb-2">
            <nav className="navbar navbar-expand-lg navbar-light container navbar-expand">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Faector Logo" height="60px"/> Faector</Link>
                {links}
            </nav>
        </div>);
    }
}

const TopBarWithTranslation = withTranslation()(TopBar);

const mapStateToProps = (store) => {
    return {
        // store
        isLoggedIn: store.isLoggedIn,
        loggedUsername: store.loggedUsername
    }
}

// export default TopBarWithTranslation;
export default connect(mapStateToProps)(TopBarWithTranslation);
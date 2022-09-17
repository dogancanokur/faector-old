import React from 'react';
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";

const ProfileCard = (props) => {
    const translate = props.t;
    const pathUsername = props.match.params.username;

    let message = translate('We cannot edit');
    if (pathUsername === props.loggedInUsername) {
        message = translate('We can edit');
    }
    return (
        <div>
            {message}
        </div>
    );
}
const mapStateToProps = store => {
    return {
        isLoggedIn: store.isLoggedIn,
        loggedInUsername: store.loggedUsername
    }
}
export default connect(mapStateToProps)(withTranslation()(withRouter(ProfileCard)));
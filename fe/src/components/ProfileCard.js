import React from 'react';
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";

const ProfileCard = (props) => {
    const translate = props.t;
    const pathUsername = props.match.params.username;
    const {loggedUsername} = props;
    let message = translate('We cannot edit');
    if (pathUsername === loggedUsername) {
        message = translate('We can edit');
    }
    return (
        <div>
            logged User = {loggedUsername}
            <br/>
            path user = {pathUsername}
            <br/>
            {message}
        </div>
    );
}

export default withTranslation()(withRouter(ProfileCard));
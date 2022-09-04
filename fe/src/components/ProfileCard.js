import React from 'react';
import {withRouter} from "react-router-dom";
import {Authentication} from "../shared/AuthenticationContext";
import {withTranslation} from "react-i18next";

const ProfileCard = (props) => {
    return (<Authentication.Consumer>
        {value => {
            const translate = props.t;
            const pathUsername = props.match.params.username;
            const {loggedUsername} = value.state;
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
        }}
    </Authentication.Consumer>);
}

export default withTranslation()(withRouter(ProfileCard));
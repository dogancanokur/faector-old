import React from 'react';
import ProfileCard from "../components/ProfileCard";

const UserPage = (props) => {

    return (<div className="container">
        <ProfileCard loggedUsername={props.loggedUsername}/>
    </div>);
};

export default UserPage;

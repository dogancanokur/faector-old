import React from 'react';

const ButtonWithProgress = (props) => {
    const {onClick, pendingApiCall, disabled, text} = props;
    return (<button className="btn btn-primary"
                    disabled={disabled}
                    onClick={onClick}>
        {pendingApiCall && <span className="spinner-border-sm spinner-border mr-1"></span>}{text}
    </button>);
};

export default ButtonWithProgress;

import React from 'react';
import {changeLanguage} from "../api/apiCalls";
import {withTranslation} from "react-i18next";

const LanguageSelector = (props) => {
    const onChangeLanguage = (language) => {
        const {i18n} = props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    return (
        <div className={'container'}>
            <img style={{cursor: 'pointer'}} src="/img/flags/flat/tr.png" alt="Turkey Flag"
                 onClick={() => onChangeLanguage('tr')}/>
            &nbsp;
            <img style={{cursor: 'pointer'}} src="/img/flags/flat/en.png" alt="Great Britain Flag"
                 onClick={() => onChangeLanguage('en')}/>
        </div>
    );
};

export default withTranslation()(LanguageSelector);

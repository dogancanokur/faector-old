import i18next from "i18next";
import {initReactI18next} from "react-i18next";

i18next.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'SignUp': 'Sign Up',
                'Username': 'Username',
                'DisplayName': 'Display Name',
                'PasswordRepeat': 'Password Repeat',
                'Password': 'Password',
                'PasswordMismatch': 'Password Mismatch',
                'Login': 'Login'
            }
        },//
        tr: {
            translations: {
                'SignUp': 'Kayıt Ol',
                'Username': 'Kullanıcı Adı',
                'DisplayName': 'Görünen İsim',
                'PasswordRepeat': 'Şifreyi Tekrarla',
                'Password': 'Şifre',
                'PasswordMismatch': 'Şifreler aynı olmalıdır.',
                'Login': 'Giriş Yap'
            }
        }
    }, fallbackLng: 'en',//
    ns: ['translations'],//
    defaultNS: ['translations'],//
    keySeparator: false,//
    interpolation: {
        escapeValue: false, formatSeparator: ','
    },//
    react: {
        wait: true
    }

});

export default i18next;
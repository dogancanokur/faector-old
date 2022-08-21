import axios from "axios";

export const signUp = (body) => {
    return axios.post("/api/1.0/users/create-user", body);
}

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}

export const login = (creds) => {
    return axios.post('/api/1.0/auth', {}, {auth: creds})
}
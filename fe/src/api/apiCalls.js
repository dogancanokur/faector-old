import axios from "axios";

export const signUp = (body) => {
    return axios.post("/api/1.0/users/create-user", body, {headers: {'accept-language': navigator.language}});
}
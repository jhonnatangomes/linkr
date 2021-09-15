import axios from "axios";
const URL_API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr";

function signIn(body) {
    const request = axios.post(`${URL_API}/sign-in`, body);
    return request;
}

function signUp(body) {
    const request = axios.post(`${URL_API}/sign-up`, body);
    return request;
}

export { signIn, signUp };
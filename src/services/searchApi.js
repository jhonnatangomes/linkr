import axios from "axios";
const URL_API = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

export default function searchUser(user, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const request = axios.get(`${URL_API}/users/search?username=${user}`, config);
    return request;
}
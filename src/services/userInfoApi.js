import axios from "axios";
const URL_API = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users";

function getUserInfo (id, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const promise = axios.get(`${URL_API}/${id}`, config);

    return promise;
}

export {
    getUserInfo,
};
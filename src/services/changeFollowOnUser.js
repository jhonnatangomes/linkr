import axios from "axios";
const URL_API = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users";

function changeFollowOnUser (id, type, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const promise = axios.post(`${URL_API}/${id}/${type}`, '',config);

    return promise;
}

export {
    changeFollowOnUser,
};
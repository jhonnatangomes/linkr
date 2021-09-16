import axios from "axios";
const URL_API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users";

function getUserPosts (id, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const promise = axios.get(`${URL_API}/${id}/posts`, config);

    return promise;
}

export {
    getUserPosts,
};
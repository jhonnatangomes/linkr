import axios from "axios";
const URL_API = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users";

function getFollowingList (token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const promise = axios.get(`${URL_API}/follows`, config);

    return promise;
}

export {
    getFollowingList,
};
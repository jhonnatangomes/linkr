import axios from "axios";

function getUserLikes (token, queryString="") {
    const config = {headers: {Authorization: `Bearer ${token}`}};
    const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/liked${queryString}`, config);
    return promise;
}

export {getUserLikes};
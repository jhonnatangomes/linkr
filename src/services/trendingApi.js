import axios from "axios";
const URL_API = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

function getTrending(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const request = axios.get(`${URL_API}/hashtags/trending`, config);
    return request;
}

function getHashtagPosts(hashtag, token, queryString="") {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const request = axios.get(`${URL_API}/hashtags/${hashtag}/posts${queryString}`, config);
    return request;
}

export {getTrending, getHashtagPosts}
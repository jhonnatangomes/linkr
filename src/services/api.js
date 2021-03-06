import axios from "axios";
const URL_API = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

function signIn(body) {
    const request = axios.post(`${URL_API}/sign-in`, body);
    return request;
}

function signUp(body) {
    const request = axios.post(`${URL_API}/sign-up`, body);
    return request;
}

function getPosts(token, queryString = "") {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const request = axios.get(`${URL_API}/following/posts${queryString}`, config);
    return request;
}

function getNewerPosts(token, actualNewerPost) {
    const postId = actualNewerPost.repostId ? actualNewerPost.repostId : actualNewerPost.id;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const request = axios.get(`${URL_API}/following/posts?earlierThan=${postId}`, config);
    return request;
}

function createPost(body, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const request = axios.post(`${URL_API}/posts`, body, config);
    return request;
}

export { signIn, signUp, getPosts, getNewerPosts, createPost };

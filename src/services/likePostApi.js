import axios from "axios";
const URL_API = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

const getConfig = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

const likePost = (id, token) => axios.post(`${URL_API}/posts/${id}/like`, "", getConfig(token));

const dislikePost = (id, token) => axios.post(`${URL_API}/posts/${id}/dislike`, "", getConfig(token));

export { likePost, dislikePost };
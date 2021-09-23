import axios from "axios";

const sharePost = (postId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}`}}
    const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${postId}/share`, "", config)
    return request;
};

export { sharePost };
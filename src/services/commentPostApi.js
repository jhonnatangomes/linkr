import axios from "axios";

const getComments = (postId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}`}}
    const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${postId}/comments`, config)
    return request;
};

const postComment = (postId, token, comment) => {
    const config = { headers: { Authorization: `Bearer ${token}`}}
    const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${postId}/comment`, {text: comment}, config);
    return request;
}

export { getComments, postComment };
import axios from "axios";
const URL_API = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

const getConfig = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

const deletePost = (id, token) => axios.delete(`${URL_API}/posts/${id}`, getConfig(token));


export { deletePost };
import axios from "axios";
const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr'

function createHeaders(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return config;
}

function createPost({ token, body }) {
    const config = createHeaders(token);
    const promise = axios.post(`${BASE_URL}/posts`, body, config);
    return promise;
}

function getPosts(token) {
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/posts`, config);
    return promise;
}

export {
    createPost,
    getPosts,
}
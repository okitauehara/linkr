import axios from "axios";
const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr'

function createHeaders(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return config;
}

function signUp(body) {
    const promise = axios.post(`${BASE_URL}/sign-up`, body);
    return promise;
}

function login(body) {
    const promise = axios.post(`${BASE_URL}/sign-in`, body);
    return promise;
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

function getUserPosts({ token, userId }) {
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/users/${userId}/posts`, config);
    return promise;
}

function getHashtag({ token, hashtag }){
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/hashtags/${hashtag}/posts`, config)
    return promise;
}

function getTrending(token) {
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/hashtags/trending`, config);
    return promise;
}

function toggleLike({ token, postId, status }) {
    const config = createHeaders(token);
    const promise = axios.post(`${BASE_URL}/posts/${postId}/${status}`, {}, config);
    return promise;
}

export {
    signUp,
    login,
    createPost,
    getPosts,
    getUserPosts,
    getHashtag,
    getTrending,
    toggleLike,
}
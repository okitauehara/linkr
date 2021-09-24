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

function getMylikes(token){
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/posts/liked`, config);
    return promise;
}

function deletePost(token, id){
    const config = createHeaders(token);
    const promise = axios.delete(`${BASE_URL}/posts/${id}`, config);
    return promise;
}

function getUserPosts({ token, userId }) {
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/users/${userId}/posts`, config);
    return promise;
}

function getUserInfos({ token, userId }) {
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/users/${userId}`, config);
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

function editPost({ token, body, postId }) {
    const config = createHeaders(token);
    const promise = axios.put(`${BASE_URL}/posts/${postId}`, body, config);
    return promise;
}

function getFollowingList(token) {
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/users/follows`, config);
    return promise;
}

function toggleFollow({ token, userId, status }) {
    const config = createHeaders(token);
    const promise = axios.post(`${BASE_URL}/users/${userId}/${status}`, {}, config);
    return promise;
}

function getFollowingUsersPosts(token) {
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/following/posts`, config);
    return promise;
}

function getOlderPosts({ token, lastPostId }) {
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/posts?olderThan=${lastPostId}`, config);
    return promise;
}

function getOlderMylikes({ token, lastPostId }){
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/posts/liked?olderThan=${lastPostId}`, config);
    return promise;
}

function getOlderUserPosts({ token, userId, lastPostId }) {
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/users/${userId}/posts?olderThan=${lastPostId}`, config);
    return promise;
}

function getOlderFollowingUsersPosts({ token, lastPostId }) {
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/following/posts?olderThan=${lastPostId}`, config);
    return promise;
}

function getOlderHashtag({ token, hashtag, lastPostId }){
    const config = createHeaders(token);
    const promise = axios.get(`${BASE_URL}/hashtags/${hashtag}/posts?olderThan=${lastPostId}`, config)
    return promise;
}

export {
    signUp,
    login,
    createPost,
    getPosts,
    deletePost,
    getMylikes,
    getUserPosts,
    getHashtag,
    getTrending,
    toggleLike,
    getUserInfos,
    editPost,
    getFollowingList,
    toggleFollow,
    getFollowingUsersPosts,
    getOlderPosts,
    getOlderMylikes,
    getOlderUserPosts,
    getOlderFollowingUsersPosts,
    getOlderHashtag
}
import Loading from "../../shared/Loading";
import Swal from "sweetalert2";
import PublishPost from "./PublishPost";
import { useContext, useEffect, useState } from "react";
import UserPost from "../../shared/UserPost";
import ContainerStyle from "../../shared/ContainerStyle";
import { getFollowingUsersPosts, getTrending, getFollowingList, getOlderFollowingUsersPosts } from "../../../service/API";
import UserContext from "../../../contexts/UserContext";
import Trending from "../../shared/Trending";
import styled from "styled-components";
import useInterval from 'react-useinterval';
import InfiniteScroll from "react-infinite-scroller";
import LoadingPosts from "../../shared/LoadingPosts";

export default function Timeline({ followingList, setFollowingList }) {

    const {user, setHashList, setUser} = useContext(UserContext);
    const [morePosts, setMorePosts] = useState(true);
    const [posts, setPosts] = useState([]);
   
    useEffect (() => {
        if(localStorage.getItem('@userdata')){
            const userData = JSON.parse(localStorage.getItem('@userdata'));
            setUser(userData);
        }
        getFollowingUsersPosts(user.token)
        .then((response) => setPosts(response.data.posts))
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Ops...",
                    text: "Houve uma falha ao obter os posts, por favor atualize a página"
                })
            })
        getTrending(user.token)
            .then((r) => setHashList(r.data))
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Ops...",
                    text: "Houve uma falha ao carregar a lista de trending, por favor atualize a página"
                })
            })
        getFollowingList(user.token)
            .then((response) => setFollowingList(response.data.users))
            .catch(() => console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useInterval(() =>{
        getFollowingUsersPosts(user.token)
            .then((response) => {
                if (response.data.posts !== posts) {
                    setPosts(response.data.posts)
                } else {
                    return;
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Ops...",
                    text: "Houve uma falha ao obter os posts, por favor atualize a página"
                })
        })}, 15000)


    
    if (!posts) {
        return <Loading />
    }

    function renderOlderPosts(lastPostId) {
        getOlderFollowingUsersPosts({ token: user.token, lastPostId: lastPostId})
            .then((response) => {
                setPosts([...posts, ...response.data.posts])
                if (response.data.posts.length === 0) {
                    setMorePosts(false);
                } 
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Ops...",
                    text: "Houve uma falha ao obter mais posts, por favor atualize a página"
                })
            })
    }

    return (
        <PageContainer>
        <ContainerStyle>
        <div className="user-header">
            <h1>timeline</h1>
        </div>
        <PublishPost setPosts={setPosts} />
        <InfiniteScroll
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            pageStart={0}
            loadMore={() => renderOlderPosts(posts[posts.length - 1].id)}
            hasMore={morePosts}
            loader={<LoadingPosts />}>
            {(posts.length === 0 && followingList.length === 0) ?
			<p style={{
				fontSize: '25px',
				color: '#ffffff',
				marginTop: '30px',
                maxWidth: '611px',
                wordBreak: 'break-word',
                textAlign: 'center'}}>
			Você não segue ninguém ainda, procure por perfis na busca
			</p>
            :
                    posts.length === 0 ?
                    <p style={{
                        fontSize: '25px',
                        color: '#ffffff',
                        marginTop: '30px',
                        maxWidth: '611px',
                        wordBreak: 'break-word',
                        textAlign: 'center'}}>
                    Nenhuma publicação encontrada
                    </p>
                    :
                    posts.map((post) => (
                        <UserPost posts={posts} setPosts={setPosts} userInfo={post.user} post={post} key={post.id} userId={post.user.id}/>
            ))}
        </InfiniteScroll>
        </ContainerStyle>
        <Trending />
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
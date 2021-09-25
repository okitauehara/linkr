import Loading from "../../shared/Loading";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import UserPost from "../../shared/UserPost";
import ContainerStyle from "../../shared/ContainerStyle";
import { getUserPosts, getTrending, getOlderUserPosts } from "../../../service/API";
import UserContext from "../../../contexts/UserContext";
import styled from "styled-components";
import Trending from "../../shared/Trending";
import InfiniteScroll from "react-infinite-scroller";
import LoadingPosts from "../../shared/LoadingPosts";

export default function MyPosts() {
    const { user, setHashList } = useContext(UserContext);
    const [posts, setPosts] = useState('');
    const [morePosts, setMorePosts] = useState(true);

    useEffect (() => {
        getUserPosts({ token: user.token, userId: user.user.id})
            .then((response) => setPosts(response.data.posts))
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Ops...",
                    text: "Houve uma falha ao obter os posts, por favor atualize a página"
                })
            })
        getTrending(user.token)
            .then((response) => setHashList(response.data))
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Ops...",
                    text: "Houve uma falha ao carregar a lista de trending, por favor atualize a página"
                })
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  
    

    if (!posts) {
        return <Loading />
    }

    function renderOlderPosts(lastPostId) {
        getOlderUserPosts({ token: user.token, userId: user.user.id, lastPostId: lastPostId})
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
                    <h1>my posts</h1>
                </div>
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
                    {posts.length === 0 ?
                        <p style={{
                            fontSize: '25px',
                            color: '#ffffff',
                            marginTop: '30px'}}>
                        Você ainda não tem nenhuma publicação
                        </p>:
                        posts.map((post) => (
                            <UserPost userInfo={post.user} post={post} key={post.id} setPosts={setPosts} userId={post.user.id}/>
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

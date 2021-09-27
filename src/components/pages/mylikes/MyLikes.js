import { useContext, useEffect,useState } from "react"
import UserContext from "../../../contexts/UserContext"
import { getMylikes, getOlderMylikes, getTrending } from "../../../service/API";
import UserPost from '../../shared/UserPost'
import styled from "styled-components";
import ContainerStyle from "../../shared/ContainerStyle";
import Trending from "../../shared/Trending";
import Swal from "sweetalert2";
import Loading from "../../shared/Loading";
import InfiniteScroll from "react-infinite-scroller";
import LoadingPosts from "../../shared/LoadingPosts";

export default function MyLikes() {
    const { user, setHashList } = useContext(UserContext);
    const [posts,setPosts] = useState('');
    const [morePosts, setMorePosts] = useState(true);
   
    useEffect(()=>{
        if(user){
            getMylikes(user.token).then((response)=> {
                setPosts(response.data.posts)
            }).catch(Erro);
    
            getTrending(user.token)
                .then((response) => setHashList(response.data))
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Ops...",
                        text: "Houve uma falha ao carregar a lista de trending, por favor atualize a página"
                    })
                })
        }
        

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])

    if (!posts) {
        return <Loading />
    }

    function Erro(){
        Swal.fire({
            icon: "error",
            title: "Ops...",
            text: "Houve uma falha ao obter os posts, por favor atualize a página"
        })
    }

    function renderOlderPosts(lastPostId) {
        getOlderMylikes({ token: user.token, lastPostId: lastPostId})
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
                    <h1>my likes</h1>
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
                        Você ainda não curtiu nenhum post
                        </p>:
                        posts.map((post) => (
                            <UserPost userInfo={post.user} setPosts={setPosts} post={post} key={post.id} userId={post.user.id}/>
                    ))}
                </InfiniteScroll>
            </ContainerStyle>
            <Trending />
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;



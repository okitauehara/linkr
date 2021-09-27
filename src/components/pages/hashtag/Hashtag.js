import Loading from "../../shared/Loading";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import UserPost from "../../shared/UserPost";
import ContainerStyle from "../../shared/ContainerStyle";
import { getHashtag, getOlderHashtag, getTrending } from "../../../service/API";
import UserContext from "../../../contexts/UserContext";
import styled from "styled-components";
import {useParams} from 'react-router-dom';
import Trending from "../../shared/Trending";
import InfiniteScroll from "react-infinite-scroller";
import LoadingPosts from "../../shared/LoadingPosts";

export default function Hashtag() {

    const param = useParams(); 

    const {user, setHashList} = useContext(UserContext);
    const [hashtag, setHashtag] = useState('');
    const [morePosts, setMorePosts] = useState(true);
   
    useEffect (() => {
        if(user){
            getHashtag({token: user.token, hashtag: param.hashtag})
            .then((response) => setHashtag(response.data.posts))
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
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param.hashtag,user]);  

    if (!hashtag) {
        return <Loading />
    }

    function renderOlderPosts(lastPostId) {
        getOlderHashtag({ token: user.token, hashtag: param.hashtag, lastPostId: lastPostId})
            .then((response) => {
                setHashtag([...hashtag, ...response.data.posts])
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
            <h1>#{param.hashtag}</h1>
        </div>
        <InfiniteScroll
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            pageStart={0}
            loadMore={() => renderOlderPosts(hashtag[hashtag.length - 1].id)}
            hasMore={morePosts}
            loader={<LoadingPosts />}>
            {hashtag.length === 0 ?
                <p style={{
                    fontSize: '25px',
                    color: '#ffffff',
                    marginTop: '30px'}}>
                Nenhum post encontrado
                </p>:
                hashtag.map((post) => (
                    <UserPost userInfo={post.user} post={post} key={post.id} userId={post.user.id}/>
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



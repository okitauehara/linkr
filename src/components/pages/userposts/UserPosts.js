import UserPost from '../../shared/UserPost'
import { useParams } from 'react-router'
import Swal from "sweetalert2";
import Loading from "../../shared/Loading";
import ContainerStyle from "../../shared/ContainerStyle"
import { useContext, useEffect, useState } from 'react';
import { getUserPosts, getTrending } from '../../../service/API';
import UserContext from '../../../contexts/UserContext';
import Trending from '../../shared/Trending';
import styled from 'styled-components';

export default function UserPosts() {
    const userId = useParams();
    const { user, setHashList } = useContext(UserContext);

    const [userPosts, setUserPosts] = useState('');
    useEffect(() => {
        getUserPosts({token: user.token, userId: userId.id})
            .then((res) => {
                setUserPosts(res.data.posts)
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Houve uma falha ao obter os posts, por favor atualize a página"
                })
            });
        getTrending(user.token)
            .then((r) => setHashList(r.data))
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Ops...",
                    text: "Houve uma falha ao carregar a lista de trending, por favor atualize a página"
                })
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!userPosts) {
        return <Loading />
    }

    return (
        <PageContainer>
            <ContainerStyle>
                <div className="user-header">
                    <img src={userPosts[0].user.avatar} alt='' />
                    <h1> {userPosts[0].user.username}'s posts </h1>
                </div>
                {userPosts.map((post, index) => (
                    <UserPost userInfo={post.user} post={post} key={index} userId={post.user.id}/>
                ))}
            </ContainerStyle>
            <Trending />
        </PageContainer>
    )
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

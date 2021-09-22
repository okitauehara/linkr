import Loading from "../../shared/Loading";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import UserPost from "../../shared/UserPost";
import ContainerStyle from "../../shared/ContainerStyle";
import { getHashtag, getTrending } from "../../../service/API";
import UserContext from "../../../contexts/UserContext";
import styled from "styled-components";
import {useParams} from 'react-router-dom';
import Trending from "../../shared/Trending";

export default function Hashtag() {

    const param = useParams(); 

    const {user, setHashList} = useContext(UserContext);
    const [hashtag, setHashtag] = useState('');
   
    useEffect (() => {
        getHashtag({token: user.token, hashtag: param.hashtag})
            .then((resp) => setHashtag(resp.data))
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param.hashtag]);  

    if (!hashtag) {
        return <Loading />
    }

    return (
        <PageContainer>
        <ContainerStyle>
        <div className="user-header">
            <h1>#{param.hashtag}</h1>
        </div>
        {hashtag.length === 0 ?
			<p style={{
				fontSize: '25px',
				color: '#ffffff',
				marginTop: '30px'}}>
			Nenhum post encontrado
			</p>:
			hashtag.posts.map((post) => (
            	<UserPost userInfo={post.user} post={post} key={post.id} userId={post.user.id}/>
        ))}
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



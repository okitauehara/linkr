import Loading from "../../shared/Loading";
import Swal from "sweetalert2";
import PublishPost from "./PublishPost";
import { useContext, useEffect, useState } from "react";
import UserPost from "../../shared/UserPost";
import ContainerStyle from "../../shared/ContainerStyle";
import { getPosts, getTrending} from "../../../service/API";
import UserContext from "../../../contexts/UserContext";
import Trending from "../../shared/Trending";
import styled from "styled-components";

export default function Timeline() {

    const {user, setHashList, setUser} = useContext(UserContext);
    const [posts, setPosts] = useState('');
   
    useEffect (() => {
        if(localStorage.getItem('@userdata')){
            const userData = JSON.parse(localStorage.getItem('@userdata'));
            setUser(userData);
        }
        getPosts(user.token)
            .then((r) => setPosts(r.data))
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
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
    }, []);

    
    if (!posts) {
        return <Loading />
    }
    return (
        <PageContainer>
        <ContainerStyle>
        <div className="user-header">
            <h1>timeline</h1>
        </div>
        <PublishPost setPosts={setPosts} />
        {posts.length === 0 ?
			<p style={{
				fontSize: '25px',
				color: '#ffffff',
				marginTop: '30px'}}>
			Nenhum post encontrado
			</p>:
			posts.posts.map((post) => (
            	<UserPost userInfo={post.user} post={post} key={post.id} setPosts={setPosts} posts={posts} userId={post.user.id}/>
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
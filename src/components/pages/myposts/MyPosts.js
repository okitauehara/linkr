import Loading from "../../shared/Loading";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import UserPost from "../../shared/UserPost";
import ContainerStyle from "../../shared/ContainerStyle";
import { getUserPosts, getTrending} from "../../../service/API";
import UserContext from "../../../contexts/UserContext";
import Trending from "../../shared/Trending";
import styled from "styled-components";


export default function MyPosts() {

    const {user, setHashList} = useContext(UserContext);
    const [posts, setPosts] = useState('');
   
    useEffect (() => {
        getUserPosts(user.token, user.user.id)
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
            .catch(() => console.error)
    }, [user.token , setHashList, user.user.id]);  
    

    if (!posts) {
        return <Loading />
    }

    return (
        <PageContainer>
        <ContainerStyle>
        <div className="user-header">
            <h1>my posts</h1>
        </div>
        {posts.length === 0 ?
			<p style={{
				fontSize: '25px',
				color: '#ffffff',
				marginTop: '30px'}}>
			Nenhum post encontrado
			</p>:
			posts.posts.map((post, index) => (
            	<UserPost post={post} key={index} setPosts={setPosts}/>
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

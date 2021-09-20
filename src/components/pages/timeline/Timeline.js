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

    const {user, setHashList,setUser} = useContext(UserContext);
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
            .catch(() => console.error)

            
    }, [user.token , setHashList]);  // eslint-disable-line react-hooks/exhaustive-deps

    
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
			posts.posts.map((post, index) => (
            	<UserPost post={post} key={index}/>
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



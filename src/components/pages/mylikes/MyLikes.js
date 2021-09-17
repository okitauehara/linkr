
import { useContext, useEffect,useState } from "react"
import { useHistory } from "react-router";
import UserContext from "../../../contexts/UserContext"
import { getMylikes } from "../../../service/API";
import UserPost from "../userposts/UserPost";
import styled from "styled-components";
import mockedPosts from "../userposts/mockedPosts";
export default function MyLikes() {
    const {user} = useContext(UserContext);
    const [posts,setPosts] = useState([]);
    let history = useHistory();
    useEffect(()=>{
        getMylikes(user.token).then((res)=> {
            setPosts(res.data)
        }).catch(Erro);
    },[])

    function Erro(){
        console.log("deu ruim");
        //history.push("/");
    }


    return (
        <ContainerUserPosts>
            <div className="user-header">
                <h1>my likes</h1>
            </div>
            {mockedPosts.posts.map((post, index) => (
                <UserPost post={post} key={index}/>
            ))}
        </ContainerUserPosts>
    )
}


const ContainerUserPosts = styled.div`
    margin-top: 132px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    .user-header { 
        width: 611px;
        padding-left: 18px;
        display: flex;
        align-items: center;
        color: white;
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
    }   
    .user-header img {
        object-fit: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 18px;
    }
    @media (max-width: 620px) {
        margin-top: 50px;

        .user-header {
            width: 100vw;
            font-size: 33px;
        }
    }
`;
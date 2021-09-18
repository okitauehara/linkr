import UserPost from '../../shared/UserPost'
import { useParams } from 'react-router'
import Swal from "sweetalert2";
import Loading from "../../shared/Loading";
import ContainerStyle from "../../shared/ContainerStyle"
import { useContext, useEffect, useState } from 'react';
import { getUserPosts } from '../../../service/API';
import UserContext from '../../../contexts/UserContext';

export default function UserPosts() {
    const userId = useParams().id;
    const { user } = useContext(UserContext);
    const [userPosts, setUserPosts] = useState('');

    useEffect(() => {
        getUserPosts({token: user.token, userId: userId})
            .then((res) => {
                console.log(res)
                setUserPosts(res.data)
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Houve uma falha ao obter os posts, por favor atualize a página"
                })
            });
    }, [userId, user.token]);
  
    if (!userPosts) {
        return <Loading />
    } else if(userPosts.posts.length === 0) {
        return <p><br/><br/><br/><br/><br/><br/>Nenhum post encontrado</p>;
    }
    return (
        <ContainerStyle>
            <div className="user-header">
                <img src={userPosts.posts.avatar} alt='' />
                <h1> {userPosts.posts.username}'s posts </h1>
            </div>
            {userPosts.posts.map((post, index) => (
                <UserPost post={post} key={index}/>
            ))}
        </ContainerStyle>
    )
};
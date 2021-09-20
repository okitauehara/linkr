import mockedPosts from './mockedPosts'
import UserPost from '../../shared/UserPost'
import { useParams } from 'react-router'
import ContainerStyle from "../../shared/ContainerStyle"
import { useContext, useEffect, useState } from 'react';
import { getUserPosts } from '../../../service/API';
import UserContext from '../../../contexts/UserContext';

export default function UserPosts() {

    const userId = useParams();
    const { user } = useContext(UserContext);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        getUserPosts(user.token, userId)
            .then((r) => setUserPosts(r.data))
            .catch(() => console.error);
    }, [userId, setUserPosts, user.token])

    console.log(userPosts);

    return (
        <ContainerStyle>
            <div className="user-header">
                <img src={mockedPosts.user.avatar} alt='' />
                <h1> {mockedPosts.user.username}'s posts </h1>
            </div>
            {mockedPosts.posts.map((post, index) => (
                <UserPost userInfo={post.user} post={post} key={index}/>
            ))}
        </ContainerStyle>
    )
};
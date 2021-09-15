import mockedPosts from './mockedPosts'
import styled from 'styled-components'
import UserPost from './UserPost'
import { useParams } from 'react-router'

export default function UserPosts() {
    const userId = useParams();
    console.log(userId);
    return (
        <ContainerUserPosts>
            <div className="user-header">
                <img src={mockedPosts.user.avatar} alt='' />
                <h1> {mockedPosts.user.username}'s posts </h1>
            </div>
            {mockedPosts.posts.map((post, index) => (
                <UserPost post={post} key={index}/>
            ))}
        </ContainerUserPosts>
    )
}

const ContainerUserPosts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .user-header { 
        display: flex;
        align-items: center;
        color: white;
    }   
    .user-header img {
        object-fit: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }
`;
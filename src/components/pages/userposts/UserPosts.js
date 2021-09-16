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
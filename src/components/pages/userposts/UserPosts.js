import mockedPosts from './mockedPosts'
import UserPost from '../../shared/UserPost'
import { useParams } from 'react-router'
import ContainerStyle from "../../shared/ContainerStyle"

export default function UserPosts() {
    const userId = useParams();
    console.log(userId);
    return (
        <ContainerStyle>
            <div className="user-header">
                <img src={mockedPosts.user.avatar} alt='' />
                <h1> {mockedPosts.user.username}'s posts </h1>
            </div>
            {mockedPosts.posts.map((post, index) => (
                <UserPost post={post} key={index}/>
            ))}
        </ContainerStyle>
    )
};
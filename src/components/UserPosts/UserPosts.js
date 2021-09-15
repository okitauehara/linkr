import mockedPosts from './mockedPosts'
import styled from 'styled-components'
import UserPost from './UserPost'

export default function UserPosts() {
    return (
        <ContainerUserPosts>
            {mockedPosts.map((post, index) => (
                <UserPost post={post} key={index}/>
            ))}
        </ContainerUserPosts>
    )
}

const ContainerUserPosts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
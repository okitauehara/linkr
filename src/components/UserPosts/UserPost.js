import { FaHeart } from 'react-icons/fa'
import styled from 'styled-components'

export default function UserPost(props) {
    const {
        user,
        linkTitle, 
        text, 
        linkImage, 
        linkDescription, 
        link, 
        likes, 
        id} = props.post;
    
    return (
        <ContainerUserPost>
            <div className="photo-and-likes">
                <img src={user.avatar} alt=''/>
                <FaHeart />
                <p>{likes.length} likes</p>
            </div>
            <div className="main-post">
                <div className="link-content">

                </div>
            </div>
        </ContainerUserPost>
    )
}

const ContainerUserPost = styled.div`
    background-color: black;
    color: white;
    width: 611px;
    height:276px;
    display:flex;
    margin-top: 18px;
    border-radius: 16px;
    padding: 18px;

    .photo-and-likes {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 85px;
    }
    .photo-and-likes img { 
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`;
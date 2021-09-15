import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'

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
    } = props.post;
    
    return (
        <ContainerUserPost>
            <div className="photo-and-likes">
                <img src={user.avatar} alt=''/>
                <AiOutlineHeart />
                <p>{likes.length} likes</p>
            </div>
            <div className="main-post">
                <p><strong>{user.username}</strong></p>
                <p>{text}</p>
                <div className="link-content">
                    <div className="link-description">
                        <p>{linkTitle}</p>
                        <p>{linkDescription}</p>
                        <p>{link}</p>
                    </div>
                    <img src={linkImage} />
                </div>
            </div>
        </ContainerUserPost>
    )
}

const ContainerUserPost = styled.div`
    box-sizing: border-box;
    background-color: #171717;
    color: white;
    width: 611px;
    height:276px;
    display:flex;
    margin-top: 18px;
    border-radius: 16px;
    padding: 18px 18px 18px 0;
    
    strong {
        font-weight: bold;
    }
    .photo-and-likes {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 85px;
    }
    .photo-and-likes img { 
        object-fit: cover;
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
        border-radius: 50%;
    }
    .photo-and-likes p {
        margin-top: 5px;
        font-size: 11px;
    }
    .main-post {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .main-post p:nth-child(1) {
        font-size: 19px;
    }
    .main-post p:nth-child(2) {
        font-size: 17px;
        color: #B7B7B7;
    }
    .link-content {
        width: 503px;
        height: 155px;
        border: solid 1px #c4c4c4;
        border-radius: 11px;
        display: flex;
    }
    .link-content > div {
        width: 350px;
        height: 100%; 
    }
    .link-content img {
        object-fit: cover;
        width: 153px;
        height: 100%;
        border-radius: 0 11px 11px 0;
    }
    .link-description {
        padding: 24px 27px 0 19px; 
        display: flex;
        flex-direction: column;
        color: #cecece;
    }
    .link-description p:nth-child(1) {
        font-size: 16px;
    }   
    .link-description p:nth-child(2) {
        font-size: 11px;
        color: #9b9595;
        margin: 5px 0 13px 0;
    }   
    .link-description p:nth-child(3) {
        font-size: 11px;
    }

`;
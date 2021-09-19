import { Link } from 'react-router-dom' 
import { AiOutlineHeart } from 'react-icons/ai'
// import { AiFillHeart } from 'react-icons/ai'
import ContainerUserPost from './ContainerUserPost'
import styled from 'styled-components';

export default function UserPost(props) {
    const {
        id,
        user,
        linkTitle, 
        text, 
        linkImage, 
        linkDescription, 
        link, 
        likes,
    } = props.post;
    
    function checkHashtag() {
        const textCheck = text.split(' ').map((word, index) => {
            if (word[0] === '#') {
                return <Link key={index} to={`/hashtag/${word.substring(1)}/posts`}><HashtagCSS> #{word.substring(1)}</HashtagCSS></Link>
            } else {
                return ` ${word}`
            }
        })

        return textCheck;
    }

    return (
        <ContainerUserPost>
            <div className="photo-and-likes">
                <Link to={`/user/${id}`}><img src={user.avatar} alt=''/></Link> 
                <AiOutlineHeart />
                <p>{likes.length} likes</p>
            </div>
            <div className="main-post">
                <Link to={`/user/${id}`}><p><strong>{user.username}</strong></p></Link>
                <p>{checkHashtag()}</p>
                <div onClick={() =>{window.open(link, "_blank")}} className="link-content">
                    <div className="link-description">
                        <p>{linkTitle}</p>
                        <p>{linkDescription}</p>
                        <p>{link}</p>
                    </div>
                    <img src={linkImage} alt='' />
                </div>
            </div>
        </ContainerUserPost>
    )
}

const HashtagCSS = styled.span`
    font-weight: 700;
    color: #ffffff;
`;

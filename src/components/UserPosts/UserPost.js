import { AiOutlineHeart } from 'react-icons/ai'
// import { AiFillHeart } from 'react-icons/ai'
import ContainerUserPost from '../templates/ContainerUserPost'

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
                    <img src={linkImage} alt='' />
                </div>
            </div>
        </ContainerUserPost>
    )
}

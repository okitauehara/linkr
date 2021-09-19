import { Link } from 'react-router-dom' 
import { AiOutlineHeart } from 'react-icons/ai'
// import { AiFillHeart } from 'react-icons/ai'
import { TiPencil } from 'react-icons/ti';
import ContainerUserPost from './ContainerUserPost'
import styled from 'styled-components';
import { useEffect, useContext, useRef, useState } from 'react';
import UserContext from '../../contexts/UserContext';


export default function UserPost(props) {
    const {
        id,
        linkTitle, 
        text, 
        linkImage, 
        linkDescription, 
        link, 
        likes,
    } = props.post;

    const { userInfo } = props;
    
    const { user } = useContext(UserContext)

    const [myPost, setMyPost] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [actualText, setActualText] = useState(text);
    const [editedText, setEditedText] = useState(text);
    const textAreaRef = useRef();

    useEffect(() => {
        if(user.user.id === userInfo.id){
                setMyPost(true);
            }
        if(editMode){
            toggleEditMode();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editMode])

    function checkHashtag() {
        const textCheck = actualText.split(' ').map((word, index) => {
            if (word[0] === '#') {
                return <Link key={index} to={`/hashtag/${word.substring(1)}/posts`}><HashtagCSS> #{word.substring(1)}</HashtagCSS></Link>
            } else {
                return ` ${word}`
            }
        })

        return textCheck;
    }

    function toggleEditMode(){
        if(editMode){
            setEditedText(actualText)
        }
       textAreaRef.current.focus();
    }

    return (
        <ContainerUserPost>
            <div className="photo-and-likes">
                <Link to={`/user/${id}`}><img src={userInfo.avatar} alt=''/></Link> 
                <AiOutlineHeart />
                <p>{likes.length} likes</p>
            </div>
            <div className="main-post">
                <div className="top-post">
                    <Link to={`/user/${id}`}><p><strong>{userInfo.username}</strong></p></Link>
                    {myPost ? <TiPencil onClick={() => setEditMode(!editMode)} style={{cursor: 'pointer'}}/> : <p></p>}
                </div>
                {editMode ? <EditBox type="text" value={editedText} onChange={(e)=> setEditedText(e.target.value)} ref={textAreaRef}/> : <p>{checkHashtag()}</p>}
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

const EditBox = styled.textarea`
    font-family: 'Lato', sans-serif;
    font-size: 17px;
    color: #333333;
    margin-bottom: 15px;
    resize: none;
    outline: none;
    border-radius: 5px;
    padding: 10px;
`;

import { Link } from 'react-router-dom'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import ContainerUserPost from './ContainerUserPost'
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { toggleLike } from '../../service/API';
import UserContext from '../../contexts/UserContext';
import ReactTooltip from 'react-tooltip';

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

    const { user: thisUser } = useContext(UserContext);
    const [tooltipMessage, setTooltipMessage] = useState('')
    const [liked, setLiked] = useState(likes.some(like => like.userId === thisUser.user.id));
    const [postLikes, setPostLikes] = useState(likes.length);
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

    useEffect(() => {

        switch (likes.length) {
            case 0: 
                return;
            case 1: 
                setTooltipMessage(`${liked ? 'Você' : likes[0]["user.username"]} curtiu`);
                break;
            case 2:
                setTooltipMessage(
                    `${liked ? 'Você e ' + likes[0]["user.username"] 
                    : 
                    likes[0]["user.username"] + ' e ' + likes[1]["user.username"] 
                    } curtiram`
                );
                break;
            default:
                setTooltipMessage(
                    `${liked ? 'Você, ' + likes[0]["user.username"] 
                    : 
                    likes[0]["user.username"] + ', ' + likes[1]["user.username"] 
                    } e outras ${likes.length - 2} pessoas`
                );   
            }

        if (likes.length === 0) {
            return;
        }
        if(likes.length === 1) {
            
        } 
        else if(liked && likes.length > 3) {
            console.log(likes)
            setTooltipMessage(`Você, ${likes[0]["user.username"]} e outras ${likes.length - 2} pessoas`)
        } else if (!liked && likes.length > 3) {
            setTooltipMessage(`${likes[0]["user.username"]}, ${likes[1]["user.username"]} e outras ${likes.length - 2} pessoas`)
        }

    }, [tooltipMessage, setTooltipMessage, likes, liked])

    function changeLike() {
        if(!liked) {
            setLiked(true);
            setPostLikes(postLikes + 1);
            toggleLike({ token: thisUser.token, postId: id, statthisUs: 'like' })
        } else {
            setLiked(false);
            setPostLikes(postLikes - 1);
            toggleLike({ token: thisUser.token, postId: id, status: 'dislike' })
        }
    }
    return (
        <ContainerUserPost>
            <div className="photo-and-likes">
                <Link to={`/user/${id}`}><img src={userInfo.avatar} alt=''/></Link>
                <Likes data-tip={tooltipMessage} >
                    {liked ? 
                        <AiFillHeart
                        style={{color: '#ac0000'}} 
                        onClick={changeLike} 
                        /> 
                        : 
                        <AiOutlineHeart 
                        onClick={changeLike}
                        />
                    }
                    <p>{postLikes} {postLikes <= 1 ? 'like' : 'likes'}</p>
                    <ReactTooltip 
                        place="bottom"
                        type="light"
                        backgroundColor="#FFFFFF30"
                        textColor="#505050"
                    />
                </Likes>
            </div>
            <div className="main-post">
                <Link to={`/user/${id}`}><p><strong>{userInfo.username}</strong></p></Link>
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
const Likes = styled.div `
    cursor: pointer;  
    display: flex;
    flex-direction: column;
    align-items: center;
`;

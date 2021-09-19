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
    const { userInfo, userId } = props;
    const { user } = useContext(UserContext);
    const [tooltipMessage, setTooltipMessage] = useState('')
    const [liked, setLiked] = useState(likes.some(like => like.userId === user.user.id));
    const [postLikes, setPostLikes] = useState(likes);
    function checkHashtag() {
        const textCheck = text.split(' ').map((word, index) => {
            if (word[0] === '#') {
                return (
                <Link 
                    key={index} 
                    to={`/hashtag/${word.substring(1)}/posts`
                    }
                    >
                        <HashtagCSS> #{word.substring(1)}</HashtagCSS>
                </Link>
                )
            } else {
                return ` ${word}`
            }
        })

        return textCheck;
    }
    function renderTooltip() {
        let usersLikes = []
        if(postLikes.length !== 0) {
            usersLikes = postLikes.filter(item => {
                if(item.userId === id) return false;
                return true;
            }) 
        }
        console.log(userId, postLikes.length)
        if (postLikes === likes) {
            switch (postLikes.length) {
                case 0: 
                    setTooltipMessage('');
                    return;
                case 1: 
                    setTooltipMessage(`${liked ? 'Você' : postLikes[0]['user.username']} curtiu`);
                    break;
                case 2:
                    setTooltipMessage(
                       `${liked ? 'Você e ' + usersLikes[0]['user.username'] 
                            : 
                            postLikes[0]['user.username'] + ' e ' + postLikes[1]['user.username'] 
                        } curtiram`
                    );
                    break;
                default:
                    setTooltipMessage(
                        `${liked ? 'Você, ' + usersLikes[0]['user.username'] 
                        : 
                        postLikes[0]['user.username'] + ', ' + postLikes[1]['user.username'] 
                        } e outras ${postLikes.length - 2} pessoas`
                    );   
            }
        } else {
            switch (postLikes.length) {
                case 0: 
                    setTooltipMessage('');
                    return;
                case 1: 
                    setTooltipMessage(`${liked ? 'Você' : postLikes[0].username} curtiu`);
                    break;
                case 2:
                    setTooltipMessage(
                       `${liked ? 'Você e ' + usersLikes[0].username 
                            : 
                            postLikes[0].username + ' e ' + postLikes[1].username 
                        } curtiram`
                    );
                    break;
                default:
                    setTooltipMessage(
                        `${liked ? 'Você, ' + usersLikes[0].username 
                        : 
                        postLikes[0].username + ', ' + postLikes[1].username 
                        } e outras ${postLikes.length - 2} pessoas`
                    );   
            }
        }
    }

    const effectTooltip = renderTooltip;
    useEffect(() => {
        effectTooltip();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[effectTooltip])
    
    function changeLike() {
        if(!liked) {
            toggleLike({ token: user.token, postId: id, status: 'like' })
            .then((r) => {
                setPostLikes(r.data.post.likes);
                setLiked(true); 
                });
        } else {
            toggleLike({ token: user.token, postId: id, status: 'dislike' })
            .then((r) => {
                setPostLikes(r.data.post.likes);
                setLiked(false);
                });
        }
    }
    return (
        <ContainerUserPost>
            <div className="photo-and-likes">
                <Link to={`/user/${userId}`}><img src={userInfo.avatar} alt=''/></Link>
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
                    <p>{postLikes.length} {postLikes.length <= 1 ? 'like' : 'likes'}</p>
                    <ReactTooltip 
                        place="bottom"
                        type="light"
                        backgroundColor="#FFFFFF30"
                        textColor="#505050"
                    />
                </Likes>
            </div>
            <div className="main-post">
                <Link to={`/user/${userId}`}><p><strong>{userInfo.username}</strong></p></Link>
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

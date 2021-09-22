import { Link, useLocation } from 'react-router-dom' 
import { FiTrash } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import ContainerUserPost from './ContainerUserPost'
import ReactModal from 'react-modal';
import { deletePost, getPosts, getUserPosts } from '../../service/API';
import styled from 'styled-components';
import { toggleLike, editPost } from '../../service/API';
import UserContext from '../../contexts/UserContext';
import ReactTooltip from 'react-tooltip';
import { TiPencil } from 'react-icons/ti';
import { useEffect, useContext, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import getYouTubeID from 'get-youtube-id';
export default function UserPost(props) {
    let location = useLocation();
    

    const {
        id,
        linkTitle, 
        text, 
        linkImage, 
        linkDescription,  
        likes,
    } = props.post;
    let {
        link,
    } = props.post
    function isYTBlink(url){
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
         if(url.match(p)){
             return true;
         }
         else {
             return false;
         }
    }
    const { userInfo, userId, setPosts } = props;
    const { user } = useContext(UserContext);
  
    const [tooltipMessage, setTooltipMessage] = useState('')
    const [liked, setLiked] = useState(likes.some(like => like.userId === user.user.id));
    const [postLikes, setPostLikes] = useState(likes);

    const [myPost, setMyPost] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [actualText, setActualText] = useState(text);
    const [editedText, setEditedText] = useState(text);
    const [isDisabled, setIsDisabled] = useState(false);

    const textAreaRef = useRef();
    const effectTooltip = renderTooltip;
  
    const [habilitar,setHabilitar] = useState(true);
    ReactModal.setAppElement(document.getElementById('root'))
    const [isOpen,setIsopen] = useState(false);
    const [openFrame,setOpenFrame] = useState(false);
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#333333',
          borderRadius: '50px',
          width: '600px',
          height: '262px',
          display:'flex',
          justifyContent: 'center',
        },
      };
  const frameStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: '50%',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        background: '#333333',
        borderRadius: '20px',
        width: '60vw',
        height: '90vh',
        display:'flex',
        justifyContent: 'center',
      },
      overlay: {zIndex: 3},
  }
    useEffect(() => {
        if(user.user.id === userInfo.id){
                setMyPost(true);
            }
        if(editMode){
            checkEditMode();
        }
        effectTooltip();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editMode, effectTooltip]);
    
    function isMypost(){
        if(user.user.id === userInfo.id){
            return true;
        }
        else{
            return false;
        }
    }
       
    function AbrirModal(){
        setIsopen(true);
    }

    function FecharModal(){
        setIsopen(false);
        setOpenFrame(false);
    }
    function ApagarPost(id){
        setHabilitar(false);
        console.log(id);
        deletePost(user.token, id).then(Sucesso).catch(Erro);
    }

    function Sucesso(){
        setHabilitar(true);
        setIsopen(false);
        alert("Post deletado com sucesso");
        if(location.pathname === "/timeline"){
            getPosts(user.token).then((res)=> {
                setPosts(res.data);
            })
        }
        else if (location.pathname === "/my-posts"){
            getUserPosts({ token: user.token, userId: user.user.id})
            .then((r) => {
                setPosts(r.data);
            })
        }

    }
    function Erro(){
        setHabilitar(true)
        setIsopen(false);
        alert("Não foi possível excluir o Post tenta novamente");
    }

    function checkHashtag() {
        const textCheck = actualText.split(' ').map((word, index) => {
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

    function checkEditMode(){
        if(editMode){
            setEditedText(actualText)
        }
       textAreaRef.current.focus();
    }

    function pressedKey(e){
        if(e.keyCode === 27){
            setEditMode(false);
        }
        if(e.keyCode === 13 && !e.shiftKey){
            
            e.preventDefault();

            setIsDisabled(true);
            
            const body = {
                text : editedText
            };

            editPost({ token: user.token, body: body, postId: id })
                .then((response) => {
                    setIsDisabled(false);
                    setEditMode(false);
                    setEditedText(response.data.post.text)
                    setActualText(response.data.post.text)
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ops...',
                        text: 'Não foi possível salvar as alterações',
                    })
                    textAreaRef.current.focus();
                })
        }
    }

    return (
        <ContainerUserPost id="main">
            <ReactModal
                isOpen={isOpen}
                onRequestClose={FecharModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                    <BoxModal>
                        <ModalTitle>{habilitar ? 'Tem certeza que deseja excluir essa publicação' : 'Carregando...' }</ModalTitle>
                        <div>
                            <ModalCancel onClick={FecharModal} state={habilitar}>Não, voltar</ModalCancel>
                            <ModalConfirm onClick={()=>ApagarPost(id)}  state={habilitar}>Sim, excluir</ModalConfirm>
                        </div>
                    </BoxModal>
            </ReactModal>
            <ReactModal
                isOpen={openFrame}
                onRequestClose={FecharModal}
                style={frameStyle}
                contentLabel="Example Modal"
            >
                    <BoxFrame>
                        <div>
                            <button onClick={() =>{window.open(link, "_blank")}}>Open in new tab</button>
                            <p onClick={FecharModal}>X</p>
                        </div>
                        <iframe title="Link" src={link} width="100%" height="95%" />
                    </BoxFrame> 
            </ReactModal>
            <div className="photo-and-likes">
                <Link
					to={`/user/${userId}`}>
				<img src={userInfo.avatar} alt=''/>
				</Link>
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
                <div className="top-post">
                    <Link to={`/user/${userId}`}><p><strong>{userInfo.username}</strong></p></Link>
                    <div className="icons">
                        {myPost ? <TiPencil onClick={() => setEditMode(!editMode)} style={{cursor: 'pointer'}}/> : <p></p>}
                        {isMypost() ? <FiTrash onClick={AbrirModal} style={{marginLeft:'10px'}}/> : <p></p>}
                    </div>
                </div>
                {editMode ? 
                <EditBox 
                    type="text"
                    value={actualText}
                    onChange={(e) => setActualText(e.target.value)}
                    ref={textAreaRef}
                    onKeyDown={(e) => pressedKey(e)}
                    disabled={isDisabled}/>
                :
                <p>{checkHashtag()}</p>}
                {isYTBlink(link) ? <><iframe src={`https://www.youtube.com/embed/${getYouTubeID(link)}`} title="video" width="100%" height="320px" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowFullScreen/><p onClick={() =>{window.open(link, "_blank")}} style={{cursor:'pointer'}}>{link}</p></> :
                <div className="link-content" onClick={()=>setOpenFrame(true)}>
                    <div className="link-description">
                        <p>{linkTitle}</p>
                        <p>{linkDescription}</p>
                        <p>{link}</p>
                    </div>
                    <img src={linkImage} alt='' />
                </div>}
            </div>
        </ContainerUserPost>
    )
}


const BoxModal = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    div {
        align-items: center;
        justify-content: center;
        flex-direction: row;
        margin-top: 30px;
    }
    button{
        border-radius: 5px;
        width: 134px;
        height: 37px;
        border: none;
        font-size: 18px;
        margin: 10px;
    }
`

const ModalTitle = styled.h1`
font-size: 34px;
color: #ffffff;
text-align: center;
`

const ModalConfirm = styled.button`
background: #1877F2;
color: #ffffff;
opacity: ${props => props.state ? 1 : 0.6};
cursor: ${props => props.state ? 'pointer' : 'not-allowed'};
`
const ModalCancel = styled.button`
background: #ffffff;
color: #1877F2;
opacity: ${props => props.state ? 1 : 0.6};
cursor: ${props => props.state ? 'pointer' : 'not-allowed'};
`
const HashtagCSS = styled.span`
    font-weight: 700;
    color: #ffffff;
`;

const Likes = styled.div`
    cursor: pointer;  
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const EditBox = styled.textarea`
    font-family: 'Lato', sans-serif;
    font-size: 17px;
    color: #4c4c4c;
    margin-bottom: 15px;
    resize: none;
    outline: none;
    border-radius: 5px;
    padding: 10px;
    pointer-events: ${props => props.disabled ? 'none' : 'all'};
    background-color: ${props => props.disabled ? '#e5e5e5' : '#ffffff'};
`;

const BoxFrame = styled.div`
width: 100%;
background: #333333;
    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        
    }
    button {
        background: #1877F2;
        border-radius: 5px;
        font-size: 14px;
        font-family: 'Lato',sans-serif;
        color: #FFFFFF;
        border: none;
        width: 138px;
        height: 31px;
        cursor: pointer;
    }
    p{
        font-size: 25px;
        text-align: center;
        color: #FFFFFF;
        cursor: pointer;
    }
    iframe{
        margin-top: 16px;
        border-radius: 10px;
    }

`
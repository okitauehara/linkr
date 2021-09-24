import { Link, useLocation } from 'react-router-dom' 
import { FiTrash } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart,AiOutlineComment } from 'react-icons/ai'
import {FiSend} from 'react-icons/fi';
import ContainerUserPost from './ContainerUserPost'
import ReactModal from 'react-modal';
import { deletePost, getPosts, getUserPosts,getComments,sendComments, getFollowingList} from '../../service/API';
import styled from 'styled-components';
import { toggleLike, editPost } from '../../service/API';
import UserContext from '../../contexts/UserContext';
import ReactTooltip from 'react-tooltip';
import { TiPencil } from 'react-icons/ti';
import { useEffect, useContext, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import DefaultImg from '../../assets/default.jpg';

export default function UserPost(props) {
    let location = useLocation();
    

    const {
        id,
        linkTitle, 
        text, 
        linkImage, 
        linkDescription, 
        link, 
        likes,
    } = props.post;
  
    const { userInfo, userId, setPosts } = props;
    const { user } = useContext(UserContext);
  
    const [tooltipMessage, setTooltipMessage] = useState('')
    const [liked, setLiked] = useState(likes.some(like => like.userId === user.user.id));
    const [postLikes, setPostLikes] = useState(likes);
    const [comments,setComments] = useState([]);
    const [myPost, setMyPost] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [actualText, setActualText] = useState(text);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isComments,setIscomments] = useState(false);
    const [textComment, setTextComment] = useState("");
    const [followList,setFollowList] = useState([]);
    const textAreaRef = useRef();
    const effectTooltip = renderTooltip;
  
    const [habilitar,setHabilitar] = useState(true);
    ReactModal.setAppElement(document.getElementById('root'))
    const [isOpen,setIsopen] = useState(false);
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
  
      useEffect(()=>{
        getComments(user.token,id)
        .then((r)=>{
            setComments(r.data)})
        .catch(()=>{
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "Houve uma falha ao obter os comentarios, por favor atualize a página"
            })
        })
        getFollowingList(user.token)
        .then((res)=>{
            setFollowList(res.data)
            
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
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
    }
    function ApagarPost(id){
        setHabilitar(false);
        deletePost(user.token, id).then(Sucesso).catch(Erro);
    }

    function Sucesso(){
        setHabilitar(true);
        setIsopen(false);
        Swal.fire({
            icon: "sucess",
            title: "Post deletado com sucesso!",
        })
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
        Swal.fire({
            icon: "error",
            title: "Ops...",
            text: "Não foi possível excluir o post, tente novamente"
        })
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
                text : actualText
            };

            editPost({ token: user.token, body: body, postId: id })
                .then((response) => {
                    setIsDisabled(false);
                    setEditMode(false);
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
    function toggleComments(){
        if(isComments){
            setIscomments(false);
        }
        else{
            setIscomments(true);
        }
    }
    function sendComment(e){
        e.preventDefault();
        setIsDisabled(true);
        if (textComment === " " || textComment === ""){
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "Impossível enviar comentario vazio"
            })
            return;
        }
        const body = {
            text: textComment,
            user: user.id,
        }
        sendComments(user.token,id,body).then(succesComentario).catch((r)=>console.log(r))
    }

    function succesComentario(){
        setIsDisabled(false)
        getComments(user.token,id)
        .then((r)=>{
            setComments(r.data)})
        .catch(()=>{
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "Houve uma falha ao obter os comentarios, por favor atualize a página"
            })
        })
        setTextComment('');
    }
    function isPostAuthor(commentUserId){
        if(userId === commentUserId){
            return true
        }
        else{
            return false
        }
    }
     function isFollowing(commentUserId){
        let bolean = false;
        // eslint-disable-next-line
        followList.users.map((userFollow) =>{
            if(commentUserId === userFollow.id){
                bolean = true;
            }
        } )
       return bolean;
    }
    return (
      <BoxPost> 
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
            <div className="photo-and-likes">
                <Link
					to={`/user/${userId}`}>
				<img src={userInfo.avatar} alt=''/>
				</Link>
                    <Likes
                        data-tip={tooltipMessage}
                        onClick={changeLike}>
                        {liked ? 
                            <AiFillHeart
                            style={{color: '#ac0000'}} 
                            /> 
                            : 
                            <AiOutlineHeart />}
                        <p>{postLikes.length} {postLikes.length <= 1 ? 'like' : 'likes'}</p>
                        <ReactTooltip 
                            place="bottom"
                            type="light"
                            backgroundColor="#FFFFFF30"
                            textColor="#505050"
                        />
                    </Likes>
                    <div className="comments" onClick={toggleComments}>
                        <AiOutlineComment/>
                        <p>{comments.length === 0 ? '0' : comments.comments.length} comments</p>
                    </div>
            </div>
            <div className="main-post">
                <div className="top-post">
                    <Link to={`/user/${userId}`}><p><strong style={{maxWidth: '611px', wordBreak: 'break-word'}}>{userInfo.username}</strong></p></Link>
                    <div className="icons">
                        {myPost ? <TiPencil onClick={() => setEditMode(!editMode)} style={{cursor: 'pointer'}}/> : <p></p>}
                        {isMypost() ? <FiTrash onClick={AbrirModal} style={{marginLeft:'10px', cursor: 'pointer'}}/> : <p></p>}
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
                <div onClick={() =>{window.open(link, "_blank")}} className="link-content">
                    <div className="link-description">
                        <p>{linkTitle}</p>
                        <p>{linkDescription}</p>
                        <p>{link}</p>
                    </div>
                    <img src={linkImage ? linkImage : DefaultImg} alt='' />
                </div>
            </div>
        </ContainerUserPost>
        {isComments ? <ContainerComments>
                        {comments.comments.length === 0 ? <p>Não existe comentários</p> : 
                        <Comments>
                            {comments.comments.map((comment)=>{
                                return( 
                                <>
                                    <Comment key={comment.id}>
                                            <img src={comment.user.avatar} alt="avatar"></img>
                                            <div>
                                                <div className="user-info">
                                                <Link to={`user/${comment.user.id}`}>
                                                <h1>{comment.user.username} </h1>
                                                </Link>
                                                {isPostAuthor(comment.user.id) ? <span>• post’s author</span> : (isFollowing(comment.user.id) ? <span>• following</span> : <span></span>)}
                                                </div>
                                                <h2>{comment.text}</h2>
                                            </div>
                                    </Comment>
                                    <hr className="borda"/>
                                </>)
                            })}
                        </Comments>
                        }
                        <form onSubmit={sendComment}>  
                            <img src={user.user.avatar} alt="useravatar"></img>
                            <InputComment type="text" placeholder="write a comment..." onChange={(e)=> setTextComment(e.target.value)} value={textComment} disabled={isDisabled}></InputComment>  
                            <ButtonComment disabled={isDisabled}><FiSend className="icon-send" onClick={sendComment}></FiSend></ButtonComment>   
                        </form>           
                    </ContainerComments> : <p></p> }
    </BoxPost>
    )
}

const BoxPost = styled.div` 
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;
`

const InputComment = styled.input`
    width: 510px;
    height: 39px;
    background: #252525;
    border-radius: 8px;
    border: none;
    color: #FFFFFF;
    opacity: ${props => props.disabled ? '0.6' : '1'};
    :focus{
        outline: none;
    }
`
const ButtonComment = styled.button`
     position: absolute;
        right: 30px;
        color: #FFFFFF;
        width: 30px;
        background: none;
        border: none;
        cursor: ${props => props.disabled ? 'not-allowed' : 'Pointer'};
        pointer-events: ${props=> props.disabled ? 'none' : 'all'};
`

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

const ContainerComments = styled.div`
background-color: #1E1E1E;
display: flex;
flex-direction: column;
width: 611px;
border-radius: 16px;
margin-top:-30px;


    img{
        width: 39px;
        height: 39px;
        border-radius: 304px;
    }
    form{
        position: relative;
        display: flex;
        justify-content: space-around;
        height: 100px;
        align-items: center;
    }
    .borda{
        border-color: #353535;
        width: 571px;
    }
`
const Comments = styled.div`
display: flex;
width: 611px;
flex-direction: column;
font-family: 'Lato',sans-serif;
font-size: 14px;
padding-top:60px;
    img{ 
        margin-left: 25px;
        margin-right: 18px;
    }
    h1{
        color: #F3F3F3;
        margin-bottom: 10px;
    }
    h2{
        color: #ACACAC; 
    }

`
const Comment = styled.div`
display: flex;
word-break: break-word;
padding: 8px;
.user-info{
    display: flex;
    span{
        margin-left: 5px;
        color: #565656;
        font-size: 14px;
    }
}
`
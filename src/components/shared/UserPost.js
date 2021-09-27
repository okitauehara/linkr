import { Link, useLocation } from 'react-router-dom' 
import { FiTrash,FiSend } from "react-icons/fi";
import ReactModal from 'react-modal';
import { deletePost, getUserPosts,getComments,sendComments, getFollowingList,getFollowingUsersPosts,} from '../../service/API';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai'
import {ContainerUserPost, BoxModal, ModalTitle, ModalConfirm, ModalCancel, HashtagCSS, Interaction, EditBox, MainContent, BoxFrame } from './ContainerUserPost'
import { toggleLike, editPost } from '../../service/API';
import UserContext from '../../contexts/UserContext';
import ReactTooltip from 'react-tooltip';
import { TiPencil } from 'react-icons/ti';
import { useEffect, useContext, useRef, useState } from 'react';
import {RepostButton, RepostedDiv} from './Repost'
import Swal from 'sweetalert2';
import getYouTubeID from 'get-youtube-id';
import DefaultImg from '../../assets/default.jpg';

export default function UserPost(props) {
    let location = useLocation();

    const {
        id,
        linkTitle, 
        text, 
        linkImage, 
        linkDescription,  
        likes,
        repostedBy,
        repostCount,
    } = props.post;
    let {
        link,
    } = props.post


    function checkYoutubeLink(url){
        let YoutubePattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
         if(url.match(YoutubePattern)){
             return true;
         }
         else {
             return false;
         }
    }
    const { userInfo, userId, setPosts, posts } = props;
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
    const [numberOfReposts, setNumberOfReposts] = useState(repostCount)
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
          justifyContent: 'center'
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
        deletePost(user.token, id).then(Sucesso).catch(Erro);
    }

    function Sucesso(){
        setHabilitar(true);
        setIsopen(false);
        Swal.fire({
            icon: "success",
            title: "Post deletado com sucesso!",
        })
        if(location.pathname === "/timeline"){
            getFollowingUsersPosts(user.token).then((response)=> {
                setPosts(response.data.posts);
            })
        }
        else if (location.pathname === "/my-posts"){
            getUserPosts({ token: user.token, userId: user.user.id})
            .then((response) => {
                setPosts(response.data.posts);
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
            .then((response) => {
                setPostLikes(response.data.post.likes);
                setLiked(true); 
                });
        } else {
            toggleLike({ token: user.token, postId: id, status: 'dislike' })
            .then((response) => {
                setPostLikes(response.data.post.likes);
                setLiked(false);
                });
        }
    }

    function checkEditMode(){
       textAreaRef.current.focus();
    }

    function pressedKey(event){
        if(event.keyCode === 27){
            setEditMode(false);
        }
        if(event.keyCode === 13 && !event.shiftKey){
            
            event.preventDefault();

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
        <ContainerUserPost id="main" style={{marginTop: repostedBy ? '50px' : '0'}}>
            {repostedBy ? <RepostedDiv repostedBy={repostedBy} id={user.user.id}/> : null}
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
            <MainContent>
                <div className="photo-and-likes">
                    <Link to={`/user/${userId}`}>
                        <img src={userInfo.avatar} alt=''/>
                    </Link>
                    <Interaction data-tip={tooltipMessage} >
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
                    </Interaction>
                    <Interaction >
                            <AiOutlineComment 
                                style={{marginTop: '18px'}}
                             onClick={toggleComments} />
                        <p>{comments.length === 0 ? '0' : comments.comments.length} comments</p>
                    </Interaction>
                    <RepostButton 
                        postId={id} 
                        token={user.token} 
                        numberOfReposts={numberOfReposts} 
                        setNumberOfReposts={setNumberOfReposts}
                        setPosts={setPosts}
                        posts={posts}
                        customStyles={customStyles}
                    />
            </div>
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
                            {checkYoutubeLink(link) ? 
                            <>
                                <iframe src={`https://www.youtube.com/embed/${getYouTubeID(link)}`} title="video" width="100%" height="320px" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                                <p onClick={() =>{window.open(link, "_blank")}} style={{cursor:'pointer'}}>{link}</p>
                            </>
                            :
                        <div className="link-content" onClick={()=>setOpenFrame(true)}>
                            <div className="link-description">
                                <p>{linkTitle}</p>
                                <p>{linkDescription}</p>
                                <p>{link}</p>
                            </div>
                            <img src={linkImage ? linkImage : DefaultImg} alt='' />
                        </div>}
                    </div>
            </MainContent>
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
    ::placeholder{
        padding: 10px;
    }
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
        .icon-send{
            width: 20px;
            height: 20px;
        }
`


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
        margin-left: 20px;
    }
    form{
        position: relative;
        display: flex;
        justify-content: space-around;
        height: 100px;
        align-items: center;
    }
    .borda{
        border: 1px solid #353535;
        width: 571px;
        height: 1px;
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



import { Link, useLocation, useHistory } from 'react-router-dom' 
import { FiTrash,FiSend } from "react-icons/fi";
import ReactModal from 'react-modal';
import { deletePost, getUserPosts, getComments,sendComments, getFollowingList,getFollowingUsersPosts, toggleLike, editPost,} from '../../service/API';
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai'
import {ContainerUserPost, 
    BoxModal, 
    ModalTitle, 
    ModalConfirm, 
    ModalCancel, 
    HashtagCSS, 
    Interaction, 
    EditBox, 
    BoxFrame,     
    Comment,
    Comments,
    BoxPost,
    ContainerComments,
    ButtonComment,
    InputComment,
    MainContent,
 } from './ContainerUserPost'
import UserContext from '../../contexts/UserContext';
import ReactTooltip from 'react-tooltip';
import { TiPencil } from 'react-icons/ti';
import { useEffect, useContext, useRef, useState } from 'react';
import {RepostButton, RepostedDiv} from './Repost'
import Swal from 'sweetalert2';
import DefaultImg from '../../assets/default.jpg';
import getYouTubeID from 'get-youtube-id';
import {FaMapMarkerAlt} from 'react-icons/fa'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { containerMapStyles, mapStyle, headerMapStyles } from './modalMapStyles'
import ReactHashtag from "react-hashtag";

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
        geolocation,
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

    const history = useHistory();
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
    const [isMapOpen, setIsMapOpen] = useState(false);
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
            background: '#333333',
            transform: 'translate(-50%, -50%)',
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
      useEffect(()=>{
        getComments(user.token,id)
        .then((response)=>{
            setComments(response.data)})
        .catch(()=>{
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "Houve uma falha ao obter os comentarios, por favor atualize a página"
            })
        })
        getFollowingList(user.token)
        .then((response)=>{
            setFollowList(response.data)
            
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

    function redirectHashtag(value) {
        let hashtag = value.substring(1);
        history.push(`/hashtag/${hashtag}/posts`);
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
            {geolocation ? 
            <ReactModal
                isOpen={isMapOpen}
                onRequestClose={() => setIsMapOpen(false)}
                style={containerMapStyles}
                contentLabel="Example Modal"
            >
                <div className="map-header" style={headerMapStyles}>
                <ModalTitle style={{fontFamily: 'Oswald, sans-serif', fontWeight: 'bold'}}>
                {userInfo.username}'s location
                </ModalTitle>
                <span style={{color: 'white', cursor: 'pointer', fontFamily: 'Roboto', fontSize: '30px'}} onClick={() =>setIsMapOpen(false)}>x</span>
                </div>
                <MapContainer 
                    center={[geolocation.latitude, geolocation.longitude]} 
                    zoom={14} 
                    scrollWheelZoom={false} 
                    style={mapStyle}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <Marker position={[geolocation.latitude, geolocation.longitude]}>
                        <Popup>
                            {userInfo.username}
                        </Popup>
                    </Marker>
                </MapContainer>
            </ReactModal>
            : null }

            <div className="main-post">

                        <div className="name-and-location" >
                            <div className="top-post">
                                <Link to={`/user/${userId}`}><p><strong>{userInfo.username}</strong></p></Link>
                                    <div className="icons">
                                    {myPost ? <TiPencil onClick={() => setEditMode(!editMode)} style={{cursor: 'pointer'}}/> : <p></p>}
                                    {isMypost() ? <FiTrash onClick={AbrirModal} style={{marginLeft:'10px'}}/> : <p></p>}
                                    </div>
                            </div>
                            {!!geolocation ? <FaMapMarkerAlt onClick={() => setIsMapOpen(true)} style={{fontSize: '16px', color: '#FFFFFF', marginLeft: '5px', cursor: 'pointer'}}/> : null}
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
                            <HashtagCSS>
                                <ReactHashtag onHashtagClick={value => redirectHashtag(value)}>
                                    {actualText}
                                </ReactHashtag>
                            </HashtagCSS>}
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
                                                {isPostAuthor(comment.user.id) ? <span>• post's author</span> : (isFollowing(comment.user.id) ? <span>• following</span> : <span></span>)}
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
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
import DefaultImg from '../../assets/default.jpg';
import {FaMapMarkerAlt} from 'react-icons/fa'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


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
        geolocation,
    } = props.post;
  
    const { userInfo, userId, setPosts } = props;
    const { user } = useContext(UserContext);
    const [tooltipMessage, setTooltipMessage] = useState('')
    const [liked, setLiked] = useState(likes.some(like => like.userId === user.user.id));
    const [postLikes, setPostLikes] = useState(likes);
    const [myPost, setMyPost] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [actualText, setActualText] = useState(text);
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
            borderRadius: '50px',
            width: '600px',
            height: '262px',
            display:'flex',
            justifyContent: 'center',
        },
    };
    const containerMapStyles = {
        content: {
            padding: '0px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            background: '#333333',
            borderRadius: '20px',
            width: '790px',
            height: '356px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    };
    const mapStyle= {
        height: '240px', 
        width: '713px',
    }
    const headerMapStyles = {
        fontSize: '38px',
        padding: '0 40px',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        height: '81px',
        zIndex: '1', 
        backgroundColor: '#333333'
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
            {geolocation ? 
            <ReactModal
                isOpen={isMapOpen}
                onRequestClose={() => setIsMapOpen(false)}
                style={containerMapStyles}
                contentLabel="Example Modal"
            >
            <div className="map-header" style={headerMapStyles}>
                <ModalTitle style={{fontFamily: 'Oswald, sans-serif', fontWeight: 'bold'}}>{userInfo.username}'s location</ModalTitle>
                <span style={{color: 'white', cursor: 'pointer'}} onClick={() =>setIsMapOpen(false)}>x</span>
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
            </div>
            <div className="main-post">
                <div className="top-post">
                    <div className="name-and-location" >
                    <Link to={`/user/${userId}`}><p><strong style={{maxWidth: '611px', wordBreak: 'break-word'}}>{userInfo.username}</strong></p></Link>
                    {!!geolocation ? <FaMapMarkerAlt onClick={() => setIsMapOpen(true)} style={{fontSize: '16px', color: '#FFFFFF', marginLeft: '5px', cursor: 'pointer'}}/> : null}
                    </div>
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

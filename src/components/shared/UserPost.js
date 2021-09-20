import { Link, useLocation } from 'react-router-dom' 
import { AiOutlineHeart } from 'react-icons/ai'
import { FiTrash } from "react-icons/fi";
import { TiPencil } from 'react-icons/ti';
import ContainerUserPost from './ContainerUserPost'
import ReactModal from 'react-modal';
import { deletePost, getPosts, getUserPosts } from '../../service/API';
import styled from 'styled-components';
import { useEffect, useContext, useRef, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { editPost } from '../../service/API';
import Swal from 'sweetalert2';

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
    const { user } = useContext(UserContext);
  
    const { setPosts, userInfo} = props;
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
        deletePost(user.token,id).then(Sucesso).catch(Erro);
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
            getUserPosts(user.token,user.user.id)
            .then((r) => setPosts(r.data))
        }

    }
    function Erro(){
        setHabilitar(true)
        setIsopen(false);
        alert("Não foi possível excluir o Post tenta novamente");
    }

    const [myPost, setMyPost] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [actualText, setActualText] = useState(text);
    const [editedText, setEditedText] = useState(text);
    const [isDisabled, setIsDisabled] = useState(false);

    const textAreaRef = useRef();

    useEffect(() => {
        if(user.user.id === userInfo.id){
                setMyPost(true);
            }
        if(editMode){
            checkEditMode();
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
            <div className="photo-and-likes">
                <Link to={`/user/${id}`}><img src={userInfo.avatar} alt=''/></Link> 
                <AiOutlineHeart />
                <p>{likes.length} likes</p>
            </div>
            <div className="main-post">
                    <div className="top-post">
                        <Link to={`/user/${id}`}><p><strong>{userInfo.username}</strong></p></Link>
                        <div className="icons">
                            {myPost ? <TiPencil onClick={() => setEditMode(!editMode)} style={{cursor: 'pointer'}}/> : <p></p>}
                            {isMypost() ? <FiTrash onClick={AbrirModal} style={{marginLeft:'10px'}}/> : <p></p>}
                        </div>
                    </div>
                    <div className="post-text">
                        {editMode ? 
                            <EditBox 
                                type="text"
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                ref={textAreaRef}
                                onKeyDown={(e) => pressedKey(e)}
                                disabled={isDisabled}/>
                            :
                                <p>{checkHashtag()}</p>}
                    </div>
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

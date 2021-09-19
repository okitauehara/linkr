import { Link, useLocation } from 'react-router-dom' 
import { AiOutlineHeart } from 'react-icons/ai'
import { FiTrash } from "react-icons/fi";
import ContainerUserPost from './ContainerUserPost'
import ReactModal from 'react-modal';
import { useContext, useState} from 'react';
import { deletePost, getPosts, getUserPosts } from '../../service/API';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';

export default function UserPost(props) {
    let location = useLocation();
    
    const usuario = useContext(UserContext);
    const {
        id,
        user,
        linkTitle, 
        text, 
        linkImage, 
        linkDescription, 
        link, 
        likes,
    } = props.post;
    const { setPosts} = props;
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

    function AbrirModal(){
        setIsopen(true);
    }

    function FecharModal(){
        setIsopen(false);
    }
    function ApagarPost(id){
        setHabilitar(false);
        deletePost(usuario.user.token,id).then(Sucesso).catch(Erro);
    }
    console.log(usuario)

    function Sucesso(){
        setHabilitar(true);
        setIsopen(false);
        alert("Post deletado com sucesso");
        if(location.pathname === "/timeline"){
            getPosts(usuario.user.token).then((res)=> {
                setPosts(res.data);
            })
        }
        else if (location.pathname === "/my-posts"){
            getUserPosts(usuario.user.token, usuario.user.user.id)
            .then((r) => setPosts(r.data))
        }

    }
    function Erro(){
        setHabilitar(true)
        setIsopen(false);
        alert("Não foi possível excluir o Post tenta novamente");
    }
    
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
    function isMyPost(){
        if(user.id === usuario.user.user.id){
            return true;
        }
        else{
            return false;
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
                <Link to={`/user/${id}`}><img src={user.avatar} alt=''/></Link> 
                <AiOutlineHeart />
                <p>{likes.length} likes</p>
            </div>
            <div className="main-post">
                <p><strong>{user.username}</strong>
                    {isMyPost() ? <FiTrash onClick={AbrirModal}/> : <p></p>}
                </p>
                <p>{text}</p>
                    <Link to={`/user/${id}`}><p><strong>{user.username}</strong></p></Link>
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

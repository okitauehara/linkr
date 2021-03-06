import {BoxModal, ModalTitle, ModalConfirm, ModalCancel,Interaction} from './ContainerUserPost'
import { BiRepost } from 'react-icons/bi'
import {repost} from '../../service/API'
import styled from 'styled-components'
import ReactModal from 'react-modal';
import {useState} from 'react'
import Swal from 'sweetalert2';

function RepostButton({token, postId, numberOfReposts, setNumberOfReposts, posts, setPosts, customStyles}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isModalEnabled, setIsModalEnabled] = useState(true)
    function callRepost() {
        setIsModalEnabled(false)
        repost({token: token, postId: postId})
        .then((res) => {
            const newPosts = [res.data.post, ...posts];
            setIsModalEnabled(true)
            setIsOpen(false)
            setPosts(newPosts)
            setNumberOfReposts(numberOfReposts + 1)
        })
        .catch(() => {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "Houve uma falha ao repostar o post desse usuário"
            })
        })
    }

    function toggle() {
        setTimeout(() => setIsOpen(!isOpen), 100)
    }
    return (
        <Interaction onClick={() => setIsOpen(true)}>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <BoxModal>
                    <ModalTitle>{isModalEnabled ? 'Deseja mesmo repostar esse post?' : 'Carregando...'}</ModalTitle>
                    <div>
                        <ModalCancel onClick={toggle} state={isModalEnabled}>Não</ModalCancel>
                        <ModalConfirm onClick={callRepost} state={isModalEnabled}>Sim</ModalConfirm>
                    </div>
                </BoxModal>
            </ReactModal>
            <BiRepost 
                style={{fontSize: '20px', marginTop: '18px'}}
            />
            <p>{numberOfReposts} re-posts</p>
        </Interaction>
    )
}
function RepostedDiv({repostedBy, id}) {
    return(
        <ContainerRepost>
        <BiRepost  style={{fontSize: '20px'}}/>
        <span> Re-posted by <strong>{repostedBy.id === id ? 'you' : repostedBy.username}</strong></span>
        </ContainerRepost>

    )

}

export {
    RepostButton,
    RepostedDiv
}

const ContainerRepost = styled.div`
    z-index: -1;
    position: absolute;
    top: -33px;
    display: flex;
    align-items: center;
    color: white;
    height: 50px;
    width: 611px;
    padding: 0 0 17px 13px;
    border-radius: 16px 16px 0 0;
    background-color: #1E1E1E;
    
    span {
        font-size: 11px;
        margin-left: 5px;
    }
    @media (max-width: 620px) {
        width: 100%;
        border-radius: 0;
    }
` 
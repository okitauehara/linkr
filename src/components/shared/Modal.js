import {BoxModal, ModalTitle, ModalConfirm, ModalCancel} from './ContainerUserPost'
import ReactModal from 'react-modal';

export default function Modal({isOpen, setIsOpen, user, id, success, enabled, setEnabled}) {
    ReactModal.setAppElement(document.getElementById('root'))
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

    function deletePost(id){
        setEnabled(false);
        deletePost(user.token, id)
         .then(success)
         .catch(error);
    }

    function error(){
        setEnabled(true)
        setIsOpen(false);
        alert("Não foi possível excluir o Post tenta novamente");
    }


    return (

        <ReactModal
        isOpen={isOpen}
        onRequestClose={setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
        >
            <BoxModal>
                <ModalTitle>{enabled ? 'Tem certeza que deseja excluir essa publicação' : 'Carregando...' }</ModalTitle>
                <div>
                    <ModalCancel onClick={setIsOpen(false)} state={enabled}>Não, voltar</ModalCancel>
                    <ModalConfirm onClick={()=>deletePost(id)}  state={enabled}>Sim, excluir</ModalConfirm>
                </div>
            </BoxModal>
        </ReactModal>
    )
}
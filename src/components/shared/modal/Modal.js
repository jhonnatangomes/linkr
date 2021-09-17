import styled from "styled-components";
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

const Modal = ({ modal, closeModal}) => {

    const { modalIsOpen, message, onConfirm, confirmText, cancelText} = modal;

    let confirmFunction = onConfirm;

    if (!modal.onConfirm) {
        confirmFunction = closeModal;
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#333333',
            color: '#FFFFFF',
            borderRadius: '50px',
            maxWidth: '597px',
            width: '90%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            lineHeight: '41px'
        }
    };

    return (
        <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <ModalContent>
                <Message>
                    {message}
                </Message>
                <ContainerButtons>
                    {onConfirm && (
                        <CancelButton onClick={closeModal}>
                            {cancelText || 'Cancelar'}
                        </CancelButton>
                    )}

                    <ConfirmButton onClick={confirmFunction}>
                        {confirmText || 'OK'}
                     </ConfirmButton>
                </ContainerButtons>
            </ModalContent>
        </ReactModal>
    )
}

const Message = styled.span`
    font-size: 32px;
    font-weight: bold;
    font-family: Lato;
`;

const ContainerButtons = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 48px;
`;

const ConfirmButton = styled.button`
    width: 134px;
    height: 37px;
    background: #1877f2;
    border-radius: 5px;
    font-family: Lato;
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    border: none;
    cursor: pointer;

    :hover {
        background-color: #18a9f2;
    }
`;

const CancelButton = styled.button`
    width: 134px;
    height: 37px;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: Lato;
    font-size: 18px;
    font-weight: 700;
    color: #1877f2;
    border: none;
    cursor: pointer;
    margin-right: 27px;

    :hover {
        color: #18a9f2;
    }
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-bottom: 46px;
    margin-top: 18px;
`;

export default Modal;


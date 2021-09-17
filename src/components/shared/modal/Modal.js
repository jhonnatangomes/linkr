import styled from "styled-components";
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

const Modal = ({ modal, closeModal}) => {

    const { modalIsOpen, message, onConfirm, confirmText, loading, cancelText} = modal;
    let confirmFunction = onConfirm;

    if (!modal.onConfirm) {
        confirmFunction = closeModal;
    }

    if (loading) {
        closeModal = () => {}
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
                        <CancelButton disabled={loading} onClick={closeModal}>
                            {cancelText || 'Cancelar'}
                        </CancelButton>
                    )}

                    <ConfirmButton disabled={loading} onClick={confirmFunction}>
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

    @media (max-width: 700px) {
        font-size: 28px;
    }
`;

const ContainerButtons = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    justify-content: center;
    align-items: center;
    justify-items: center;
    margin: 0 auto;
    width: fit-content;
    column-gap: 27px;
    margin-top: 48px;
`;

const ConfirmButton = styled.button`
    background: #1877f2;
    color: #ffffff;

    &:not([disabled]):hover {
        background-color: #18a9f2;
    }
`;

const CancelButton = styled.button`
    background: #FFFFFF;
    color: #1877f2;

    &:not([disabled]):hover {
        color: #18a9f2;
    }
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-bottom: 46px;
    margin-top: 18px;

    & button {
        width: 134px;
        min-height: 37px;
        border-radius: 5px;
        font-family: Lato;
        font-size: 18px;
        font-weight: 700;
        border: none;
        cursor: pointer;

        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    }

    @media (max-width: 700px) {
         width: 90%;
    }
`;

export default Modal;
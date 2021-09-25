import styled from "styled-components";
import ReactModal from 'react-modal';
import { useState, useEffect } from "react";
import { ReactComponent as CloseSvg } from '../../../assets/icons/close.svg';
import MapContent from './MapContent';
import ConfirmContent from './ConfirmContent';
import AlertContent from './AlertContent';
import PreviewContent from './PreviewContent'
import { useHistory } from 'react-router-dom';

ReactModal.setAppElement('#root');

const Modal = ({ modal, closeModal }) => {

    const { modalIsOpen, message, onConfirm, confirmText, loading, cancelText, preview, geolocation, username} = modal;
    const history = useHistory();

    const types = {
        GEOLOCATION: 'GEOLOCATION',
        PREVIEW: 'PREVIEW',
        CONFIRM: 'CONFIRM',
        ALERT: 'ALERT',
        NONE: 'NONE'
    }

    const [type, setType] = useState(types.NONE);

    let confirmFunction = onConfirm;

    if (!modal.onConfirm) {
        confirmFunction = closeModal;
    }

    if (loading) {
        closeModal = () => {}
    }

    const CloseButton = () => {
        return (
            <CloseIcon onClick={closeModal} />
        )
    }

    useEffect(() => {
        if (modalIsOpen) {
            document.body.style.overflow = 'hidden';

            window.onpopstate = e => {
                closeModal();
                history.push(history.location);
            }

            if (geolocation) {
                setType(types.GEOLOCATION);

            } else if (preview) {
                setType(types.PREVIEW);

            } else if (onConfirm) {
                setType(types.CONFIRM);

            } else if (message) {
                setType(types.ALERT);

            }

        } else {
            document.body.style.overflow = 'scroll';
            window.onpopstate = e => {

            }
        }

    }, [modalIsOpen, onConfirm]); //eslint-disable-line react-hooks/exhaustive-deps

 
    const customStyles = {
        content: {
            top: 'calc(50% - 100px)',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#333333',
            color: '#FFFFFF',
            borderRadius: (preview || geolocation) ? '20px' : '50px',
            overflow: 'hidden',
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: '-200px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            zIndex: 6
        },
    };


    return (
        <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >  
            {modalIsOpen && (
                <ModalContent>
                    {(type === types.ALERT) && (
                        <AlertContent
                            closeModal={closeModal}
                            message={message}
                            confirmText={confirmText}
                            confirmFunction={confirmFunction}
                            cancelText={cancelText}
                            loading={loading}
                        />
                    )}

                    {(type === types.CONFIRM) && (
                        <ConfirmContent
                            closeModal={closeModal}
                            message={message}
                            confirmText={confirmText}
                            confirmFunction={confirmFunction}
                            cancelText={cancelText}
                            loading={loading}
                        />
                    )}

                    {(type === types.GEOLOCATION) && (
                        <MapContent
                            username={username}
                            CloseButton={CloseButton}
                            geolocation={geolocation}
                        />
                    )}

                    {(type === types.PREVIEW) && (
                        <PreviewContent 
                            closeModal={closeModal}
                            CloseButton={CloseButton}
                            preview={preview}
                        />
                    )}

                </ModalContent>
            )}
        </ReactModal>
    )
}

const CloseIcon = styled(CloseSvg)`
    font-size: 30px;
    cursor: pointer;
`;

const ModalContent = styled.div`
    width: fit-content;
    height: fit-content;
    & button {
        padding: 0 17px;
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
`;

export default Modal;
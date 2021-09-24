import styled from "styled-components";
import ReactModal from 'react-modal';
import { useState, useEffect } from "react";
import { checkIframePermission } from "../../../services/iframeApi";
import Loading from "../Loading";
import noPreviewImg from '../../assets/imgs/no-image.png';
import { ReactComponent as CloseSvg } from '../../../assets/icons/close.svg';

ReactModal.setAppElement('#root');

const Modal = ({ modal, closeModal }) => {

    const [previewState, setPreviewState] = useState({available: true, loading: true});
    const [iframeVisibility, setIframeVisibility] = useState('none');
    const { modalIsOpen, message, onConfirm, confirmText, loading, cancelText, preview} = modal;
    let confirmFunction = onConfirm;

    if (!modal.onConfirm) {
        confirmFunction = closeModal;
    }

    if (loading) {
        closeModal = () => {}
    }

    const close = () => {
        closeModal();
        setIframeVisibility('none');
    }

    useEffect(() => {
        if (preview) {
            setPreviewState({ available: true, loading: true });
            setTimeout(() =>{
                setIframeVisibility('inherit');
            }, 2000);

            checkIframePermission(preview.src)
                .then((isAvailable) => {
                    if (isAvailable) {
                        setPreviewState({ loading: false, available: true });
                    } else {
                        setPreviewState({ loading: false, available: false });
                    }
                });
        }
    }, [preview]);

    const modalHeight = () => {
        if (preview && previewState.loading) {
            return '50vh';
        }

        if (preview && !previewState.loading && previewState.available) {
            return '90vh';
        }

        if (preview && !previewState.loading && !previewState.available && preview.title) {
            return 'fit-content';
        }

        if (preview && !previewState.loading && !previewState.available && !preview.title) {
            return '30vh';
        }

        if (!preview) {
            return '25vh'
        }

        return 'fit-content';
    }

    const modalWidth = () => {

        if (preview && previewState.loading) {
            return '55vw';
        }

        if (preview && !previewState.loading && previewState.available) {
            return '80vw';
        }

        if (preview && !previewState.loading && !previewState.available && (preview.title || preview.image)) {
            return '55vw';
        }

        if (preview && !previewState.loading && !previewState.available && !preview.title && !preview.image) {
            return '40vw';
        }

        if (!preview) {
            return '90vw'
        }

        return 'fit-content';
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
            borderRadius: preview ? '20px' : '50px',
            maxWidth: preview ? '1200px' : '597px',
            width: 'fit-content',
            height: 'fit-content',
            display: 'flex',
            justifyContent: preview ? 'flex-start' : 'center',
            alignItems:  preview ? 'flex-start' : 'center',
            textAlign: 'center',
            lineHeight: preview ? '1.1em' : '41px',
            padding: preview? '15px 27px 21px 27px' : '',
            boxSizing: 'border-box',
            position: 'absolute',
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            zIndex: 6
        },
    };

    function addDefaultPostImgSrc(ev) { ev.target.src = noPreviewImg };

    return (
        <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={close}
            style={customStyles}
        >  
            <ModalContent modalHeight={modalHeight} modalWidth={modalWidth}>
                {!preview? ( 
                    <MessageContainer>
                        <Message>
                            {message}
                        </Message>
                        <ContainerButtons>
                            {onConfirm && (
                                <CancelButton disabled={loading} onClick={close}>
                                    {cancelText || 'Cancelar'}
                                </CancelButton>
                            )}
                            <ConfirmButton width="134px" disabled={loading} onClick={confirmFunction}>
                                {confirmText || 'OK'}
                            </ConfirmButton>
                        </ContainerButtons>
                    </MessageContainer>
                ) : (
                    <PreviewContainer>
                        <PreviewButtonsContainer>
                            <a href={preview.src} target="_blank" rel="noreferrer">
                                <ConfirmButton height="31px" fontSize="14px">
                                    Open in new tab
                                </ConfirmButton>                                
                            </a>
                            <CloseIcon onClick={close} />
                        </PreviewButtonsContainer>
                        
                        {(previewState.available) && (                      
                            <Preview
                                title="preview"
                                type="text/html"
                                allow="fullscreen; accelerometer; loop; encrypted-media; gyroscope; picture-in-picture"
                                src={preview.src}
                                frameBorder="0"
                                loading={previewState.loading}
                                iframeVisibility={iframeVisibility}
                            />
                        )} 

                        {(!previewState.loading && !previewState.available) && (
                            <PreviewErrorContainer>
                                {preview.title? (
                                    <>
                                        <LinkTitle>{preview.title}</LinkTitle>
                                            <a href={preview.src} target="_blank" rel="noreferrer">
                                                <img 
                                                    src={preview.image} 
                                                    alt={preview.title} 
                                                    onError={(e) => addDefaultPostImgSrc(e)}
                                                />
                                            </a>
                                        <LinkDescription>{preview.description}</LinkDescription>
                                    </>
                                ) : (
                                    <LinkTitle height="100%">A preview para este site não está disponível.</LinkTitle>
                                )}
                            </PreviewErrorContainer>
                        )}

                        {((previewState.loading || iframeVisibility === 'none') && previewState.available) && (
                            <LoadingContainer>
                                <Loading />
                            </LoadingContainer>
                        )}
                    </PreviewContainer>
                )}
            </ModalContent>
        </ReactModal>
    )
}

const CloseIcon = styled(CloseSvg)`
    font-size: 30px;
    cursor: pointer;
`;

const LoadingContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    height: fit-content;
    width: 100px;
    display: flex;
    z-index: -1;
`;

const PreviewErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    
    img {
        width: 80vw;
        max-width: 100%;
        max-height: 50vh;
        object-fit: cover;
        background: #FFFFFF;
        border-radius: 10px;
    }
`;

const LinkTitle = styled.span`
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 20px;
    line-height: 1.1em;
    word-wrap: break-word;
    max-width: 100%;
`;

const LinkDescription = styled.span`
    margin-top: 20px;
`;

const ModalContent = styled.div`
    position: relative;
    width: ${({ modalWidth }) => modalWidth};
    height: ${({ modalHeight }) => modalHeight};
    max-height: 80vh;
    display: flex;
    justify-content: center;
    display: flex;
    overflow: hidden;

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

const Message = styled.span`
    font-size: 32px;
    font-weight: bold;
    font-family: Lato;

    @media (max-width: 700px) {
        font-size: 28px;
    }
`;

const Preview = styled.iframe`
    width: 100%;
    height: 100%;
    display: ${({ iframeVisibility }) => iframeVisibility};
    background-color: #FFFFFF;
    border-radius: 10px;
`;

const PreviewContainer = styled.div`
    width: 100%;
    height: calc(100% - 50px)
`;

const PreviewButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
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
    height: ${({height}) => height || 'inherit'};
    width: ${({ width }) => width || 'inherit'};
    font-size: ${({ fontSize }) => fontSize || 'inherit'};

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

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-bottom: 46px;
    margin-top: 18px;
    align-items: center;
    justify-content: center;


    @media (max-width: 700px) {
         width: 90%;
    }
`;

export default Modal;
import styled from "styled-components";
import ConfirmButton from './ConfirmButton'
import Loading from "../Loading";
import { useState, useEffect } from "react";
import { checkIframePermission } from "../../../services/iframeApi";
import noPreviewImg from '../../assets/imgs/no-image.png';

const PreviewContent = ({ CloseButton, closeModal, preview}) => {

    const [previewState, setPreviewState] = useState({ available: true, loading: true });
    const [iframeVisibility, setIframeVisibility] = useState('none');

    function addDefaultPostImgSrc(ev) { ev.target.src = noPreviewImg };

    useEffect(() => {
        if (preview) {
            setPreviewState({ available: true, loading: true });
            setTimeout(() => {
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

    const onClose = () => {
        setIframeVisibility('none');
        closeModal();
    }

    const width = () => {
        if (previewState.loading) {
            return '55vw';

        } else {
            if (previewState.available) {
                return '80vw';

            } else {
                return (preview.title || preview.image) ? 'fit-content' : '40vw';
            }
        }

    }

    const height = () => {
        if (previewState.loading) {
            return '50vh';

        } else {
            if (previewState.available) {
                return '70vh';
            } else {
                return preview.title ? 'fit-content' : '30vh'
            }
        }
    }

    return (
        <ModalContent height={height} width={width}>
            {!previewState.loading && (
                <PreviewButtonsContainer>
                    <a href={preview.src} target="_blank" rel="noreferrer">
                        <ConfirmButton height="31px" fontSize="14px">
                            Open in new tab
                        </ConfirmButton>
                    </a>
                    <CloseButton onClick={onClose} />
                </PreviewButtonsContainer>
            )}


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
                    {preview.title ? (
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
        </ModalContent>
    );
}

const ModalContent = styled.div`
    height: ${({height}) => height};
    width: 80vw;
    max-width: 966px;
    max-height: 904px;
    display: flex;
    flex-direction: column;
`;


const Preview = styled.iframe`
    width: 100%;
    height: 100%;
    display: ${({ iframeVisibility }) => iframeVisibility};
    background-color: #FFFFFF;
    border-radius: 10px;
`;

const PreviewButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
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
        object-fit: contain;
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

export default PreviewContent;
import styled from "styled-components";
import ConfirmButton from './ConfirmButton'

const AlertContent = ({ message, confirmText, closeModal, loading }) => {

    return (
        <ModalContent>
            <Message>
                {message}
            </Message>
            <ContainerButtons>
                <ConfirmButton width="134px" disabled={loading} onClick={closeModal}>
                    {confirmText || 'OK'}
                </ConfirmButton>
            </ContainerButtons>
        </ModalContent>
    );
}

const ModalContent = styled.div`
    max-width: 597px;
    max-height: 262px;
    width: 90vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;

    &> div {
        justify-content: space-between;
        width: 90%;
    }
`;

const Message = styled.span`
    font-size: 32px;
    font-weight: 700;
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

export default AlertContent;
import styled from "styled-components";
import { ImLoop } from "react-icons/im";

import { sharePost } from "../../../services/sharePostApi";

export default function ShareButton({post, user, openModal}) {

    const openSharePostDialog = () => {
        const onConfirm = () => {
            const request = sharePost(post.id, user.token);
            request.then(() => { openModal({ message: 'Post compartilhado com sucesso', }) });
            request.catch(() => { openModal({ message: 'Erro ao compartilhar o post', }) });
        }
        openModal({
            message: 'Tem certeza que deseja compartilhar essa publicação?',
            onConfirm,
            confirmText: 'Sim, compartilhar!',
            cancelText: 'Não, cancelar'
        });
    }

    return (
        <>
            <ShareIconButton onClick={openSharePostDialog} />
            <ShareCounter data-for="main">
                {post.repostCount === 1 ? `${post.repostCount} re-post` : `${post.repostCount} re-posts`}
            </ShareCounter>
        </>
    )
};

const ShareIconButton = styled(ImLoop)`
    font-size: 20px;
    cursor: pointer;
    color: #FFFFFF;
    @media (max-width: 700px) {
        font-size: 17px;
    }
`;

const ShareCounter = styled.div`
    min-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: default;
    font-size: 11px;
    line-height: 13px;
`;

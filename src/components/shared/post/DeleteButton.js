import styled from "styled-components";
import { ReactComponent as TrashSvg } from '../../../assets/icons/delete.svg';
import { deletePost } from "../../../services/editPostApi";

const DeleteButton = ({ setIsDeleted, openModal, post, user }) => {
    const openDeletePostDialog = () => {
        const onConfirm = () => {
            openModal({
                message: 'Deletando...',
                loading: true
            });

            deletePost(post.id, user.token)
                .then(() => {
                    setIsDeleted(true);
                    openModal({
                        message: 'Post deletado com sucesso',
                    });
                }).catch(() => {
                    setIsDeleted(true);
                    openModal({
                        message: 'Erro ao deletar o post',
                    });
                });
        }

        openModal({
            message: 'Tem certeza que deseja excluir essa publicação?',
            onConfirm,
            confirmText: 'Sim, excluir',
            cancelText: 'Não, voltar'
        });
    }

    return (
        <TrashIcon onClick={openDeletePostDialog} />
    );
}


const TrashIcon = styled(TrashSvg)`
    color: #FFFFFF;
    font-size: 14px;
    cursor: pointer;
`;

export default DeleteButton;
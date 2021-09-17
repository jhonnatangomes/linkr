import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import UserContext from "../../contexts/UserContext.js";
import ModalContext from "../../contexts/ModalContext.js";
import { useContext, useState } from "react";
import { likePost, dislikePost } from "../../services/likePostApi";
import { deletePost } from "../../services/editPostApi";
import ReactTooltip from 'react-tooltip';

export default function Post({ post }) {
    const { user } = useContext(UserContext);
    const { setModal }  = useContext(ModalContext);

    const [isLiked, setIsLiked] = useState(Boolean(post.likes.find(like => like.userId === user.id)));
    const [isDeleted, setIsDeleted] = useState(false);

    const likedBy = [...post.likes
        .filter(like => like.userId !== user.id)
        .map(like => like['user.username'])
    ];

    const openModal = (data) => {
        setModal({ modalIsOpen: true, ...data });
    }

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

    const toggleLike = () => {
        const fakeLike = () => {
            setIsLiked(true)
        }

        const fakeDislike = () => {
            setIsLiked(false)
        }

        if (isLiked) {
            fakeDislike();

            dislikePost(post.id, user.token).catch(() => {
                fakeLike();
                openModal({ message: 'Erro ao descurtir o post' });
            });
        } else {
            fakeLike();
            likePost(post.id, user.token).catch(() => {
                fakeDislike();
                openModal({ message: 'Erro ao curtir o post' });
            });
        }
    }

    //Rebuilding after the component is redred
    setTimeout(ReactTooltip.rebuild, 200);

    return (
        <>
            {!isDeleted && (
                <PostContainer>
                    <PostLeftBox 
                        isLiked={isLiked}
                        likedBy={likedBy}
                        toggleLike={toggleLike}
                        userId={user.id}
                        post={post} 
                    />
                    <PostInfo post={post} />
                    {(post.user.id === user.id) && (
                        <ContainerButtons>
                            <TrashIcon onClick={openDeletePostDialog} />
                        </ContainerButtons>
                    )}
                </PostContainer>
            )}
        </>
    );
}

const HeartIcon = ({ isLiked, toggleLike }) => {

    return (
        <div onClick={toggleLike}>
            {isLiked ? (
                <FillHeart />
            ) : (
                <OutlineHeart />
            )}
        </div>
    )
}

function PostLeftBox({ post, isLiked, likedBy, toggleLike, userId }) {
    return (
        <LeftBox>
            <UserImg>
                <img src={post.user.avatar} alt="Nome do usuário" />
            </UserImg>
            <HeartIcon
                likedBy={likedBy}
                isLiked={isLiked}
                toggleLike={toggleLike}
                userId={userId}
            />
            <LikeCounter 
                likedBy={likedBy}
                isLiked={isLiked}
            />
        </LeftBox>
    );
}

const LikeCounter = ({ likedBy, isLiked }) => {

    let toolTipMessage = '';
    const otherLikesNames = likedBy;
    const otherLikesCount = likedBy.length;

    if (isLiked) {
        toolTipMessage += 'Você';

        if (otherLikesCount >= 1) {
            toolTipMessage += (otherLikesCount === 1) ? ' e ' : ', ';
            toolTipMessage += otherLikesNames[0]
        }

        if (otherLikesCount >= 2) {
            toolTipMessage += (otherLikesCount === 2) ? ` e outra pessoa` : ` e outras ${otherLikesCount - 1} pessoas`;
        }

    } else {
        if (otherLikesCount >= 1) {
            toolTipMessage += otherLikesNames[0]

            if (otherLikesCount >= 2) {
                toolTipMessage += (otherLikesCount === 2) ? ' e ' : ', ';
                toolTipMessage += otherLikesNames[1]
            }

            if (otherLikesCount >= 3) {
                toolTipMessage += (otherLikesCount === 3) ? ` e outra pessoa` : ` e outras ${otherLikesCount - 2} pessoas`;
            }
        }
    }

    const likeCount = isLiked ? likedBy.length + 1 : likedBy.length;

    return (
        <div data-tip={toolTipMessage} data-for="main">
            {likeCount === 1
                ? likeCount + " like"
                : likeCount + " likes"}
        </div>
    )
}

function PostInfo({ post }) {
    function formatText(text) {
        const newText = [""];
        let isHashtag = false;
        for (let char of text) {
            if (char === "#") {
                newText.push("");
                isHashtag = true;
            }
            if (isHashtag && char === " ") {
                isHashtag = false;
                newText.push("");
            }
            newText[newText.length - 1] += char;
        }
        return newText;
    }

    return (
        <Info>
            <Username>{post.user.username}</Username>
            <Comment>
                {formatText(post.text).map((text, i) =>
                    text[0] === "#" ? <span key={i}>{text}</span> : text
                )}
            </Comment>
            <LinkInfo post={post} />
        </Info>
    );
}

function LinkInfo({ post }) {
    return (
        <a href={post.link}>
            <LinkBox>
                <LinkText>
                    <LinkTitle>{post.linkTitle}</LinkTitle>
                    <LinkDescription>{post.linkDescription}</LinkDescription>
                    <LinkRef>{post.link}</LinkRef>
                </LinkText>
                <LinkImg>
                    <img src={post.linkImage} alt="" />
                </LinkImg>
            </LinkBox>
        </a>
    );
}

const PostContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    border-radius: 16px;
    padding: 20px;
    background-color: #171717;
    overflow: hidden;
    margin-bottom: 15px;

    @media (max-width: 700px) {
        border-radius: 0;
    }
`;

const LeftBox = styled.div`
    width: 10%;
    height: 100%;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 11px;
    color: #ffffff;

    @media (max-width: 700px) {
        font-size: 9px;
    }
`;

const UserImg = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
    cursor: pointer;
    margin-bottom: 20px;

    & img {
        height: 100%;
    }

    @media (max-width: 700px) {
        width: 40px;
        height: 40px;
    }
`;

const Info = styled.div`
    width: 90%;
    height: 100%;
`;

const Username = styled.h2`
    color: #ffffff;
    font-size: 20px;
    margin-bottom: 10px;

    @media (max-width: 700px) {
        font-size: 17px;
    }
`;

const OutlineHeart = styled(AiOutlineHeart)`
    font-size: 20px;
    cursor: pointer;
    margin-bottom: 5px;

    @media (max-width: 700px) {
        font-size: 17px;
        margin-bottom: 12px;
    }
`;

const FillHeart = styled(AiFillHeart)`
    font-size: 20px;
    cursor: pointer;
    margin-bottom: 5px;
    color: #AC0000;
    @media (max-width: 700px) {
        font-size: 17px;
        margin-bottom: 12px;
    }
`;

const ContainerButtons = styled.div`
    position: absolute;
    top: 22px;
    right: 22px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 13px;
`;

const TrashIcon = styled(FaTrash)`
    color: #FFFFFF;
    font-size: 14px;
    cursor: pointer;
`;

const Comment = styled.p`
    color: #b7b7b7;
    font-size: 17px;
    margin-bottom: 10px;

    span {
        font-weight: 700;
        color: #ffffff;
    }

    @media (max-width: 700px) {
        font-size: 15px;
    }
`;

const LinkBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
    overflow: hidden;

    @media (max-width: 700px) {
        width: 93%;
    }
`;

const LinkText = styled.div`
    width: 65%;
    padding: 25px 20px;

    @media (max-width: 700px) {
        padding: 8px 11px;
    }
`;

const LinkTitle = styled.h3`
    color: #cecece;
    font-size: 16px;
    margin-bottom: 5px;

    @media (max-width: 700px) {
        font-size: 11px;
    }
`;

const LinkDescription = styled.p`
    font-size: 11px;
    color: #9b9595;
    margin-bottom: 15px;

    @media (max-width: 700px) {
        font-size: 9px;
    }
`;

const LinkRef = styled.span`
    color: #cecece;
    font-size: 11px;

    @media (max-width: 700px) {
        font-size: 9px;
    }
`;

const LinkImg = styled.div`
    width: 35%;
    height: 150px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
        height: 100%;
    }
`;

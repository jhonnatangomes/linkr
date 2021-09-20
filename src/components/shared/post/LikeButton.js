import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { likePost, dislikePost } from "../../../services/likePostApi";

const LikeButton = ({post, user, openModal}) => {
    const [isLiked, setIsLiked] = useState(Boolean(post.likes.find(like => like.userId === user.id)));
    
    const likedBy = [...post.likes
        .filter(like => like.userId !== user.id)
        .map(like => like['user.username'])
    ];

    const toggleLike = () => {
        if (isLiked) {
            setIsLiked(false);
            dislikePost(post.id, user.token).catch(() => {
                setIsLiked(true);
                openModal({ message: 'Erro ao descurtir o post' });
            });
        } else {
            setIsLiked(true);
            likePost(post.id, user.token).catch(() => {
                setIsLiked(false);
                openModal({ message: 'Erro ao curtir o post' });
            });
        }
    }

    let toolTipMessage = '';
    const otherLikesCount = likedBy.length;

    if (isLiked) {
        toolTipMessage += 'Você';

        if (otherLikesCount >= 1) {
            toolTipMessage += (otherLikesCount === 1) ? ' e ' : ', ';
            toolTipMessage += likedBy[0]
        }

        if (otherLikesCount >= 2) {
            toolTipMessage += (otherLikesCount === 2) ? ` e outra pessoa` : ` e outras ${otherLikesCount - 1} pessoas`;
        }
    } else {
        if (otherLikesCount >= 1) {
            toolTipMessage += likedBy[0]

            if (otherLikesCount >= 2) {
                toolTipMessage += (otherLikesCount === 2) ? ' e ' : ', ';
                toolTipMessage += likedBy[1]
            }

            if (otherLikesCount >= 3) {
                toolTipMessage += (otherLikesCount === 3) ? ` e outra pessoa` : ` e outras ${otherLikesCount - 2} pessoas`;
            }
        }
    }

    const likeCount = isLiked ? likedBy.length + 1 : likedBy.length;

    return (
        <>
            <div onClick={toggleLike}>
                {isLiked ? (
                    <FillHeart />
                ) : (
                    <OutlineHeart />
                )}
            </div>
            <LikeCounter data-tip={toolTipMessage} data-for="main">
            {likeCount === 1
                ? likeCount + " like"
                : likeCount + " likes"}
            </LikeCounter>
        </>
    )
}

const OutlineHeart = styled(AiOutlineHeart)`
    font-size: 20px;
    cursor: pointer;
    @media (max-width: 700px) {
        font-size: 17px;
        margin-bottom: 12px;
    }
`;

const FillHeart = styled(AiFillHeart)`
    font-size: 20px;
    cursor: pointer;
    color: #AC0000;
    @media (max-width: 700px) {
        font-size: 17px;
        margin-bottom: 12px;
    }
`;

const LikeCounter = styled.div`
    min-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: default;
`;

export default LikeButton;
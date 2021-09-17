import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

export default function Post({ post, isLiked, toggleLike, userId }) {
    return (
        <PostContainer>
            <PostLeftBox 
                isLiked={isLiked}
                toggleLike={toggleLike}
                userId={userId}
                post={post} 
            />
            <PostInfo post={post} />
        </PostContainer>
    );
}

const HeartIcon = ({ likes, isLiked, toggleLike, userId }) => {

    let toolTipMessage = '';
    const otherLikesNames = likes.filter(like => like.userId !== userId).map(like => like['user.username']);
    const otherLikesCount = otherLikesNames.length;

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

    return (
        <div data-tip={toolTipMessage} onClick={toggleLike}>
            {isLiked ? (
                <FillHeart />
            ) : (
                <OutlineHeart />
            )}
        </div>
    )
}

function PostLeftBox({ post, isLiked, toggleLike, userId }) {
    return (
        <LeftBox>
            <UserImg>
                <img src={post.user.avatar} alt="Nome do usuário" />
            </UserImg>
            <HeartIcon
                likes={post.likes}
                postId={post.id}
                isLiked={isLiked}
                toggleLike={toggleLike}
                userId={userId}
            />
            {post.likes.length === 1
                ? post.likes.length + " like"
                : post.likes.length + " likes"}
        </LeftBox>
    );
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

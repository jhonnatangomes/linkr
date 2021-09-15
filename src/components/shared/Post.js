import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";

export default function Post({ post }) {
    return (
        <PostContainer>
            <PostLeftBox post={post} />
            <PostInfo post={post} />
        </PostContainer>
    );
}

function PostLeftBox({ post }) {
    return (
        <LeftBox>
            <UserImg>
                <img src={post.user.avatar} alt="Nome do usuário" />
            </UserImg>
            <HeartIcon />
            {post.likes.length === 1
                ? post.likes.length + " like"
                : post.likes.length + " likes"}
        </LeftBox>
    );
}

function PostInfo({ post }) {
    return (
        <Info>
            <Username>{post.user.username}</Username>
            <Comment>{post.text}</Comment>
            <LinkInfo post={post} />
        </Info>
    );
}

function LinkInfo({ post }) {
    return (
        <LinkBox>
            <LinkText>
                <LinkTitle>{post.linkTitle}</LinkTitle>
                <LinkDescription>{post.linkDescription}</LinkDescription>
                <LinkRef href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    {post.link}
                </LinkRef>
            </LinkText>
            <LinkImg>
                <img src={post.linkImage} />
            </LinkImg>
        </LinkBox>
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

const HeartIcon = styled(AiOutlineHeart)`
    font-size: 20px;
    cursor: pointer;
    margin-bottom: 5px;

    @media (max-width: 700px) {
        font-size: 17px;
        margin-bottom: 12px;
    }
`;

const Comment = styled.p`
    color: #b7b7b7;
    font-size: 17px;
    margin-bottom: 10px;

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
`;

const LinkDescription = styled.p`
    font-size: 11px;
    color: #9b9595;
    margin-bottom: 15px;
`;

const LinkRef = styled.a`
    color: #cecece;
    font-size: 11px;
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

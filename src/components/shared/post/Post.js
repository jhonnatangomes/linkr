import styled from "styled-components";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext.js";
import ModalContext from "../../../contexts/ModalContext.js";
import { useContext, useState, useRef, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import LikeButton from "./LikeButton.js"
import DeleteButton from "./DeleteButton.js";
import EditButton from "./EditButton.js"
import { editPost } from "../../../services/editPostApi";

export default function Post({ post }) {
    const { user } = useContext(UserContext);
    const { setModal } = useContext(ModalContext);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState("");
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [postText, setPostText] = useState(post.text)
    const inputRef = useRef(null);

    const openModal = (data) => {
        setModal({ modalIsOpen: true, ...data });
    };

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);


    const editPostRequest = () => {
        editPost(editText, post.id, user.token)
            .then(() => {
                setIsEditLoading(false);
                setIsEditing(false);
                setPostText(editText);
            })
            .catch(() => {
                setIsEditLoading(false);
                openModal({
                    message: 'Erro ao editar o post',
                });
            });
    }

    const checkKey = (e) => {
        if (isEditLoading) {
            e.preventDefault();
            return;
        }
        const key = e.key;

        if (key === "Enter") {
            e.preventDefault();
            setIsEditLoading(true);
            editPostRequest();
        }

        if (key === "Escape") {
            e.preventDefault();
            setIsEditLoading(false);
            setIsEditing(false);
        }
    }

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

    //Rebuilding after the component is redred
    setTimeout(ReactTooltip.rebuild, 200);

    return (
        <>
            {!isDeleted && (
                <PostContainer>
                    <LeftBox>
                        <Link to={`/user/${post.user.id}`}>
                            <UserImg>
                                <img src={post.user.avatar} alt="Nome do usuário" />
                            </UserImg>
                        </Link>
                        <LikeButton
                            openModal={openModal}
                            post={post}
                            user={user}
                        />
                    </LeftBox>
                    
                    <Info>
                        <Username>
                            <Link to={`/user/${post.user.id}`}>{post.user.username}</Link>
                        </Username>
                        {isEditing ? (
                            <Comment>
                                <TextArea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    ref={inputRef}
                                    onKeyDown={checkKey}
                                    disabled={isEditLoading}
                                    maxLength={50000}
                                />
                            </Comment>
                        ) : (
                            <Comment>
                                {formatText(postText).map((text, i) =>
                                    text[0] === "#" ? (
                                        <Link to={`/hashtag/${text.slice(1)}`} key={i}>
                                            <span>{text}</span>
                                        </Link>
                                    ) : (
                                        text
                                    )
                                )}
                            </Comment>
                        )}
                        <a href={post.link} target="_blank" rel="noreferrer">
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
                    </Info>

                    {(post.user.id === user.id) && (
                        <ContainerButtons>
                            <EditButton
                                postText={postText}
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                                setEditText={setEditText}
                                editPostRequest={editPostRequest}
                            />
                            <DeleteButton
                                setIsDeleted={setIsDeleted}
                                openModal={openModal}
                                post={post}
                                user={user}
                            />
                        </ContainerButtons>
                    )}
                </PostContainer>
            )}
        </>
    );
}

const TextArea = styled.textarea`
    width: 100%;
    background: #FFFFFF;
    border-radius: 7px;
    border: none;
    outline: none;
    margin-bottom: 5px;
    padding-left: 13px;
    font-size: 15px;
    line-height: 18px;
    padding: 8px 13px;
    resize: none;
    min-height: 66px;
`;


const PostContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    border-radius: 16px;
    padding: 20px;
    background-color: #171717;
    overflow: hidden;
    margin-bottom: 15px;
    overflow-wrap: break-word;

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

    @media (max-width: 700px) {
        width: 75vw;
    }
`;

const Username = styled.h2`
    color: #ffffff;
    font-size: 20px;
    margin-bottom: 10px;
    width: fit-content;

    @media (max-width: 700px) {
        font-size: 17px;
    }
`;

const ContainerButtons = styled.div`
    position: absolute;
    top: 22px;
    right: 22px;
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    grid-column-gap: 13px;
`;

const Comment = styled.p`
    color: #b7b7b7;
    font-size: 17px;
    margin-bottom: 10px;
    -webkit-line-clamp: 10;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;

    & span {
        font-weight: 700;
        color: #ffffff;
    }

    @media (max-width: 700px) {
        font-size: 15px;
    }
`;

const LinkBox = styled.div`
    width: 503px;
    height: 100%;
    display: flex;
    align-items: center;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
    overflow: hidden;

    @media (max-width: 700px) {
        width: 100%;
    }
`;

const LinkText = styled.div`
    width: 65%;
    padding: 25px 20px;

    @media (max-width: 700px) {
        padding: 8px 11px;
    }
`;

const LinkTitle = styled.div`
    color: #cecece;
    font-size: 16px;
    margin-bottom: 5px;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: 700px) {
        font-size: 11px;
    }
`;

const LinkDescription = styled.div`
    font-size: 11px;
    color: #9b9595;
    margin-bottom: 15px;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: 700px) {
        font-size: 9px;
    }
`;

const LinkRef = styled.p`
    color: #cecece;
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

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
        width: 100%;
        object-fit: cover;
    }
`;
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext.js";
import ModalContext from "../../../contexts/ModalContext.js";
import { useContext, useState } from "react";
import ReactTooltip from "react-tooltip";
import LikeButton from "./LikeButton.js"
import DeleteButton from "./DeleteButton.js";
import EditButton from "./EditButton.js"
import EditInput from "./EditInput.js"
import { editPost } from "../../../services/editPostApi";
import getYouTubeID from "get-youtube-id";
import standardProfilePicture from '../assets/imgs/profile-standard.jpg';
import noPreviewImg from '../assets/imgs/no-image.png';

export default function Post({ post }) {
    const { user } = useContext(UserContext);
    const { setModal } = useContext(ModalContext);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState("");
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [postText, setPostText] = useState(post.text);
    const videoId = getYouTubeID(post.link)
    const isVideo = Boolean(videoId);

    const openModal = (data) => {
        setModal({ modalIsOpen: true, ...data });
    };

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

    function addDefaultProfileImgSrc(ev) { ev.target.src = standardProfilePicture };
    function addDefaultPostImgSrc(ev) { ev.target.src = noPreviewImg };

    return (
        <>
            {!isDeleted && (
                <PostContainer>
                    <LeftBox>
                            <UserImg>
                                <Link to={`/user/${post.user.id}`}>
                                    <img onError={(e) => addDefaultProfileImgSrc(e)} src={post.user.avatar} alt="Nome do usuário" />
                                </Link>
                            </UserImg>
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
                                <EditInput 
                                    editPostRequest={editPostRequest}
                                    isEditLoading={isEditLoading}
                                    setIsEditLoading={setIsEditLoading}
                                    setIsEditing={setIsEditing}
                                    editText={editText}
                                    setEditText={setEditText}
                                    postText={postText}
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

                        {isVideo? (
                            <>
                                <VideoBox>
                                    <iframe 
                                        id="ytplayer"
                                        title="ytplayer"
                                        type="text/html" 
                                        width="640" 
                                        height="283"
                                        allow="fullscreen; accelerometer; loop; encrypted-media; gyroscope; picture-in-picture"
                                        src={`https://www.youtube.com/embed/${videoId}?origin=http://linkr.com`}
                                        frameBorder="0"
                                    />
                                </VideoBox>
                                <VideoLink>
                                    <a href={post.link} target="_blank" rel="noreferrer">
                                        {post.link} 
                                    </a>
                                </VideoLink>
                            </>

                        ) : (
                            <a href={post.link} target="_blank" rel="noreferrer">
                                <LinkBox>
                                    <LinkText>
                                        <LinkTitle>{post.linkTitle}</LinkTitle>
                                        <LinkDescription>{post.linkDescription}</LinkDescription>
                                        <LinkRef>{post.link}</LinkRef>
                                    </LinkText>
                                    <LinkImg>
                                        <img onError={(e) => addDefaultPostImgSrc(e)} src={post.linkImage} alt="" />
                                    </LinkImg>
                                </LinkBox>
                            </a>
                        )}

                    </Info>

                    {(post.user.id === user.id) && (
                        <ContainerButtons>
                            <EditButton
                                postText={postText}
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                                editText={editText}
                                setEditText={setEditText}
                                editPostRequest={editPostRequest}
                                setIsEditLoading={setIsEditLoading}
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

    & img,a {
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
        width: 85%;
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

    @media (max-width: 700px) {
        right: 5%;
    }
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

const VideoBox = styled.div`
    width: 98%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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

const VideoLink = styled.p`
    color: #B7B7B7;
    font-size: 17px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 6px;
    width: 98%;

    @media (max-width: 700px) {
        font-size: 13px;
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

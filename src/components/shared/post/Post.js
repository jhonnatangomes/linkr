import styled from "styled-components";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext.js";
import ModalContext from "../../../contexts/ModalContext.js";
import { useContext, useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import LikeButton from "./LikeButton.js";
import ShareButton from "./ShareButton.js";
import DeleteButton from "./DeleteButton.js";
import EditButton from "./EditButton.js";
import EditInput from "./EditInput.js";
import { editPost } from "../../../services/editPostApi";
import getYouTubeID from "get-youtube-id";
import standardProfilePicture from '../../assets/imgs/profile-standard.jpg';
import noPreviewImg from '../../assets/imgs/no-image.png';
import { ImLoop } from "react-icons/im";
import { getComments } from '../../../services/commentPostApi';
import CommentButton from "./CommentButton";

export default function Post({ post }) {
    const { user } = useContext(UserContext);
    const { setModal } = useContext(ModalContext);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState("");
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [postText, setPostText] = useState(post.text);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [scrollComments, setScrollComments] = useState(0);

    const videoId = getYouTubeID(post.link);
    const isVideo = Boolean(videoId);

    let publishedContainerId = 'id';
    let list = document.getElementById(publishedContainerId);

    useEffect(() => { setScrollComments(scrollComments + 1) },[showComments]);
    useEffect(() => { if(list) list.scrollTop = list.scrollHeight },[scrollComments]);

    useEffect(() => {
        const request = getComments(post.id, user.token);
        request.then((res) => { setComments(res.data.comments)});
        request.catch(() => { console.log('erro') });
    }, [])

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
                    message: "Erro ao editar o post",
                });
            });
    };

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
            <StyledReactTooltip
                arrowColor="rgba(255, 255, 255, 0.9)"
                place="bottom"
                backgroundColor="rgba(255, 255, 255, 0.9)"
                textColor="#505050"
                id="name-tooltip"
            />
            {!isDeleted && (
                <>
                {post.repostedBy && <SharedBy>
                    <ShareIcon/>
                    <h1>Re-posted by <span>{post.repostedBy.id === user.id ? 'you' : post.repostedBy.username}</span></h1>
                </SharedBy>}

                <PostContainer>
                    <LeftBox>
                            <UserImg>
                                <Link to={post.user.id === user.id ? "/my-posts" : `/user/${post.user.id}`}>
                                    <img onError={(e) => addDefaultProfileImgSrc(e)} src={post.user.avatar} alt="Nome do usuário" />
                                </Link>
                            </UserImg>
                        <LikeButton openModal={openModal} post={post} user={user}/>
                        <CommentButton comments={comments} showComments={showComments} setShowComments={setShowComments}/>
                        <ShareButton openModal={openModal} post={post} user={user}/>
                    </LeftBox>

                    <Info>
                        <Username $isUser={post.user.id === user.id} data-tip={post.user.username} data-for="name-tooltip">
                            <Link to={post.user.id === user.id ? "/my-posts" : `/user/${post.user.id}`}>
                                {post.user.username}
                            </Link>
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
                                    ) : (text)
                                )}
                            </Comment>
                        )}

                        {isVideo ? (
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
                                    <a
                                        href={post.link}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {post.link}
                                    </a>
                                </VideoLink>
                            </>
                        ) : (
                            <a
                                href={post.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <LinkBox>
                                    <LinkText>
                                        <LinkTitle>{post.linkTitle}</LinkTitle>
                                        <LinkDescription>
                                            {post.linkDescription}
                                        </LinkDescription>
                                        <LinkRef>{post.link}</LinkRef>
                                    </LinkText>
                                    <LinkImg>
                                        <img onError={(e) => addDefaultPostImgSrc(e)} src={post.linkImage} alt="" />
                                    </LinkImg>
                                </LinkBox>
                            </a>
                        )}
                    </Info>

                    {post.user.id === user.id && (
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

                {showComments && <CommentsBox>
                    <PublishedComments id={publishedContainerId}>
                        {comments && comments.map(comment => (<CommentBox>
                            <img onError={(e) => addDefaultProfileImgSrc(e)} src={comment.user.avatar} alt="Nome do usuário" />
                            <div>
                                <h1>{comment.user.username}</h1>
                                <h2>{comment.text}</h2>
                            </div>
                        </CommentBox>))}
                    </PublishedComments>
                    <NewCommentBox>
                        <img onError={(e) => addDefaultProfileImgSrc(e)} src={user.avatar} alt="Nome do usuário" />
                        <textarea rows="1" placeholder={'escreva um comentário...'}></textarea>
                    </NewCommentBox>
                </CommentsBox>}
                </>
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
    margin-top: 15px;
    overflow-wrap: break-word;

    @media (max-width: 700px) {
        border-radius: 0;
        padding: 18px;
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

    & img, a {
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
    width: ${({ $isUser }) => ($isUser ? "450px" : "503px")};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 700px) {
        font-size: 17px;
        width: ${({ $isUser }) => ($isUser ? "84%" : "100%")};
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
    line-height: 20px;
    margin-bottom: 10px;
    -webkit-line-clamp: 10;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 503px;

    & span {
        font-weight: 700;
        color: #ffffff;
    }

    @media (max-width: 700px) {
        font-size: 15px;
        width: 100%;
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
    color: #b7b7b7;
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

const StyledReactTooltip = styled(ReactTooltip)`
    font-weight: bold;
    font-family: "Lato", sans-serif;
`;

const SharedBy = styled.div`
    height: 65px;
    width: 100%;
    background: #1E1E1E;
    border-radius: 16px;
    margin: 0 0 -32px 0;
    display: flex;
    align-items: center;
    padding: 0 0 32px 15px;
    h1 {
        font-family: Lato;
        font-size: 11px;
        line-height: 13px;
        color: #FFFFFF;
        span {
            font-weight: 700;
        }
    }
`;

const ShareIcon = styled(ImLoop)`
    color: #FFFFFF;
    margin: 0 12px 0 0;
    font-size: 16px;
`;

const CommentsBox = styled.div`
    max-height: 300px;
    width: 100%;
    padding: 32px 25px 25px 25px;
    margin: -32px 0 0 0;
    background: #1E1E1E;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: scroll;
    scrollbar-width: none;
    h1 {
        color: #FFFFFF;
    }
`;

const PublishedComments = styled.div`
    max-height: 216px;
    width: 100%;
    overflow: scroll;
    scrollbar-width: none;
`;

const NewCommentBox = styled.div`
    min-height: 40px;
    width: 100%;
    display: flex;
    margin: 20px 0 0 0;
    img {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        margin: 0 15px 0 0;
    }
    textarea {
        height: auto;
        width: 100%;
        background: #252525;
        border-radius: 8px;
        border: none;
        padding: 11px 15px 0 15px;
        font-family: Lato;
        font-size: 14px;
        line-height: 17px;
        color: #575757;
        resize: none;
        &:focus {
            outline: none;
        }
    }
    textarea::placeholder {
        font-style: italic;
    }
`;

const CommentBox = styled.div`
    width: 100%;
    display: flex;
    padding: 16px 0px 16px 0px;
    border-bottom: 1px solid #353535;
    img {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        margin: 0 18px 0 0;
    }
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-wrap: break-word;
        color: #575757;
        font-family: Lato;
        font-size: 14px;
        line-height: 17px;
        h1 {
            font-family: Lato;
            font-weight: bold;
            font-size: 14px;
            line-height: 17px;
            color: #F3F3F3;
            margin: 0 0 3px 0;
        }
        h2 {
            font-family: Lato;
            font-size: 14px;
            line-height: 17px;
            color: #ACACAC;
        }
    }
`;
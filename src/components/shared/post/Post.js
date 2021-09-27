import { PostContainer, LeftBox, UserImg, Info, Username, ContainerButtons, Comment, LinkBox, VideoBox, LinkText, LinkTitle, LinkDescription, LinkRef, VideoLink, LinkImg, StyledReactTooltip, SharedBy, ShareIcon, CommentsBox, PublishedComments, NewCommentBox, CommentBox, StyledArrow, NewCommentInput } from "../../../styles/postStyles";
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
import { getComments, postComment } from '../../../services/commentPostApi';
import CommentButton from "./CommentButton";
import FollowingContext from "../../../contexts/FollowingContext";
import { ReactComponent as LocationFilledSvg } from './../../../assets/icons/location-filled.svg';

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
    const { followingUsers } = useContext(FollowingContext);
    const [comment, setComment] = useState("");
    const [updateComments, setUpdateComments] = useState(0);

    const videoId = getYouTubeID(post.link);
    const isVideo = Boolean(videoId);

    let publishedContainerId = 'id';
    let list = document.getElementById(publishedContainerId);

    useEffect(() => { setScrollComments(scrollComments + 1) },[showComments]);
    useEffect(() => { if(list) list.scrollTop = list.scrollHeight },[scrollComments]);

    useEffect(() => {
        const request = getComments(post.id, user.token);
        request.then((res) => { setComments(res.data.comments)});
        request.catch(() => { alert('Algo deu errado, por favor tente novamente.') });
    }, [updateComments])

    const openModal = (data) => {
        setModal({ modalIsOpen: true, ...data });
    };

    const checkKey = (e) => {
        const key = e.key;
        if (key === "Enter") {
            e.preventDefault();
            const request = postComment(post.id, user.token, comment);
            request.then((res) => { setComment(""); setUpdateComments(updateComments + 1) })
            request.catch(() => { alert('Algo deu errado, por favor tente novamente.') });
        }
    }
    const openMap = () => {
        openModal({geolocation: post.geolocation, username: post.user.username})
    }

    const openPreview = (e) => {
        e.preventDefault();
        openModal({ 
            preview: {
                src: e.currentTarget.href,
                description: post.linkDescription,
                image: post.linkImage,
                title: post.linkTitle
            }
        })
    }

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
                        <PostHeader isUser={post.user.id === user.id}>
                            <UsernameContainer 
                                isUser={post.user.id === user.id}
                                geolocation={post.geolocation}
                            >
                                <h2>
                                    <Link
                                        to={post.user.id === user.id ? "/my-posts" : `/user/${post.user.id}`}
                                        data-tip={post.user.username}
                                        data-for="name-tooltip"
                                    >
                                        {post.user.username}
                                    </Link>
                                </h2>

                                {post.geolocation && (
                                    <LocationIcon onClick={openMap} />
                                )}
                            </UsernameContainer>
                                
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
                        </PostHeader>

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
                            <a href={post.link} onClick={openPreview}>
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
                </PostContainer>

                {showComments && <CommentsBox>
                    <PublishedComments id={publishedContainerId}>
                        {comments && comments.map(comment => (<CommentBox>
                            <img onError={(e) => addDefaultProfileImgSrc(e)} src={comment.user.avatar} alt="Nome do usuário" />
                            <div>
                                <h1>
                                    {comment.user.username}
                                    <span>{comment.user.id === post.user.id ? " • post's author" : ""}</span>
                                    <span>{followingUsers.includes(comment.user.id) ? " • following" : ""}</span>
                                </h1>
                                <h2>{comment.text}</h2>
                            </div>
                        </CommentBox>))}
                    </PublishedComments>
                    <NewCommentBox>
                        <img onError={(e) => addDefaultProfileImgSrc(e)} src={user.avatar} alt="Nome do usuário" />
                        <NewCommentInput>
                            <textarea rows="1" placeholder={'escreva um comentário...'} onKeyDown={checkKey} onChange={(e)=>setComment(e.target.value)} value={comment}></textarea>
                            <StyledArrow/>
                        </NewCommentInput>
                    </NewCommentBox>
                </CommentsBox>}
                </>
            )}
        </>
    );
}

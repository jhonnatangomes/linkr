import styled from "styled-components";
import { ImLoop } from "react-icons/im";
import { FiSend } from "react-icons/fi";
import ReactTooltip from "react-tooltip";
import { ReactComponent as LocationFilledSvg } from '../assets/icons/location-filled.svg';

const PostContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    border-radius: 16px;
    padding: 20px;
    background-color: #171717;
    overflow: hidden;
    margin: 16px 0 16px 0;
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

const PostHeader = styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 98%;
`;

const UsernameContainer = styled.div`
    display: flex;
    align-items: center;
    max-width: ${({ isUser }) => (isUser ? "90%" : "99%")};
    width: fit-content;
    color: #ffffff;

    & h2 {
        font-size: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: ${({ isUser, geolocation }) => {

            if (geolocation) {
                return isUser ? "93%" : "95%"
            }

            return isUser ? "100%" : "100%"
        }};
    }

    @media (max-width: 700px) {
       max-width: ${({ isUser, geolocation }) => {

            if (geolocation) {
                return isUser ? "90%" : "100%"
            }

            return isUser ? "90%" : "100%"
        }};
        & h2 {
            font-size: 17px;
            max-width: ${({ isUser, geolocation }) => {

                if (geolocation) {
                    return isUser ? "89%" : "94%"
                }

                return isUser ? "97%" : "100%"
            }};
        }
    }
`;

const ContainerButtons = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    grid-column-gap: 13px;
`;

const LocationIcon = styled(LocationFilledSvg)`
    margin-left: 10px;
    cursor: pointer;
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
    width: 503px;
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
    height: 49px;
    width: 100%;
    background: #1E1E1E;
    border-radius: 16px 16px 0 0;
    margin: 15px 0 -32px 0;
    display: flex;
    align-items: center;
    padding: 0 0 15px 15px;
    z-index;
    h1 {
        font-family: Lato;
        font-size: 11px;
        line-height: 13px;
        color: #FFFFFF;
        span {
            font-weight: 700;
        }
    }
    @media (max-width: 700px) {
        border-radius: 0;
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
    margin: -48px 0 0 0;
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
    @media (max-width: 700px) {
        border-radius: 0;
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
        height: 98%;
        width: 95%;
        background: #252525;
        border-radius: 8px;
        border: none;
        padding: 11px 15px 0 15px;
        font-family: Lato;
        font-size: 14px;
        line-height: 17px;
        color: #575757;
        resize: none;
        scrollbar-width: none;
        &:focus {
            outline: none;
        }
    }
    textarea::placeholder {
        font-style: italic;
    }
`;

const NewCommentInput = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #252525;
    border-radius: 8px;
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
        span {
            font-weight: normal;
            color: #565656;
        }
    }
`;

const StyledArrow = styled(FiSend)`
    color: #F3F3F3;
    font-size: 20px;
    margin: 0 17px 0 0;
    cursor: pointer;
`;

export { PostContainer, LeftBox, UserImg, Info, PostHeader, UsernameContainer, ContainerButtons, LocationIcon, Comment, LinkBox, VideoBox, LinkText, LinkTitle, LinkDescription, LinkRef, VideoLink, LinkImg, StyledReactTooltip, SharedBy, ShareIcon, CommentsBox, PublishedComments, NewCommentBox, NewCommentInput, CommentBox, StyledArrow };
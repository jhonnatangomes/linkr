import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import ModalContext from "../../contexts/ModalContext";
import { useContext, useState } from "react";
import { createPost } from "../../services/api";
import { Link } from "react-router-dom";
import standardProfilePicture from '../assets/imgs/profile-standard.jpg';
import { ReactComponent as LocationOutlineSvg } from './../../assets/icons/location-outline.svg';

export default function Publish({ posts, setPosts }) {
    const { user } = useContext(UserContext);
    const { setModal } = useContext(ModalContext);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const [link, setLink] = useState("");
    const [locationState, setLocationState] = useState({active: false})

    function openModal(data) {
        setModal({ modalIsOpen: true, ...data });
    }

    const toggleLocation = () => {

        if (locationState.active) {
            setLocationState({ ...locationState, active: false });
            return;
        }

        if (navigator.geolocation) {
            const savePosition = (geolocation) => {
                const { latitude, longitude } = geolocation.coords;
                setLocationState({
                    active: !locationState.active,
                    latitude,
                    longitude
                });
            }

            function positionError() {
                openModal({ message: 'Ative a localização do navegador para usar o recurso' });
            }

            navigator.geolocation.getCurrentPosition(savePosition, positionError);

        } else {
            openModal({ message: 'Seu navegador não suporta geolocalização' });
            setLocationState({ ...locationState, active: false });
        }
    }

    function publish(e) {
        e.preventDefault();
        setLoading(true);
        const formatArray = formatText(text).map((sentence) =>
            sentence[0] === "#" ? sentence.toLowerCase() : sentence
        );
        let formattedText = formatArray.join("");

        let body;

        if (locationState.active) {
            body = {
                text: formattedText,
                link,
                geolocation: {
                    latitude: `${locationState.latitude}`,
                    longitude: `${locationState.longitude}`
                }
            };
        } else {
             body = {
                text: formattedText,
                link
            };
        }

        const request = createPost(body, user.token);

        request.then((res) => {
            setText("");
            setLink("");
            setLoading(false);
            setPosts([{...res.data.post, geolocation: res.data.geolocation}, ...posts]);
        });
        request.catch(() => {
            setLoading(false);
            openModal({message: "Houve um erro ao publicar seu link"});
        });
    }

    const checkEnterKey = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (link){
                publish(e);
            }
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

    return (
        <PublishStyle>
            <WhatToLikeToday>
                O que você tem pra favoritar hoje?
            </WhatToLikeToday>
            <Form onSubmit={(e) => publish(e)}>
                <input
                    type="url"
                    placeholder="http://..."
                    required
                    disabled={loading}
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <textarea
                    type="text"
                    placeholder="Muito irado esse link falando de #javascript"
                    disabled={loading}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={checkEnterKey}
                    maxLength={50000}
                />
                <LocationContainer active={locationState.active} onClick={toggleLocation}>
                    <LocationOutlineSvg />
                    <span>
                        {locationState.active ? 'Localização ativada' : 'Localização desativada'}
                    </span>
                </LocationContainer>
                <button type="submit" disabled={loading}>
                    {loading ? "Publicando..." : "Publicar"}
                </button>
            </Form>
            <Link to="/my-posts">
                <UserImg>
                    {user ? <img src={user.avatar} alt="" /> : ""}
                </UserImg>
            </Link>
        </PublishStyle>
    );
}

const LocationContainer = styled.div`
    display: flex;
    align-items: center;
    color: ${({ active }) => active ? '#238700' : '#949494' };
    cursor: pointer;
    width: fit-content;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

    svg path {
        fill: ${({ active }) => active ? '#238700' : '#949494' };
    }

    span {
        font-weight: 300;
        font-size: 13px;
        margin-left: 5px;
    }
`;

const PublishStyle = styled.div`
    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 611px;
    padding: 21px 22px 16px 86px;
    border-radius: 16px;
    margin-bottom: 29px;
    position: relative;

    @media (max-width: 700px) {
        width: 100%;
        padding: 10px 15px 12px 15px;
        text-align: center;
        margin-bottom: 16px;
        border-radius: 0;
    }
`;

const WhatToLikeToday = styled.p`
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-bottom: 12px;

    @media (max-width: 700px) {
        font-size: 17px;
        line-height: 20px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;

    input,
    textarea {
        background: #efefef;
        border-radius: 5px;
        border: none;
        outline: none;
        margin-bottom: 5px;
        padding-left: 13px;
        font-size: 15px;
        line-height: 18px;
        font-family: "Lato", sans-serif;
    }

    textarea {
        padding: 8px 13px;
        resize: none;
        height: 66px;
    }

    input::placeholder,
    textarea::placeholder {
        font-family: "Lato", sans-serif;
        color: #949494;
        font-weight: 300;
    }

    input {
        min-height: 30px;
    }

    button {
        background: #1877f2;
        border-radius: 5px;
        width: 112px;
        height: 31px;
        border: none;
        outline: none;
        align-self: flex-end;
        color: white;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        cursor: pointer;
    }

    @media (max-width: 700px) {
        input,
        textarea {
            padding-left: 11px;
            font-size: 13px;
            line-height: 16px;
        }

        textarea {
            height: 47px;
            overflow: visible;
        }

        button {
            height: 22px;
            line-height: 16px;
            font-size: 13px;
        }
    }
`;

const UserImg = styled.div`
    position: absolute;
    left: 18px;
    top: 16px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: url(${standardProfilePicture});
    background-size: contain;

    & img {
        height: 100%;
        cursor: pointer;
    }

    @media (max-width: 700px) {
        display: none;
    }
`;

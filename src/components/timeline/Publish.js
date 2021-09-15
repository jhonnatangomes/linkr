import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { useContext, useState } from "react";
import { createPost } from "../../services/api";

export default function Publish({ posts, setPosts }) {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const [link, setLink] = useState("");

    function publish(e) {
        e.preventDefault();
        setLoading(true);
        const body = {
            text,
            link,
        };

        const request = createPost(body, user.token);
        request.then((res) => {
            setText("");
            setLink("");
            setLoading(false);
            setPosts([...posts, res.data.post]);
        });
        request.catch(() => {
            setLoading(false);
            alert("Houve um erro ao publicar seu link");
        });
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
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Publicando..." : "Publicar"}
                </button>
            </Form>
            <img src={user.avatar} alt="avatar do usuário" />
        </PublishStyle>
    );
}

const PublishStyle = styled.div`
    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 611px;
    padding: 21px 22px 16px 86px;
    border-radius: 16px;
    margin-bottom: 29px;
    position: relative;

    img {
        position: absolute;
        left: 18px;
        top: 16px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    @media (max-width: 700px) {
        width: 100%;
        padding: 10px 15px 12px 15px;
        text-align: center;
        margin-bottom: 16px;
        border-radius: 0;

        div {
            display: none;
        }
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

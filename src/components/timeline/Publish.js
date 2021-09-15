import styled from "styled-components";

export default function Publish() {
    return (
        <PublishStyle>
            <WhatToLikeToday>
                O que você tem pra favoritar hoje?
            </WhatToLikeToday>
            <Form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="http://..." />
                <textarea
                    type="text"
                    placeholder="Muito irado esse link falando de #javascript"
                />
                <button>Publicar</button>
            </Form>
            <div></div>
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

    div {
        position: absolute;
        left: 18px;
        top: 16px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: red;
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
        padding: 8px 0;
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

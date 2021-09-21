import styled from "styled-components";
import { useState } from 'react';
import { changeFollowOnUser } from '../../services/changeFollowOnUser.js';

export default function Follow ({ userId, token }) {
    const [disabled, setDisabled] = useState(false);
    const [buttonText, setButtonText] = useState("Follow");

    function changeFollow () {
        setDisabled(true);
        const requestType = buttonText === "Follow" ? 'follow':'unfollow';

        changeFollowOnUser(userId, requestType, token)
            .then(() => {
                setButtonText(buttonText === "Follow" ? 'Unfollow':'Follow');
                setDisabled(false);
            })
            .catch(() => {
                alert("Deu ruim!");
                setDisabled(false);
            });
    }

    return (
        <FollowButton onClick={changeFollow} disabled={disabled}>{buttonText}</FollowButton>
    );
}

const FollowButton = styled.button`
    width: 100px;
    height: 30px;
    background-color: #1877f2;
    border: none;
    border-radius: 5px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    cursor: ${({ disabled }) => disabled ? 'not-allowed':'pointer'};
    filter: brightness(${({ disabled }) => disabled ? 50:100}%);
`;
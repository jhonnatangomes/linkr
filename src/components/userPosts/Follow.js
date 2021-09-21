import styled from "styled-components";
import { useState, useContext } from 'react';
import { changeFollowOnUser } from '../../services/changeFollowOnUser.js';

import FollowingContext from '../../contexts/FollowingContext.js';

export default function Follow ({ userId, token }) {
    const { followingUsers, setFollowingUsers } = useContext(FollowingContext);
    const [disabled, setDisabled] = useState(false);

    function changeFollow () {
        setDisabled(true);
        const requestType = followingUsers.includes(Number(userId)) ? 'unfollow':'follow';

        changeFollowOnUser(userId, requestType, token)
            .then(() => {
                if (requestType === 'unfollow') {
                    setFollowingUsers(followingUsers.filter((followingUser) => followingUser !== Number(userId)));
                } else {
                    setFollowingUsers([...followingUsers, Number(userId)]);
                }
                setDisabled(false);
            })
            .catch(() => {
                alert("Ocorreu algum erro!");
                setDisabled(false);
            });
    }

    return (
        <>
            {followingUsers === null ? "":(<FollowButton onClick={changeFollow} followed={followingUsers.includes(Number(userId))} disabled={disabled}>
                {followingUsers.includes(Number(userId)) ? "Unfollow":"Follow"}
            </FollowButton>)}
        </>
    );
}

const FollowButton = styled.button`
    width: 100px;
    height: 30px;
    background-color: ${({ followed }) => followed ? '#ffffff':'#1877f2'};
    border: none;
    border-radius: 5px;
    color: ${({ followed }) => followed ? '#1877f2':'#ffffff'};
    font-size: 14px;
    font-weight: 700;
    cursor: ${({ disabled }) => disabled ? 'not-allowed':'pointer'};
    filter: brightness(${({ disabled }) => disabled ? 50:100}%);
`;
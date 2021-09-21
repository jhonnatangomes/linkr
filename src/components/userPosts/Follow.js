import styled from "styled-components";
import { useState, useContext } from 'react';
import { changeFollowOnUser } from '../../services/changeFollowOnUser.js';

import FollowingContext from '../../contexts/FollowingContext.js';

export default function Follow ({ userId, token }) {
    const { followingUsers, setFollowingUsers } = useContext(FollowingContext);
    const [disabled, setDisabled] = useState(false);
    const [isFollowing, setIsFollowing] = useState(followingUsers.includes(Number(userId)));

    function changeFollow () {
        setDisabled(true);
        const requestType = isFollowing ? 'unfollow':'follow';

        changeFollowOnUser(userId, requestType, token)
            .then(() => {
                if (requestType === 'unfollow') {
                    setFollowingUsers(followingUsers.filter((followingUser) => followingUser !== userId));
                    setIsFollowing(false);
                } else {
                    setFollowingUsers([...followingUsers, userId]);
                    setIsFollowing(true);
                }
                setDisabled(false);
            })
            .catch(() => {
                alert("Ocorreu algum erro!");
                setDisabled(false);
            });
    }

    return (
        <FollowButton onClick={changeFollow} followed={isFollowing} disabled={disabled}>
            {isFollowing ? "Unfollow":"Follow"}
            </FollowButton>
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
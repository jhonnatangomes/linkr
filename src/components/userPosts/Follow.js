import styled from "styled-components";
import changeFollowOnUser from '../../services/changeFollowOnUser.js';

export default function Follow () {
    return (
        <FollowButton>Follow</FollowButton>
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
    cursor: pointer;
`;
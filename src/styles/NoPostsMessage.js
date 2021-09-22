import styled from "styled-components";

const NoPostsMessage = styled.p`
    font-size: 30px;
    color: #b7b7b7;
    text-align: center;

    @media (max-width: 700px) {
        margin-left: 20px;
        font-size: 20px;
    }
`;

export default NoPostsMessage;
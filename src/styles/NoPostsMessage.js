import styled from "styled-components";

const NoPostsMessage = styled.p`
    font-size: 30px;
    color: #ffffff;
    text-align: center;
    margin-bottom: 20px;

    @media (max-width: 700px) {
        //margin-left: 20px;
        font-size: 20px;
    }
`;

export default NoPostsMessage;
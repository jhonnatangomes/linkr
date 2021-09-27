import styled from "styled-components";

const CancelButton = styled.button`
    background: #FFFFFF;
    color: #1877f2;

    &:not([disabled]):hover {
        color: #18a9f2;
    }
`;

export default CancelButton;
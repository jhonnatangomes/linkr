import styled from "styled-components";

const ConfirmButton = styled.button`
    background: #1877f2;
    color: #ffffff;
    height: ${({ height }) => height || 'inherit'};
    width: ${({ width }) => width || 'inherit'};
    font-size: ${({ fontSize }) => fontSize || 'inherit'};

    &:not([disabled]):hover {
        background-color: #18a9f2;
    }
`;

export default ConfirmButton;
import ReactTooltip from 'react-tooltip';
import styled from "styled-components";

const Tooltip = () => (
    <StyledReactTooltip
        backgroundColor="rgba(255, 255, 255, 0.9)"
        textColor='#505050'
        fontWeight="bold"
        fontSize="11px"
        fontFamily="Lato"
        place="bottom"
        id="main"
        effect="solid"
    />
);

const StyledReactTooltip = styled(ReactTooltip)`
    font-weight: bold;
    word-wrap: break-word;
    width: auto;
    max-width: 60%;
    line-height: 1.1em;
`;

export default Tooltip;
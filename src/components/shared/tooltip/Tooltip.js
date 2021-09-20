import ReactTooltip from 'react-tooltip';
import styled from "styled-components";

const Tooltip = ({effect, id}) => (
    <StyledReactTooltip
        backgroundColor="rgba(255, 255, 255, 0.9)"
        textColor='#505050'
        fontWeight="bold"
        fontSize="11px"
        fontFamily="Lato"
        place="bottom"
        id={id || ''}
        effect={effect || 'float'}
    />
);

const StyledReactTooltip = styled(ReactTooltip)`
    font-weight: bold;
`;

export default Tooltip;
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

const Tooltip = () => {
    return (
        <StyledReactTooltip
            backgroundColor="rgba(255, 255, 255, 0.9)"
            place="bottom"
            effect= "solid"
        />
    );
};

const StyledReactTooltip = styled(ReactTooltip)`
    color: #505050 !important;
    font-weight: bold !important;
    font-size: 11px !important;
    font-family: Lato !important;
`;

export default Tooltip;

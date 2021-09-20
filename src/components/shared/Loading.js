import styled from "styled-components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loading () {
    return (
        <Container>
            <StyledLoader
                type="Oval"
                color="#ffffff"
                height={100}
                width={100}
            />
        </Container>
    );
}

const Container = styled.div`
    width: 611px;
    display: flex;
`

const StyledLoader = styled(Loader)`
    margin: 0 auto;
`;
import styled from 'styled-components';

export default function MyLikes() {
    return(
        <Box>expect to see your liked posts here soon!</Box>
    )
}

const Box = styled.div`
    height: calc(100vh - 72px);
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 72px 0 0 0;
    color: #FFFFFF;
    font-family: "Oswald", sans-serif;
    font-size: 20px;
`;
import styled from 'styled-components';

export default function Timeline() {
    return(
        <TimelineBox>
            <HeaderBox>
                <Logo></Logo>
                <Menu></Menu>
            </HeaderBox>
            <h1>TIMELINE ! ! !</h1>
        </TimelineBox>
    )
}

const TimelineBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightblue;
    width: 100vw;
    height: calc(100vh - 72px);
    margin: 72px 0 0 0;
`;

const HeaderBox = styled.div`
    width: 100vw;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 17px 0 28px;
    background: #151515;
    position: fixed;
    top: 0;
    left: 0;
`;

const Logo = styled.div`

`;

const Menu = styled.div`

`;
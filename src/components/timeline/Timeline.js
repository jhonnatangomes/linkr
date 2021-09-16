import styled from 'styled-components';
import Header from '../header/Header';

export default function Timeline() {
    return(
        <TimelineBox>
            <Header/>
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
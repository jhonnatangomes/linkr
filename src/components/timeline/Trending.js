import styled from "styled-components";

export default function Trending() {
    return (
        <TrendingStyle>
            <p>trending</p>
            <DivisionLine />
            <HashtagContainer>
                <p>#javascript</p>
                <p>#javascript</p>
                <p>#javascript</p>
                <p>#javascript</p>
                <p>#javascript</p>
                <p>#javascript</p>
            </HashtagContainer>
        </TrendingStyle>
    );
}

const TrendingStyle = styled.div`
    width: 301px;
    height: 500px;
    background: #171717;
    border-radius: 16px;

    & > p {
        padding: 9px 16px 12px 16px;
        font-family: "Oswald", sans-serif;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: white;
    }
`;

const DivisionLine = styled.div`
    width: 100%;
    height: 0;
    border-top: 1px solid #484848;
`;

const HashtagContainer = styled.div`
    padding: 22px 16px 30px 16px;

    & p {
        font-weight: 700;
        font-size: 19px;
        line-height: 23px;
        letter-spacing: 5%;
        color: white;
        margin-bottom: 10px;
    }
`;

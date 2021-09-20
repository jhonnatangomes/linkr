import styled from "styled-components";
import { getTrending } from "../../services/trendingApi";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

export default function Trending() {
  const { user } = useContext(UserContext);
  const [trending, setTrending] = useState([]);
  ReactTooltip.rebuild();

  useEffect(() => {
    const request = getTrending(user.token);
    request.then((res) => {
      setTrending(res.data.hashtags);
    });
  }, []);

  return (
    <TrendingStyle>
      <p>trending</p>
      <DivisionLine />
      <HashtagContainer>
        {trending.map((topic) => (
          <Link to={`/hashtag/${topic.name}`} key={topic.id}>
            <p data-tip={"#" + topic.name}>#{topic.name}</p>
          </Link>
        ))}
      </HashtagContainer>
      <StyledReactTooltip
        arrowColor="rgba(255, 255, 255, 0.9)"
        place="bottom"
        backgroundColor="rgba(255, 255, 255, 0.9)"
        textColor="#505050"
        effect="float"
        
      />
    </TrendingStyle>
  );
}

const TrendingStyle = styled.div`
  width: 301px;
  height: 100%;
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

  @media (max-width:937px) {
      display: none;
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
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & p:hover {
    text-decoration: underline;
  }
`;

const StyledReactTooltip = styled(ReactTooltip)`
    font-weight: bold;
    font-family: 'Lato', sans-serif;
`;

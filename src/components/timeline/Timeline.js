import NavBar from "../navBar/NavBar";
import styled from "styled-components";
import Publish from "./Publish";
import PostsList from "./PostsList";
import Trending from "../shared/Trending";
import MediaQuery from "react-responsive";
import { useState } from "react";

export default function Timeline() {
    const [posts, setPosts] = useState([]);

    return (
        <>
            <NavBar />
            <TimelineContainer>
                <div>
                    <PageTitle>timeline</PageTitle>
                    <TimelineBodyContainer>
                        <PostsListContainer>
                            <Publish posts={posts} setPosts={setPosts} />
                            <PostsList posts={posts} setPosts={setPosts} />
                        </PostsListContainer>
                        <Trending />
                    </TimelineBodyContainer>
                </div>
            </TimelineContainer>
        </>
    );
}

const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 53px;

    @media (max-width: 700px) {
        width: 100%;
        margin-top: 0px;

        & > div {
            width: 100%;
        }
    }
`;

const PageTitle = styled.h1`
    font-family: "Oswald", sans-serif;
    font-size: 45px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 43px;
    

    @media (max-width: 700px) {
        margin: 19px 17px;
        font-size: 33px;
        line-height: 49px;
    }
`;

const TimelineBodyContainer = styled.div`
    display: flex;
    width: 100%;
`;

const PostsListContainer = styled.main`
    display: flex;
    flex-direction: column;
    margin-right: 25px;

    @media (max-width: 937px) {
        margin-right: 0;
    }

    @media (max-width: 700px) {
        width: 100%;
    }
`;

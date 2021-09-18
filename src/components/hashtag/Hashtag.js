import NavBar from "../navBar/NavBar";
import styled from "styled-components";
import Post from "../shared/Post";
import Trending from "../shared/Trending";
import MediaQuery from "react-responsive";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { getHashtagPosts } from "../../services/trendingApi";
import UserContext from "../../contexts/UserContext";

export default function Hashtag() {
    const { hashtag } = useParams();
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const request = getHashtagPosts(hashtag, user.token);
        request.then((res) => {
            setPosts(res.data.posts);
        });
    }, [hashtag]);

    return (
        <>
            <NavBar />
            <HashtagContainer>
                <div>
                    <PageTitle># {hashtag}</PageTitle>
                    <HashtagBodyContainer>
                        <PostsListContainer>
                            <div>
                                {posts.map((post) => (
                                    <Post post={post} key={post.id} />
                                ))}
                            </div>
                        </PostsListContainer>
                        <MediaQuery minWidth={937}>
                            <Trending />
                        </MediaQuery>
                    </HashtagBodyContainer>
                </div>
            </HashtagContainer>
        </>
    );
}

const HashtagContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 700px) {
        width: 100%;

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
    margin-top: 53px;

    @media (max-width: 700px) {
        margin: 19px 17px;
        font-size: 33px;
        line-height: 49px;
    }
`;

const HashtagBodyContainer = styled.div`
    display: flex;
    width: 100%;
`;

const PostsListContainer = styled.div`
    margin-right: 25px;

    & > div {
        width: 611px;
    }

    @media (max-width: 700px) {
        width: 100%;
        margin-right: 0;

        & > div {
            width: 100%;
        }
    }
`;

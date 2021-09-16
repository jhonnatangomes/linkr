import NavBar from "../navBar/NavBar";
import styled from "styled-components";
import Post from "../shared/Post";
import Trending from "../timeline/Trending";
import MediaQuery from "react-responsive";

const posts = {
    posts: [
        {
            id: 2,
            text: "Never Gonna Give You Up #rickroll",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            linkTitle: "Rick Astley - Never Gonna Give You Up (Video)",
            linkDescription:
                "Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYDSubscribe to the official Rick Ast...",
            linkImage: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            user: {
                id: 1,
                username: "teste",
                avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/1/avatar",
            },
            likes: [
                {
                    id: 1,
                    userId: 1,
                    postId: 2,
                    createdAt: "2021-05-24T18:55:37.544Z",
                    updatedAt: "2021-05-24T18:55:37.544Z",
                    "user.id": 1,
                    "user.username": "teste",
                },
                {
                    id: 2,
                    userId: 4,
                    postId: 2,
                    createdAt: "2021-05-25T17:41:50.248Z",
                    updatedAt: "2021-05-25T17:41:50.248Z",
                    "user.id": 4,
                    "user.username": "lalalabanana",
                },
            ],
        },
    ],
};

export default function Hashtag() {
    return (
        <>
            <NavBar />
            <HashtagContainer>
                <div>
                    <PageTitle># react</PageTitle>
                    <HashtagBodyContainer>
                        <PostsListContainer>
                            <div>
                                <Post post={posts.posts[0]} />
                                <Post post={posts.posts[0]} />
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
    margin-top: 72px;

    @media (max-width: 700px) {
        margin-top: 0px;
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
    }
`;

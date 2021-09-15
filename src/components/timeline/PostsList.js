import styled from "styled-components";
import { getPosts } from "../../services/api.js";
import Post from "../shared/Post.js";

const post = {
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
                avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar",
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
            ],
        },
    ],
};

export default function PostsList() {
    return (
        <Container>
            <Post post={post.posts[0]} />
        </Container>
    );
}

const Container = styled.section`
    width: 611px;
    /* margin-right: 25px; */

    @media (max-width: 700px) {
        width: 100vw;
    }
`;

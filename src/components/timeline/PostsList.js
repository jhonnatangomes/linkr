import styled from "styled-components";
import { getPosts } from "../../services/api.js";
import UserContext from "../../contexts/UserContext.js";
import Post from "../shared/Post.js";
import { useEffect, useState, useContext } from "react";

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const request = getPosts(user.token);
        request.then((res) => {
            setPosts(res.data.posts);
        });
    }, []);

    return (
        <Container>
            {posts.map((post) => (
                <Post post={post} />
            ))}
        </Container>
    );
}

const Container = styled.section`
    width: 611px;

    @media (max-width: 700px) {
        width: 100vw;
    }
`;

import styled from "styled-components";
import { getPosts } from "../../services/api.js";
import UserContext from "../../contexts/UserContext.js";
import Post from "../shared/Post.js";
import { useEffect, useContext } from "react";
import { useHistory } from "react-router";

export default function PostsList({ posts, setPosts }) {
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (user) {
            const request = getPosts(user.token);
            request.then((res) => {
                setPosts(res.data.posts);
            });
        } else {
            alert("Você não está logado!");
            history.push("/");
        }
    }, []);

    return (
        <Container $loading={!posts.length}>
            {posts.length ? posts.map((post) => (
                <Post post={post} key={post.id} />
            )) : <Loading>Carregando...</Loading>}
        </Container>
    );
}

const Container = styled.section`
    width: 611px;
    text-align: ${({$loading}) => $loading ? "center" : "initial"};

    @media (max-width: 700px) {
        width: 100vw;
    }
`;

const Loading = styled.span`
    font-size: 30px;
    color: white;
    font-weight: 700;
`
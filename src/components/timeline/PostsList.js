import styled from "styled-components";
import { getPosts } from "../../services/api.js";
import UserContext from "../../contexts/UserContext.js";
import FollowingContext from "../../contexts/FollowingContext.js";
import Post from "../shared/post/Post.js";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import Loading from "../shared/Loading";
import NoPostsMessage from "../../styles/NoPostsMessage";

export default function PostsList({ posts, setPosts }) {
    const { user } = useContext(UserContext);
    const { followingUsers } = useContext(FollowingContext);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (user) {
            const request = getPosts(user.token);
            request.then((res) => {
                setPosts(res.data.posts);
            });
            request.catch(() => {
                setPosts([]);
                setErrorMessage("Houve uma falha ao obter os posts, por favor atualize a página");
            })
        } else {
            alert("Você não está logado!");
            history.push("/");
        }
    }, []);

    return (
        <>
            {posts === null || followingUsers === null ? <Loading />:(<Container>
                {followingUsers.length === 0 ? <NoPostsMessage>Você não segue ninguém ainda, procure por perfis na busca</NoPostsMessage>:""}
                {posts.length === 0 && followingUsers.length !== 0 ? <NoPostsMessage>Nenhuma publicação encontrada</NoPostsMessage>:posts.map((post) => (
                    <Post 
                        post={post} 
                        key={post.repostId ? post.repostId : post.id}
                    />
                ))}
            </Container>)}
            {posts !== null && posts.length === 0 && !errorMessage ? <Span>Nenhum post encontrado</Span> : ""}
            {errorMessage ? <Span>{errorMessage}</Span> : ""}
        </>
    );
}

const Container = styled.section`
    width: 611px;

    @media (max-width: 700px) {
        width: 100vw;
    }
`;

const Span = styled.span`
    color: white;
    font-size: 25px;
    width: 611px;
    text-align: center;
`;
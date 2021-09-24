import styled from "styled-components";
import { getPosts } from "../../services/api.js";
import UserContext from "../../contexts/UserContext.js";
import FollowingContext from "../../contexts/FollowingContext.js";
import Post from "../shared/post/Post.js";
import { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import Loading from "../shared/Loading";
import NoPostsMessage from "../../styles/NoPostsMessage";

export default function PostsList({ posts, setPosts }) {
    const { user } = useContext(UserContext);
    const { followingUsers } = useContext(FollowingContext);
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
        <>
            {posts === null || followingUsers === null ? <Loading />:(<Container>
                {followingUsers.length === 0 ? <NoPostsMessage>Você não segue ninguém ainda, procure por perfis na busca</NoPostsMessage>:""}
                {posts.length === 0 && followingUsers.length !== 0 ? <NoPostsMessage>Nenhuma publicação encontrada</NoPostsMessage>:posts.map((post) => (
                    <Post 
                        post={post} 
                        key={post.id} 
                    />
                ))}
            </Container>)}
        </>
    );
}

const Container = styled.section`
    width: 611px;

    @media (max-width: 700px) {
        width: 100vw;
    }
`;
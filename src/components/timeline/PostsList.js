import styled from "styled-components";
import { getPosts } from "../../services/api.js";
import UserContext from "../../contexts/UserContext.js";
import Post from "../shared/Post.js";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import Loading from "../shared/Loading";

export default function PostsList({ posts, setPosts }) {
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (user) {
            const request = getPosts(user.token);
            request.then((res) => {
                setPosts(res.data.posts);
                setServerResponded(true);
            });
            request.catch(() => {
                setErrorMessage(
                    "Houve uma falha ao obter os posts, por favor atualize a página"
                );
            });
        } else {
            alert("Você não está logado!");
            history.push("/");
        }
    }, []);

    return (
        <>
            {posts === null ? <Loading />:(<Container>
                {posts.map((post) => (
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
    text-align: ${({ $loading }) => ($loading ? "center" : "initial")};

    @media (max-width: 700px) {
        width: 100vw;
    }
`;

const Span = styled.span`
    font-size: 30px;
    color: white;
    font-weight: 700;
    display: ${({ invisible }) => (invisible ? "none" : "block")};
`;

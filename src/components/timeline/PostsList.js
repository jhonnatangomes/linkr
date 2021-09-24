import styled from "styled-components";
import { getPosts, getNewerPosts } from "../../services/api.js";
import UserContext from "../../contexts/UserContext.js";
import FollowingContext from "../../contexts/FollowingContext.js";
import Post from "../shared/post/Post.js";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { useHistory } from "react-router";
import Loading from "../shared/Loading";
import NoPostsMessage from "../../styles/NoPostsMessage";

export default function PostsList({ posts, setPosts }) {
    const { user } = useContext(UserContext);
    const { followingUsers } = useContext(FollowingContext);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const [newerPost, setNewerPost] = useState({});

    const addNewPosts = useCallback(() => {
        const request = getNewerPosts(user.token, newerPost);
        request.then((res) => {setPosts([...res.data.posts,...posts])});
        console.log('passou no interval');
    }, [posts, newerPost]);//eslint-disable-line react-hooks/exhaustive-deps

    const useInterval = (callback, delay) => {
        const savedCallback = React.useRef();
        useEffect(() => {savedCallback.current = callback}, [callback]);
        useEffect(() => {
            function tick() {savedCallback.current()};
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }, [delay]);
    };
    
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
    }, []);//eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {posts && setNewerPost(posts[0])}, [posts]);
    useInterval(() => {newerPost && addNewPosts()}, 15000);

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
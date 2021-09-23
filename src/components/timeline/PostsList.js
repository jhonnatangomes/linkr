import styled from "styled-components";
import { getPosts, getNewerPosts } from "../../services/api.js";
import UserContext from "../../contexts/UserContext.js";
import Post from "../shared/post/Post.js";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import Loading from "../shared/Loading";

export default function PostsList({ posts, setPosts }) {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const [newerPost, setNewerPost] = useState({});

    const useInterval = (() => {
        const request = getNewerPosts(user.token, newerPost);
        request.then((res) => {setPosts([...res.data.posts,...posts])});
    }, 1500);

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

    useEffect(() => {posts && setNewerPost(posts[0])}, [posts]);
    console.log(newerPost);

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

    @media (max-width: 700px) {
        width: 100vw;
    }
`;
import styled from "styled-components";
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext.js';
import { getUserPosts } from '../../services/userPostsApi.js';
import NavBar from "../navBar/NavBar";
import Trending from '../shared/Trending.js';
import Loading from '../shared/Loading.js';
import Post from '../shared/post/Post.js';
import Search from "../shared/search/Search";

export default function MyPosts () {
    const { user } = useContext(UserContext);
    const [myPosts, setMyPosts] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (user) {
            getUserPosts(user.id, user.token)
                .then((response) => setMyPosts(response.data.posts))
                .catch(() => alert("Ocorreu algum erro!"));
        } else {
            alert("Você não está logado!");
            history.push("/");
        }
    }, []);

    return (
        <>
        <NavBar />
        <Search layout="mobile" />
            <MyPostsContainer>
                <div>
                    <PageTitle>my posts</PageTitle>
                    <MyPostsBodyContainer>
                        <PostsListContainer>
                            {myPosts === null ? <Loading />:(<Container>
                                {myPosts.map((post, index) => <Post key={index} post={post} />)}
                            </Container>)}
                        </PostsListContainer>
                        <Trending />
                    </MyPostsBodyContainer>
                </div>
            </MyPostsContainer>
        </>
    );
}

const MyPostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 53px;

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

    @media (max-width: 700px) {
        margin: 19px 17px;
        font-size: 33px;
        line-height: 49px;
    }
`;

const MyPostsBodyContainer = styled.div`
    display: flex;
    width: 100%;
`;

const PostsListContainer = styled.main`
    display: flex;
    flex-direction: column;
    margin-right: 25px;

    @media (max-width: 937px) {
        margin-right: 0;
    }

    @media (max-width: 700px) {
        width: 100%;
    }
`;

const Container = styled.section`
    width: 611px;

    @media (max-width: 700px) {
        width: 100vw;
    }
`;
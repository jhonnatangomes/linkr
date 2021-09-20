import styled from "styled-components";
import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UserContext from '../../contexts/UserContext.js';
import { getUserPosts } from '../../services/userPostsApi.js';
import { getUserInfo } from '../../services/userInfoApi.js';
import NavBar from "../navBar/NavBar";
import Trending from "../shared/Trending";
import Post from '../shared/Post.js';

export default function MyPosts () {
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [usernamePosts, setUsernamePosts] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (user) {
            getUserInfo(id, user.token)
                .then((response) => {
                    setUsernamePosts(response.data.user.username);
                    if (response.data.user.id === user.id) {
                        history.push('/my-posts');
                    }
                })
                .catch((error) => {
                    if(error.response.status === 500) {
                        alert("Este usuário não existe!")
                    } else {
                        alert("Ocorreu algum erro!");
                    }
                    history.push("/timeline");
                });

            getUserPosts(id, user.token)
                .then((response) => {
                    setUserPosts(response.data.posts);
                })
                .catch(() => alert("Ocorreu algum erro!"));
        } else {
            alert("Você não está logado!");
            history.push("/");
        }
    }, []);

    return (
        <>
        <NavBar />
            <UserPostsContainer>
                <div>
                    <PageTitle>{usernamePosts}'s posts</PageTitle>
                    <UserPostsBodyContainer>
                        <PostsListContainer>
                            <Container>
                                {userPosts.map((post, index) => <Post key={index} post={post} />)}
                            </Container>
                        </PostsListContainer>
                        <Trending />
                    </UserPostsBodyContainer>
                </div>
            </UserPostsContainer>
        </>
    );
}

const UserPostsContainer = styled.div`
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

const UserPostsBodyContainer = styled.div`
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
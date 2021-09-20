import styled from "styled-components";
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext.js';
import { getUserLikes } from '../../services/userLikesApi.js';
import Loading from "../shared/Loading";
import NavBar from "../navBar/NavBar";
import Trending from '../shared/Trending';
import Post from '../shared/Post.js';

export default function MyPosts () {
    const { user } = useContext(UserContext);
    const [myLikes, setMyLikes] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (user) {
            getUserLikes(user.token)
                .then((response) => setMyLikes(response.data.posts))
                .catch(() => alert("Ocorreu um erro!"));
        } else {
            alert("Você não está logado!");
            history.push("/");
        }
    }, []);

    return (
        <>
        <NavBar />
            <MyLikesContainer>
                <div>
                    <PageTitle>my likes</PageTitle>
                    <MyLikesBodyContainer>
                        <PostsListContainer>
                            {myLikes === null ? <Loading />:(<Container>
                                {myLikes.map((post, index) => <Post key={index} post={post} />)}
                            </Container>)}
                        </PostsListContainer>
                        <Trending />
                    </MyLikesBodyContainer>
                </div>
            </MyLikesContainer>
        </>
    );
}

const MyLikesContainer = styled.div`
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

const MyLikesBodyContainer = styled.div`
    display: flex;
    width: 100%;
`;

const PostsListContainer = styled.main`
    display: flex;
    flex-direction: column;
    margin-right: 25px;

    @media (max-width: 700px) {
        width: 100%;
        margin-right: 0;
    }
`;

const Container = styled.section`
    width: 611px;

    @media (max-width: 700px) {
        width: 100vw;
    }
`;

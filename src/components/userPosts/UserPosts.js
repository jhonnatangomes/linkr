import styled from "styled-components";
import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UserContext from '../../contexts/UserContext.js';
import ModalContext from "../../contexts/ModalContext.js";
import { getUserPosts } from '../../services/userPostsApi.js';
import { getUserInfo } from '../../services/userInfoApi.js';
import NavBar from "../navBar/NavBar";
import Trending from "../shared/Trending";
import Follow from './Follow.js';
import Post from '../shared/post/Post.js';
import Loading from '../shared/Loading.js';
import Search from "../shared/search/Search";
import NoPostsMessage from "../../styles/NoPostsMessage";
import noPreviewImg from '../assets/imgs/profile-standard.jpg';


export default function MyPosts () {
    const { user } = useContext(UserContext);
    const { setModal } = useContext(ModalContext);
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState("");
    const [userPosts, setUserPosts] = useState(null);
    const history = useHistory();

    const openModal = (data) => {
        setModal({ modalIsOpen: true, ...data });
    };

    function addDefaultPostImgSrc(ev) { ev.target.src = noPreviewImg };


    useEffect(() => {
        window.scrollTo(0, 0);
        setUserPosts(null);
        if (user) {
            getUserInfo(id, user.token)
                .then((response) => {
                    setUserInfo(response.data.user);
                })
                .catch((error) => {
                    if(error.response.status === 500) {
                        openModal({message: "Este usuário não existe!"});
                    } else {
                        openModal({message: "Ocorreu algum erro!"});
                    }
                    history.push("/timeline");
                });

            getUserPosts(id, user.token)
                .then((response) => {
                    setUserPosts(response.data.posts);
                })
                .catch(() => openModal({message: "Ocorreu algum erro!"}));
        } else {
            alert("Você não está logado!");
            history.push("/");
        }
    }, [id]);//eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <NavBar />
        <Search layout="mobile" />
            <UserPostsContainer>
                <div>
                    <TitleContainer>
                        <UserInfoBox>
                            <UserImg>
                                <img onError={(e) => addDefaultPostImgSrc(e)} src={userInfo.avatar} alt={userInfo.username} />
                            </UserImg>
                            <Title>{userInfo.username}'s posts</Title>
                        </UserInfoBox>
                        <Follow userId={id} token={user.token} />
                    </TitleContainer>
                    <UserPostsBodyContainer>
                        <PostsListContainer>
                            {userPosts === null ? <Loading />:<Container>
                                {userPosts.length === 0 ? <NoPosts />: userPosts.map((post, index) => <Post key={index} post={post} />)}
                            </Container>}
                        </PostsListContainer>
                        <Trending />
                    </UserPostsBodyContainer>
                </div>
            </UserPostsContainer>
        </>
    );
}

function NoPosts () {
    return (
        <NoPostsMessage>
            Este usuário não postou nada ainda!
        </NoPostsMessage>
    );
}


const UserPostsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 53px;

    > div {
        width: 937px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media (max-width: 937px) {
        > div {
            width: 100%;
        }
    }

    @media (max-width: 700px) {
        margin-top: 0px;
        width: 100%;
        & > div {
            width: 100%;
        }
    }
`;

const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 43px;
    overflow: hidden;

    @media (max-width: 937px) {
        width: 611px;
    }

    @media (max-width: 700px) {
        margin: 19px 17px;
        width: calc(100% - 34px);
    }
`;

const UserInfoBox = styled.div`
    display: flex;
    width: 837px;
    align-items: center;

    @media (max-width: 937px) {
        width: calc(611px - 100px);
    }

    @media (max-width: 700px) {
        width: calc(100% - 100px);
    }
`;

const UserImg = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 10px;

    & img {
        height: 100%;
    }
`;

const Title = styled.h1`
    font-family: "Oswald", sans-serif;
    font-size: 45px;
    height: 53px;
    font-weight: 700;
    color: #ffffff;
    width: calc(100% - 60px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 700px) {
        font-size: 33px;
        line-height: 49px;
    }
`;

const UserPostsBodyContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
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
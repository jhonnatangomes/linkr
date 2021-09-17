import styled from "styled-components";
import { getPosts } from "../../services/api.js";
import UserContext from "../../contexts/UserContext.js";
import Post from "../shared/Post.js";
import Modal from "../shared/modal/Modal.js";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import { likePost, dislikePost } from "../../services/likePostApi";

export default function PostsList({ posts, setPosts }) {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const [serverResponded, setServerResponded] = useState(false);
    const [likedPosts, setLikedPosts] = useState([]);
    const [modal, setModal] = useState({ modalIsOpen: false });

    const openModal = (data) => {
        setModal({ modalIsOpen: true, ...data });
    };

    const closeModal = () => {
        setModal({ modalIsOpen: false });
    };

    useEffect(() => {
        if (user) {
            const request = getPosts(user.token);
            request.then((res) => {
                setPosts(res.data.posts);
                setServerResponded(true);
                setLikedPosts(
                    res.data.posts.map((post) =>
                        Boolean(
                            post.likes.find((like) => like.userId === user.id)
                        )
                    )
                );
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

    const toggleLike = (index) => {
        const newLikedPosts = [...likedPosts];
        let newPosts = [...posts];
        const id = newPosts[index].id;

        const fakeLike = () => {
            newLikedPosts[index] = true;
            newPosts[index].likes.push({
                userId: user.id,
                "user.username": user.username,
            });
        };

        const fakeDislike = () => {
            newLikedPosts[index] = false;
            newPosts[index].likes = newPosts[index].likes.filter(
                (like) => like.userId !== user.id
            );
        };

        if (newLikedPosts[index]) {
            fakeDislike();

            dislikePost(id, user.token).catch(() => {
                fakeLike();
                openModal({ message: "Erro ao descurtir o post" });
            });
        } else {
            fakeLike();
            likePost(id, user.token).catch(() => {
                fakeDislike();
                openModal({ message: "Erro ao curtir o post" });
            });
        }

        setPosts(newPosts);
        setLikedPosts(newLikedPosts);
    };

    return (
        <Container $loading={!posts.length}>
            <Modal modal={modal} closeModal={closeModal} />
            {serverResponded ? (
                posts.map((post, i) => (
                    <Post
                        isLiked={likedPosts[i]}
                        toggleLike={() => toggleLike(i)}
                        userId={user.id}
                        post={post}
                        key={post.id}
                    />
                ))
            ) : (
                <Span invisible={errorMessage}>Carregando...</Span>
            )}
            {posts.length === 0 && serverResponded ? (
                <Span>Nenhum post encontrado</Span>
            ) : (
                ""
            )}
            {errorMessage ? <Span>{errorMessage}</Span> : ""}
        </Container>
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

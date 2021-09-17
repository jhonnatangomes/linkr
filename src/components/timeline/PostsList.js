import styled from "styled-components";
import { getPosts } from "../../services/api.js";
import UserContext from "../../contexts/UserContext.js";
import Post from "../shared/Post.js";
import Modal from "../shared/modal/Modal.js";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import {likePost, dislikePost} from "../../services/likePostApi";
import ReactTooltip from 'react-tooltip';

export default function PostsList({ posts, setPosts }) {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const [likedPosts, setLikedPosts] = useState([]);
    const [modal, setModal] = useState({modalIsOpen: false});

    const openModal = (data) => {
        setModal({modalIsOpen: true, ...data});
    }

    const closeModal = () => {
        setModal({modalIsOpen: false});
    }

    useEffect(() => {
        if (user) {
            const request = getPosts(user.token);
            request.then((res) => {
                setPosts(res.data.posts);
                setLikedPosts(res.data.posts.map((post) =>
                    Boolean(post.likes.find(like => like.userId === user.id)))
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
                'userId': user.id,
                'user.username': user.username,
            })
        }

        const fakeDislike = () => {
            newLikedPosts[index] = false;
            newPosts[index].likes = newPosts[index].likes.filter((like) =>
                like.userId !== user.id
            )
        }

        if (newLikedPosts[index]) {
            fakeDislike();

            dislikePost(id, user.token).catch(() => {
                fakeLike();
                openModal({message: 'Erro ao descurtir o post'});
            });
        } else {
            fakeLike();
            likePost(id, user.token).catch(() => {
                fakeDislike();
                openModal({ message: 'Erro ao curtir o post' });
            });
        }

        setPosts(newPosts);
        setLikedPosts(newLikedPosts);
    }

    ReactTooltip.rebuild();

    return (
        <Container>
            <StyledReactTooltip 
                backgroundColor="rgba(255, 255, 255, 0.9)"
                place="bottom" 
                effect="solid" 
            />
            <Modal 
                modal={modal} 
                closeModal={closeModal}
            />

            {posts.map((post, i) => (
                <Post 
                    isLiked={likedPosts[i]}
                    toggleLike={() => toggleLike(i)}
                    userId={user.id}
                    post={post} 
                    key={post.id} />
            ))}
        </Container>
    );
}

const StyledReactTooltip = styled(ReactTooltip)`
    color: #505050 !important;
    font-weight: bold !important;
    font-size: 11px !important;
    font-family: Lato !important;
`;

const Container = styled.section`
    width: 611px;

    @media (max-width: 700px) {
        width: 100vw;
    }
`;

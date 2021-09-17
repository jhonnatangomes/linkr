import styled from "styled-components";
import { getPosts } from "../../services/api.js";
import UserContext from "../../contexts/UserContext.js";
import Post from "../shared/Post.js";
import Modal from "../shared/modal/Modal.js";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";

import ReactTooltip from 'react-tooltip';

export default function PostsList({ posts, setPosts }) {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const [modal, setModal] = useState({modalIsOpen: false});

    const openModal = (data) => {
        setModal({ modalIsOpen: true, ...data });
    }

    const closeModal = () => {
        setModal({ modalIsOpen: false });
    }

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
                    openModal={openModal}
                    closeModal={closeModal}
                    post={post} 
                    key={post.id} 
                />
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

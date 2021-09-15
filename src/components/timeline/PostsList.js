import styled from "styled-components";

import Post from "../shared/Post.js";

export default function PostsList() {
    return (
        <Container>
            {/*Só usar o map na arrays dos posts*/}
            <Post />
            <Post />
            <Post />
        </Container>
    );
}

const Container = styled.section`
    width: 611px;
    /* margin-right: 25px; */

    @media (max-width: 700px) {
        width: 100vw;
    }
`;

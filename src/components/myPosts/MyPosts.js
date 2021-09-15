import axios from "axios";

import { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext.js';

export default function MyPosts () {
    const { user } = useContext(UserContext);
    const [myPosts, setMyPosts] = useState([]);

    console.log(myPosts);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${user.user.id}/posts`, config)
            .then((response) => setMyPosts(response.data.posts))
            .catch(() => alert("Ocorreu algum erro!"));
    },[]);

    return (
        <>
        </>
    );
}
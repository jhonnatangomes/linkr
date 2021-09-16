import { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext.js';
import { getUserPosts } from '../../services/userPostsApi.js';

export default function MyPosts () {
    const { user } = useContext(UserContext);
    const [myPosts, setMyPosts] = useState([]);

    console.log(myPosts);

    useEffect(() => {
        getUserPosts(user.user.id, user.token)
            .then((response) => setMyPosts(response.data.posts))
            .catch(() => alert("Ocorreu algum erro!"));
    },[]);

    return (
        <>
        </>
    );
}
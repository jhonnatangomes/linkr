import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { getFollowingList } from '../services/getFollowingList.js';

import Hashtag from "./hashtag/Hashtag";

import UserContext from "../contexts/UserContext";
import ModalContext from "../contexts/ModalContext";
import FollowingContext from "../contexts/FollowingContext.js";

import SignPage from './signPage/SignPage';
import Header from "./header/Header";
import Timeline from './timeline/Timeline';
import UserPosts from './userPosts/UserPosts.js';
import MyPosts from './myPosts/MyPosts';
import Modal from "./shared/modal/Modal.js";
import Tooltip from "./shared/tooltip/Tooltip.js";
import MyLikes from './myLikes/MyLikes';

export default function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [followingUsers, setFollowingUsers] = useState(null);
    const [modal, setModal] = useState({ modalIsOpen: false });

    useEffect(() => {
        if (user !== null ) {
        getFollowingList(user.token)
            .then((res) => setFollowingUsers(res.data.users.map((user) => user.id)))
            .catch(() => alert("Ocorreu algum erro!"));
        }
    },[]);

    const closeModal = () => {
        setModal({ modalIsOpen: false });
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ModalContext.Provider value={{ modal, setModal }}>
                <FollowingContext.Provider value={{ followingUsers, setFollowingUsers }}>
                    <Modal modal={modal} closeModal={closeModal} />
                    <Tooltip effect="solid" id="main" />
                    <BrowserRouter>
                        <GlobalStyle />
                        <Tooltip/>
                        <Switch>
                            <Route path="/signup" exact component={SignPage} />
                            <Route path="/timeline" exact>
                                <Header/>
                                <Timeline/>
                            </Route>
                            <Route path="/my-posts" exact>
                                <Header/>
                                <MyPosts/>
                            </Route>
                            <Route path="/my-likes" exact>
                                <Header/>
                                <MyLikes/>
                            </Route>
                            <Route path="/hashtag/:hashtag" exact>
                                <Header/>
                                <Hashtag/>
                            </Route>
                            <Route path="/user/:id" exact>
                                <Header />
                                <UserPosts />
                            </Route>
                            <Route path="/" exact component={SignPage} />
                            <Redirect to="/signup" />
                        </Switch>
                    </BrowserRouter>
                </FollowingContext.Provider>
            </ModalContext.Provider>
        </UserContext.Provider>
    );
}

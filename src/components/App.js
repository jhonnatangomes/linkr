import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { Redirect } from "react-router";

import Hashtag from "./hashtag/Hashtag";

import UserContext from "../contexts/UserContext";
import ModalContext from "../contexts/ModalContext";

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
    const [modal, setModal] = useState({ modalIsOpen: false });

    const closeModal = () => {
        setModal({ modalIsOpen: false });
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ModalContext.Provider value={{ modal, setModal }}>

            <Modal modal={modal} closeModal={closeModal} />
            <Tooltip effect="solid" id="main" />
            <BrowserRouter>
                <GlobalStyle />
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
            </ModalContext.Provider>
        </UserContext.Provider>
    );
}

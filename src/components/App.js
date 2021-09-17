import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { Redirect } from "react-router";

import UserContext from "../contexts/UserContext";
import SignPage from "./signPage/SignPage";
import Timeline from "./timeline/Timeline";
import Hashtag from "./hashtag/Hashtag";
import ModalContext from '../contexts/ModalContext';

import Modal from "./shared/modal/Modal.js";
import Tooltip from "./shared/tooltip/Tooltip.js";

export default function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [modal, setModal] = useState({ modalIsOpen: false });
    
    const closeModal = () => {
        setModal({ modalIsOpen: false });
    }

    return (
		<UserContext.Provider value={{ user, setUser }}>
            <ModalContext.Provider value={{ modal, setModal }}>
                <Modal modal={modal} closeModal={closeModal} />
                <Tooltip effect="solid" id="main"/>
            <BrowserRouter>
                <GlobalStyle />
                <Tooltip/>
                <Switch>
                    <Route path="/signup" exact component={SignPage} />
                    <Route path="/timeline" exact component={Timeline} />
                    <Route path="/hashtag/:hashtag" exact component={Hashtag} />
                    <Route path="/user/:id" exact component={null}/>
                    <Route path="/" exact component={SignPage} />
                    <Redirect to="/signup" />
                </Switch>
			</BrowserRouter>
            </ModalContext.Provider>
        </UserContext.Provider>
    );
}

import GlobalStyle from '../styles/globalStyles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from "react";
import { Redirect } from 'react-router';

import UserContext from '../contexts/UserContext';
import SignPage from './signPage/SignPage';
import Timeline from './timeline/Timeline';
import MyPosts from './myPosts/MyPosts';
import MyLikes from './myLikes/MyLikes';

export default function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    return (
		<UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
				<GlobalStyle />
				<Switch>
                    <Route path="/signup" exact component={SignPage} />
                    <Route path="/timeline" exact component={Timeline} />
                    <Route path="/my-posts" exact component={MyPosts} />
                    <Route path="/my-likes" exact component={MyLikes} />
                    <Route path="/" exact component={SignPage} />
                    <Redirect to="/signup" />
                </Switch>
			</BrowserRouter>
        </UserContext.Provider>
    )
}
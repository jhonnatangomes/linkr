import GlobalStyle from '../styles/globalStyles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from "react";

import UserContext from '../contexts/UserContext';
import SignPage from './sign-in & sign-up/SignPage';
import Timeline from './timeline/Timeline';

export default function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    return (
		<UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
				<GlobalStyle />
				<Switch>
                    <Route path="/" exact component={SignPage} />
                    <Route path="/signup" exact component={SignPage} />
                    <Route path="/timeline" exact component={Timeline} />
                </Switch>
			</BrowserRouter>
        </UserContext.Provider>
    )
}
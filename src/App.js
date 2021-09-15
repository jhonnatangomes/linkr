import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import SignPage from "./components/sign-in & sign-up/SignPage";
import UserContext from "./contexts/UserContext";
import Timeline from "./components/timeline/Timeline";
import GlobalStyle from "./styles/GlobalStyle";
import { useState } from "react";

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <GlobalStyle />
            <Router>
                <Switch>
                    <Route path="/signup" exact component={SignPage} />
                    <Route path="/timeline" exact component={Timeline} />
                    <Route path="/" exact component={SignPage} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;

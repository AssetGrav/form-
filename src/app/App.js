import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Users from "./components/users";
import Login from "./components/login";
import Main from "./components/main";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?" render={(props) => (<Users {...props} />)}/>
                <Route path="/login" component={Login} />
                <Route exact path="/" component={Main} />
            </Switch>
        </div>
    );
};

export default App;

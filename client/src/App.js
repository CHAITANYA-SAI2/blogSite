import React, { useContext } from "react";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Post from "./components/post/Post";
import { Context } from "./context/Context";
function App() {
  const {user}=useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
          <Route exact path='/'>
              <Home />
          </Route>
          <Route path='/register'>
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path='/login'>
          {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path='/write'>
          {user ? <Write /> : <Redirect to="/login" />}
          </Route>
          <Route path='/settings'>
            {user ? <Settings /> : <Redirect to="/login" />}
          </Route>
          <Route path='/post/:postId'>
          <Single/>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;

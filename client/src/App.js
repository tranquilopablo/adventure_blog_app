import React, { useContext } from 'react';
import Topbar from './shared/navigation/Topbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Write from './pages/Write';
import Login from './pages/Login';
import Settings from './pages/Settings';
import SinglePost from './pages/SinglePost';
import { Context } from './context/Context';

const App = () => {
  // const user = false;
  const { user } = useContext(Context);

  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/napisz">{user ? <Write /> : <Login />}</Route>
        <Route path="/ustawienia">{user ? <Settings /> : <Login />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/post/:postId">
          <SinglePost />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

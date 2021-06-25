import React from 'react'
import { BrowserRouter as Router, Route, Switch, hashHistory } from 'react-router-dom';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home/Home'
import ChatRoulette from './Pages/ChatRoulette/ChatRoulette';
function App() {
  return (
    <div className="App">
      <Router history={hashHistory}>
        <Switch>
          <Route path="/" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/chatRoulette" exact component={ChatRoulette} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

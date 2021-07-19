import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home/Home'
import ChatRoulette from './Pages/ChatRoulette/ChatRoulette';
import Messages from './Pages/Messages/Messages';
import Notification from './Pages/Notification/Notification';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/chatRoulette" exact component={ChatRoulette} />
          <Route path="/messaging" exact component={Messages} />
          <Route path="/notification" exact component={Notification} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

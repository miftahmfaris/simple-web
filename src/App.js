import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import EditPassword from "./pages/EditPassword";

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
      <Route path="/editPassword" component={EditPassword} />
    </div>
  </Router>
);

export default App;

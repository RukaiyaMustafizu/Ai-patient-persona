// This is the main entry point of the application.
// This file is responsible for rendering the App component and wrapping it with the Router component.
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={App} />
      {/* Add other routes if needed */}
    </Switch>
  </Router>,
  document.getElementById("root")
);

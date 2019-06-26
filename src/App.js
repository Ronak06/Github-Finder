import React, { Fragment, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import components and styling
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/Pages/About";
import User from "./components/users/User";
import GithubState from "./context/github/GithubState";
import "./App.css";

const App = props => {
  const [alert, setAlert] = useState(null);

  // Set alert for empty text
  const showAlert = (message, type) => {
    setAlert({ message, type });

    // clears alert after 5 seconds
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={User} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </GithubState>
  );
};

export default App;

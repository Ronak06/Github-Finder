import React, { Fragment, useState } from "react";
import axios from "axios";
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

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Get user's repos
  const getUserRepos = async username => {
    // set loading to true, will cause app to rerender with Spinner
    setLoading(true);

    // Using axios to make get requests to Github api using Github token
    // to allow for unlimited get requests
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // setting users array to contain all the data from the axios get request
    // and setting loading to false now that all data has been extracted from axios
    setRepos(response.data);
    setLoading(false);
  };

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
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User {...props} getUserRepos={getUserRepos} repos={repos} />
                )}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </GithubState>
  );
};

export default App;

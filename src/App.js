import React, { Fragment } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import components and styling
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/Pages/About";
import User from "./components/users/User";
import "./App.css";

class App extends React.Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  async componentDidMount() {
    // set loading to true, will cause app to rerender with Spinner
    this.setState({ loading: true });

    // Using axios to make get requests to Github api using Github token
    // to allow for unlimited get requests
    const response = await axios.get(
      `https://api.github.com/users?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // setting users array to contain all the data from the axios get request
    // and setting loading to false now that all data has been extracted from axios
    this.setState({ users: response.data, loading: false });
  }

  // search Github users
  searchUsers = async text => {
    // set loading to true, will cause app to rerender with Spinner
    this.setState({ loading: true });

    // Using axios to make get requests to Github api using Github token
    // to allow for unlimited get requests
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // setting users array to contain all the data from the axios get request
    // and setting loading to false now that all data has been extracted from axios
    this.setState({ users: response.data.items, loading: false });
  };

  // Get single Github user
  getUser = async username => {
    // set loading to true, will cause app to rerender with Spinner
    this.setState({ loading: true });

    // Using axios to make get requests to Github api using Github token
    // to allow for unlimited get requests
    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // setting users array to contain all the data from the axios get request
    // and setting loading to false now that all data has been extracted from axios
    this.setState({ user: response.data, loading: false });
  };

  // Clear Users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // Set alert for empty text
  setAlert = (message, type) => {
    this.setState({ alert: { message: message, type: type } });

    // clears alert after 5 seconds
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { user, users, loading } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

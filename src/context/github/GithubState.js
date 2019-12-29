import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  FETCH_USER,
  FETCH_REPOS
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async text => {
    // set loading to true, will cause app to rerender with Spinner
    setLoading();

    // Using axios to make get requests to Github api using Github token
    // to allow for unlimited get requests
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    // setting users array to contain all the data from the axios get request
    // and setting loading to false now that all data has been extracted from axios
    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items
    });
  };

  // Fetch User
  const getUser = async username => {
    // set loading to true, will cause app to rerender with Spinner
    setLoading();

    // Using axios to make get requests to Github api using Github token
    // to allow for unlimited get requests
    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    console.log(response);

    dispatch({ type: FETCH_USER, payload: response.data });
  };

  // Fetch Repos
  const getUserRepos = async username => {
    // set loading to true, will cause app to rerender with Spinner
    setLoading();

    // Using axios to make get requests to Github api using Github token
    // to allow for unlimited get requests
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    // setting users array to contain all the data from the axios get request
    // and setting loading to false now that all data has been extracted from axios
    dispatch({ type: FETCH_REPOS, payload: response.data });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;

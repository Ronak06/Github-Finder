import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  FETCH_USER,
  FETCH_REPOS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return { ...state, users: action.payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: true };
    case CLEAR_USERS:
      return { ...state, users: [], loading: false };
    case FETCH_USER:
      return { ...state, user: action.payload, loading: false };
    case FETCH_REPOS:
      return { ...state, repos: action.payload, loading: false };
    default:
      return state;
  }
};

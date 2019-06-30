import { SET_ALERT, REMOVE_ALERT } from "../types";

// Using a switch to return state dependent on the action type provided
export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return action.payload;
    case REMOVE_ALERT:
      return null;
    default:
      return state;
  }
};

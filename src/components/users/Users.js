import React from "react";
import PropTypes from "prop-types";

// import components
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";

const Users = ({ users, loading }) => {
  // if loading is true, return Spinner
  if (loading) {
    return <Spinner />;
  }
  // otherwise return all the users from the Github api extracted
  return (
    <div style={userStyle}>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

// propTypes to check for valid prop entries
Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

// custom user styling
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default Users;

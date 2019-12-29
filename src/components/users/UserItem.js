import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
    float: "left"
  },
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const UserItem = ({ user }) => {
  const classes = useStyles();
  return (
    <div className="card text-center">
      <Avatar
        alt={user.login}
        src={user.avatar_url}
        className={classes.bigAvatar}
      />

      <h3>{user.login}</h3>
      <p></p>
      <div>
        <Link to={`/user/${user.login}`}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            className={classes.margin}
            to={`/user/${user.login}`}
          >
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;

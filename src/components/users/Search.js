import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {}
  }
}));

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState("");

  const classes = useStyles();

  // onChange method, sets the value of input text to the value a user types
  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (text === "") {
      alertContext.setAlert("Please enter text before searching.", "light");
    } else {
      // passing user text from search up to App which will handle the search to Github
      githubContext.searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <h3>Search for your favourite Github user!</h3>
      <form
        className={classes.root}
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Search for users..."
          variant="outlined"
          value={text}
          onChange={onChange}
          style={{ width: "100%" }}
          size="small"
        />
        <br />
        <br />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          style={{ width: "100%" }}
        >
          Search
        </Button>
      </form>
      <br />
      {githubContext.users.length > 0 && (
        <Button
          variant="contained"
          onClick={githubContext.clearUsers}
          style={{ width: "100%" }}
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default Search;

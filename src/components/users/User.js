import React, { Fragment, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

// import components
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const { loading, user, getUser, repos, getUserRepos } = githubContext;

  // useEffect acts as a componentDidMount lifecycle method
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    company,
    login,
    html_url,
    followers,
    following,
    public_repos,
    hireable
  } = user;

  if (loading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <Link to="/">
        <Button variant="contained">
          <i className="fas fa-arrow-left" style={{ marginRight: "5px" }} />
          <p>Back to Search </p>
        </Button>
      </Link>
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt=""
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location: {location} </p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            <i className="fab fa-github" /> Github
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>
              )}
            </li>
            <li>
              <strong>Hireable: </strong>
              {hireable ? (
                <i className="fas fa-check text-success" />
              ) : (
                <i className="fas fa-times-circle text-danger" />
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
      </div>

      <div>
        <h3>Latest 5 Repositories Created:</h3>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;

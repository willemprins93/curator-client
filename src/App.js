import React from "react";
import { BrowserRouter, Switch, NavLink } from "react-router-dom";
import "./App.css";
import ReactLoading from "react-loading";

import AnonRoute from "./components/auth/AnonRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import { validateSession, logout } from "./services/authService";

import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Curator from "./views/Curator";
import User from "./views/User";
import Artwork from "./views/Artwork";
import EditUser from "./views/EditUser";
import EditCollection from "./views/EditCollection";
import LikedWorks from "./views/LikedWorks";
import SimilarWorks from "./views/SimilarWorks";
import ArtistWorks from "./views/ArtistWorks";
// import Search from "./views/Search";

class App extends React.Component {
  state = {
    authenticated: false,
    user: {},
    isLoading: true,
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      validateSession(accessToken)
        .then((response) => {
          this.authenticate(response.session.userId);
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };

  authenticate = (user) => {
    this.setState({
      authenticated: true,
      user,
      isLoading: false,
    });
  };

  logout = () => {
    localStorage.clear();
    this.setState({
      authenticated: false,
      user: {},
    });
  };

  handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    logout(accessToken);
  };

  render() {
    const { authenticated, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="loading-page">
          <div className="spinner-card">
            <ReactLoading type={"spinningBubbles"} color={"#205586"} />
            <br />
            <p>
              <i>Please wait...</i>
            </p>
            <br />
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        <BrowserRouter>
          {authenticated && (
            <nav className="main-nav-bar">
              <span className="site-nav-container">
                <NavLink
                  activeClassName="is-active"
                  className="site-nav"
                  to="/mostlikedworks"
                >
                  Most Liked
                </NavLink>
              </span>
              <span className="site-nav-container">
                <NavLink
                  activeClassName="is-active"
                  className="site-nav"
                  to="/curator"
                >
                  Curator
                </NavLink>
              </span>
              {/* <span className="site-nav-container">
                <NavLink
                  activeClassName="is-active"
                  className="site-nav"
                  to="/search"
                >
                  Search
                </NavLink>
              </span> */}
              <span className="site-nav-container">
                <NavLink
                  activeClassName="is-active"
                  className="site-nav"
                  to="/user"
                >
                  My Collection
                </NavLink>
              </span>
            </nav>
          )}
          <Switch>
            <PrivateRoute
              exact
              path="/curator"
              authenticated={authenticated}
              user={this.state.user}
              component={Curator}
            />
            <PrivateRoute
              exact
              path="/user"
              authenticated={authenticated}
              logout={this.logout}
              user={this.state.user}
              component={User}
            />
            <PrivateRoute
              exact
              path="/artwork/:id"
              authenticated={authenticated}
              user={this.state.user}
              component={Artwork}
            />
            <PrivateRoute
              exact
              path="/user/editprofile"
              authenticated={authenticated}
              authenticate={this.authenticate}
              user={this.state.user}
              component={EditUser}
            />
            <PrivateRoute
              exact
              path="/user/editcollection"
              authenticated={authenticated}
              authenticate={this.authenticate}
              user={this.state.user}
              component={EditCollection}
            />
            <PrivateRoute
              exact
              path="/mostlikedworks"
              authenticated={authenticated}
              authenticate={this.authenticate}
              user={this.state.user}
              component={LikedWorks}
            />
            <PrivateRoute
              exact
              path="/:id/similar"
              authenticated={authenticated}
              authenticate={this.authenticate}
              user={this.state.user}
              component={SimilarWorks}
            />
            <PrivateRoute
              exact
              path="/artist/:id/"
              authenticated={authenticated}
              authenticate={this.authenticate}
              user={this.state.user}
              component={ArtistWorks}
            />
            {/* <PrivateRoute
              exact
              path="/search/"
              authenticated={authenticated}
              authenticate={this.authenticate}
              user={this.state.user}
              component={Search}
            /> */}
            <AnonRoute
              exact
              path="/"
              authenticated={authenticated}
              component={Home}
            />
            <AnonRoute
              exact
              path="/login"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Login}
            />
            <AnonRoute
              exact
              path="/signup"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Signup}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

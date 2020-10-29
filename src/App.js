import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
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

class App extends React.Component {
  state = {
    authenticated: false,
    user: {},
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      validateSession(accessToken)
        .then((response) => {
          this.authenticate(response.session.userId);
        })
        .catch((err) => console.log(err));
    }
  };

  authenticate = (user) => {
    this.setState({
      authenticated: true,
      user,
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
    const { authenticated } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          {/* <nav>
            {authenticated && <Link to="/"> Home </Link>}
            {!authenticated && <Link to="/login"> Login </Link>}
            {!authenticated && <Link to="/signup"> Signup </Link>}
            {authenticated && (
              <Link to={"/"} onClick={this.handleLogout}>
                Logout
              </Link>
            )}
          </nav> */}
          <Switch>
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
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import { getProfile, logout } from "../services/authService";
import { Link } from "react-router-dom";

export default class User extends Component {
  state = {
    user: this.props.user,
  };

  componentDidMount = () => {
    getProfile(this.props.user)
      .then((response) => {
        this.setState({
          user: response,
        });
      })
      .catch((err) => console.log(err));
  };

  handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    logout(accessToken)
      .then(() => {
        this.props.logout();
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { user } = this.state;
    return (
      <div className="collection">
        <h1>{user.name}'s Collection</h1>
        <nav>
          <Link className="site-nav" to="/" onClick={this.handleLogout}>
            Log Out
          </Link>
          <Link className="site-nav" to="/user/editprofile">
            Edit Info
          </Link>
          <Link className="site-nav" to="/user/editcollection">
            Edit Collection
          </Link>
        </nav>
        <div className="image-list">
          {user.artworksLiked.map((artwork, index) => {
            return (
              <div className="image-box" key={index}>
                <Link to={`/artwork/${artwork._id}`}>
                  <img
                    className="collection-image"
                    src={artwork.img}
                    alt={artwork.title}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

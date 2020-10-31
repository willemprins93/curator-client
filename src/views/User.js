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
    const sortedWorks = user.artworksLiked.reverse();
    return (
      <div className="collection">
        <h1>{user.name}'s Collection</h1>
        <nav>
          <>
            <Link className="user-nav" to="/user/editprofile">
              Edit Info
            </Link>
          </>
          <>
            <Link className="user-nav" to="/user/editcollection">
              Edit Collection
            </Link>
          </>
          <>
            <Link
              className="user-nav danger"
              to="/"
              onClick={this.handleLogout}
            >
              Log Out
            </Link>
          </>
        </nav>
        <div className="image-list">
          {sortedWorks.map((artwork, index) => {
            return (
              <div className="image-box" key={index}>
                <Link to={`/artwork/${artwork._id}`}>
                  <h1 className="mini-title">
                    {artwork.title}
                    <br />
                    <h4>
                      <i>{artwork.artist}</i>
                    </h4>
                    <p>{artwork.date}</p>
                  </h1>
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

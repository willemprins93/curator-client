import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../services/authService";
import { editCollection } from "../services/curatorService";

export default class EditCollection extends Component {
  state = {
    user: this.props.user,
    artworksLiked: [],
    artworksRemoved: [],
  };

  componentDidMount = () => {
    getProfile(this.props.user)
      .then((response) => {
        this.setState({
          user: response,
          artworksLiked: response.artworksLiked,
        });
      })
      .catch((err) => console.log(err));
  };

  handleRemove = (artwork) => {
    const newArtLiked = [...this.state.artworksLiked];
    const newRemoved = [...this.state.artworksRemoved];
    newArtLiked.splice(newArtLiked.indexOf(artwork), 1);
    newRemoved.push(artwork._id);
    this.setState({
      artworksLiked: newArtLiked,
      artworksRemoved: newRemoved,
    });
  };

  saveCollection = () => {
    const { user, artworksLiked, artworksRemoved } = this.state;
    const likedIds = artworksLiked.map((artwork) => artwork._id);

    editCollection({
      userId: user._id,
      artworksLiked: likedIds,
      artworksRemoved,
    })
      .then((response) => {
        this.props.authenticate(response.data.user);
        this.props.history.push("/user");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Edit Collection</h1>
        <button onClick={this.saveCollection}>Save Changes</button>
        <Link to="/user" className="site-text">
          Cancel
        </Link>
        <div className="image-list">
          {this.state.artworksLiked.map((artwork) => {
            return (
              <div className="image-box">
                <img
                  className="collection-image"
                  src={artwork.img}
                  alt={artwork.title}
                />
                <Link
                  className="delete-icon"
                  onClick={() => this.handleRemove(artwork)}
                >
                  <img src="/images/remove.png" alt="delete-icon" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

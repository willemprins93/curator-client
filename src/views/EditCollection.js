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
          artworksLiked: response.artworksLiked.reverse(),
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
      <div className="collection">
        <h1>Edit Collection</h1>
        <nav>
          <Link className="user-nav danger" to="/user">
            Cancel
          </Link>
          <Link className="user-nav success" onClick={this.saveCollection}>
            Save Changes
          </Link>
        </nav>
        <div className="image-list">
          {this.state.artworksLiked.map((artwork) => {
            return (
              <div className="image-box-edit">
                <h1 className="mini-title">
                  {artwork.title}
                  <br />
                  <h4>
                    <i>{artwork.artist.name}</i>
                  </h4>
                </h1>
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

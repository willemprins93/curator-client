import React, { Component } from "react";
import { getArtwork, addArtwork } from "../services/curatorService";
import { Link } from "react-router-dom";

export default class Artwork extends Component {
  state = {
    user: this.props.user,
    artworkId: this.props.match.params.id,
    artwork: {},
    usersLiked: [],
  };

  componentDidMount = () => {
    getArtwork(this.state.artworkId).then((response) => {
      this.setState({
        artwork: response,
        usersLiked: response.usersLiked,
      });
      console.log("artwork from the database: ", response);
    });
  };

  likeArtwork = () => {
    const { artwork, user } = this.state;
    addArtwork({
      userId: user._id,
      artwork,
      artists: artwork.artist,
      image: artwork.img,
    })
      .then((response) => {
        console.log("Success!!", response);
      })
      .catch((err) => console.log("Error found: ", err));
  };

  render() {
    const { artwork, usersLiked } = this.state;
    console.log("THE ARTWORK: ", artwork);
    return (
      <div className="artwork-details">
        <img src={artwork.img} alt={artwork.title} />
        <h1>{artwork.title}</h1>
        <h2>{artwork.artist}</h2>
        <h3>{artwork.artistNationality}</h3>
        <h4>About the artist:</h4>
        <p>{artwork.artistBio}</p>
        <h4>Medium:</h4>
        <p>{artwork.medium}</p>
        <h4>Date:</h4>
        <p>{artwork.date}</p>
        <h4>Held at:</h4> <p>{artwork.collectingInstitution}</p>
        <h2>{usersLiked.length} likes</h2>
        {!usersLiked.includes(this.state.user._id) ? (
          <Link to="#" onClick={this.likeArtwork}>
            Like
          </Link>
        ) : (
          <h2>You like this</h2>
        )}
      </div>
    );
  }
}

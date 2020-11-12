import React, { Component } from "react";
import { getArtwork, likeArtwork } from "../services/curatorService";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

export default class Artwork extends Component {
  state = {
    user: this.props.user,
    artwork: {},
    usersLiked: [],
    fullSizeToggle: "hidden",
    isLoading: true,
  };

  componentDidMount = () => {
    getArtwork(this.props.match.params.id)
      .then((response) => {
        console.log("Database returned something: ", response);
        this.setState({
          artwork: response,
          usersLiked: response.usersLiked,
          isLoading: false,
        });
      })
      .catch((err) => console.log("ERROR getting ARTWORK: ", err));
  };

  likeArtwork = () => {
    const { artwork, user } = this.state;
    likeArtwork({
      userId: user._id,
      artworkId: artwork._id,
    })
      .then((response) => {
        const { updatedUser, updatedArtwork } = response;
        this.setState({
          user: updatedUser,
          artworkId: updatedArtwork._id,
          artwork: updatedArtwork,
          usersLiked: updatedArtwork.usersLiked,
        });
      })
      .catch((err) => console.log("Error found: ", err));
  };

  toggleFullSize = (e) => {
    e.preventDefault();
    const view = this.state.fullSizeToggle === "hidden" ? "visible" : "hidden";
    this.setState({
      fullSizeToggle: view,
    });
  };

  render() {
    const { artwork, usersLiked, fullSizeToggle, isLoading } = this.state;
    console.log("THE ARTWORK: ", artwork);
    return (
      <div className="artwork-detail-page">
        {isLoading ? (
          <div className="spinner-card">
            <ReactLoading type={"spinningBubbles"} color={"#205586"} />
            <br />
            <p>
              <i>Loading artwork details...</i>
            </p>
            <br />
          </div>
        ) : (
          <>
            <div className="artwork-detail-img-block">
              <a href="#fullview" onClick={this.toggleFullSize}>
                <img
                  className="artwork-detail-img"
                  src={artwork.img}
                  alt={artwork.title}
                />
              </a>
              <a href="#fullview" onClick={this.toggleFullSize}>
                <div className={`fullsize-wrapper ${fullSizeToggle}`}>
                  <div
                    className="fullsize-img"
                    style={{ backgroundImage: `url(${artwork.img})` }}
                  />
                </div>
              </a>
            </div>
            <div className="artwork-detail-text-block">
              <div className="artwork-detail-text">
                <h1>{artwork.title}</h1>
                <h2>
                  {artwork.artist ? artwork.artist.name : "Artist unknown"}
                </h2>
                <h3>{artwork.artist && artwork.artist.nationality}</h3>
                <h4>About the artist:</h4>
                <p>
                  {artwork.artist && artwork.artist.bio
                    ? artwork.artist.bio
                    : "No further information"}
                </p>
                <h4>Medium:</h4>
                <p>{artwork.medium}</p>
                <h4>Date:</h4>
                <p>{artwork.date}</p>
                <h4>Held at:</h4> <p>{artwork.collectingInstitution}</p>
                <h2>
                  {artwork.usersLiked.length}{" "}
                  {artwork.usersLiked.length > 1 || usersLiked.length === 0
                    ? "likes"
                    : "like"}
                </h2>{" "}
                {!usersLiked.includes(this.state.user._id) ? (
                  <button
                    className="like-button-small"
                    onClick={this.likeArtwork}
                  >
                    <img src="/images/heart.png" alt="like-button" />
                  </button>
                ) : (
                  <img
                    className="liked-icon"
                    src="/images/heart.png"
                    alt="heart"
                  />
                )}
                <div className="button-container">
                  <Link
                    className="blue-button like"
                    to={{
                      pathname: `/${artwork.artworkId}/similar`,
                      state: {
                        title: artwork.title,
                      },
                    }}
                  >
                    Similar artworks
                  </Link>
                  {artwork.artist && (
                    <Link
                      className="blue-button like"
                      to={{
                        pathname: `/artist/${artwork.artist.artistId}`,
                        state: {
                          artist: artwork.artist.name,
                        },
                      }}
                    >
                      More by this artist
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

import React, { Component } from "react";
import { randomArtwork, addArtwork } from "../services/curatorService";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

class Curator extends Component {
  state = {
    isLoading: true,
    artwork: {},
    artists: [],
    image: "",
    user: this.props.user,
  };

  componentDidMount = () => {
    const apiToken = localStorage.getItem("apiToken");
    randomArtwork(apiToken)
      .then((response) => {
        const { artworkInfo, artistInfo, image } = response;
        console.log("Response: ", response);
        this.setState({
          isLoading: false,
          artwork: artworkInfo,
          artists: artistInfo,
          image,
        });
      })
      .catch((err) => console.log(err));
  };

  likeArtwork = () => {
    this.setState({
      isLoading: true,
    });
    const { artwork, artists, image, user } = this.state;
    addArtwork({ userId: user._id, artwork, artists, image })
      .then((response) => {
        console.log("Success!!", response);
        const apiToken = localStorage.getItem("apiToken");
        randomArtwork(apiToken).then((response) => {
          const { artworkInfo, artistInfo, image } = response;
          this.setState({
            isLoading: false,
            artwork: artworkInfo,
            artists: artistInfo,
            image,
          });
        });
      })
      .catch((err) => console.log("Error found: ", err));
  };

  dislikeArtwork = () => {
    this.setState({
      isLoading: true,
    });
    const apiToken = localStorage.getItem("apiToken");
    randomArtwork(apiToken)
      .then((response) => {
        const { artworkInfo, artistInfo, image } = response;
        this.setState({
          isLoading: false,
          artwork: artworkInfo,
          artists: artistInfo,
          image,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { title, date } = this.state.artwork;
    const image = this.state.image;
    const artists = this.state.artists;

    return (
      <div className="curator-card">
        <h1>Curator Page</h1>
        <br />
        {this.state.isLoading ? (
          <div className="spinner-card">
            <ReactLoading type={"spin"} color={"black"} />
            <br />
            <p>
              <i>Loading random artwork...</i>
            </p>
            <br />
            <p>
              <i>This may take a while...</i>
            </p>
          </div>
        ) : (
          <div className="artwork-card">
            <img className="curator-image" src={image} alt={title} />
            <h1>{title}</h1>
            {artists.map((artist, index) => (
              <h2 key={index}>
                {artist.name === "" ? "Unknown" : artist.name}
              </h2>
            ))}
            <h3>{date === "" ? "Date unknown" : date}</h3>
          </div>
        )}
        <div className="buttons">
          <button className="dislike-button" onClick={this.dislikeArtwork}>
            No
          </button>
          <button className="like-button" onClick={this.likeArtwork}>
            Yes
          </button>
        </div>
        <nav>
          <Link className="site-nav" to="/mostlikedworks">
            Most Liked
          </Link>
          <Link className="site-nav" to="/user">
            My Collection
          </Link>
        </nav>
      </div>
    );
  }
}

export default Curator;

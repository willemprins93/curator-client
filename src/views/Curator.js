import React, { Component } from "react";
import { randomArtwork, addArtwork } from "../services/curatorService";
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
        {this.state.isLoading ? (
          <div className="spinner-card">
            <ReactLoading type={"spin"} color={"#353831"} />
            <br />
            <p>
              <i>Loading random artwork...</i>
            </p>
            <br />
            <p>
              <i>One moment please...</i>
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
            <img src="/images/forward-button.png" alt="forward-button"></img>
          </button>
          <button className="like-button" onClick={this.likeArtwork}>
            <img src="/images/heart.png" alt="like-button" />
          </button>
        </div>
      </div>
    );
  }
}

export default Curator;

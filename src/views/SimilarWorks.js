import React, { Component } from "react";
import { addArtwork, similarArtworks } from "../services/curatorService";
import { getProfile } from "../services/authService";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

class SimilarWorks extends Component {
  state = {
    user: this.props.user,
    id: this.props.match.params.id,
    artworks: [],
    isLoading: true,
  };

  componentDidMount = () => {
    const id = this.state.id;
    const apiToken = localStorage.getItem("apiToken");
    similarArtworks({ apiToken, id })
      .then((data) => {
        this.setState({
          artworks: data.artworks,
          isLoading: false,
        });
        getProfile(this.props.user).then((response) => {
          this.setState({
            user: response,
          });
        });
      })
      .catch((err) => console.log(err));
  };

  likeArtwork = (artwork, image) => {
    const { user } = this.state;
    const apiToken = localStorage.getItem("apiToken");
    addArtwork({ userId: user._id, apiToken, artwork, image })
      .then((response) => {
        const updatedUser = response.updatedUser;
        getProfile(updatedUser).then((response) => {
          this.setState({
            user: response,
          });
        });
      })
      .catch((err) => console.log("error found: ", err));
  };

  render() {
    const { user, artworks, isLoading } = this.state;
    const likedIds = user.artworksLiked.map((artwork) => {
      return artwork.artworkId;
    });
    const { title } = this.props.location.state;
    return (
      <div className="similar-artworks-container">
        <h2>
          <i style={{ fontWeight: 300, color: "black" }}>
            Artworks similar to{" "}
          </i>
          {title}
        </h2>
        {isLoading ? (
          <div className="spinner-card">
            <ReactLoading type={"spinningBubbles"} color={"#205586"} />
            <br />
            <p>
              <i>Finding similar artworks...</i>
            </p>
          </div>
        ) : (
          <div className="similar-artwork-list">
            {artworks.map((artwork) => {
              let imageLinkTemplate = artwork._links.image.href;
              let version = 0;
              artwork.image_versions.indexOf("large") >= 0
                ? (version = artwork.image_versions.indexOf("large"))
                : artwork.image_versions.indexOf("normalized") >= 0
                ? (version = artwork.image_versions.indexOf("normalized"))
                : (version = 0);

              const image = imageLinkTemplate.replace(
                "{image_version}",
                artwork.image_versions[version]
              );
              return (
                <div className="similar-artwork-card">
                  <div className="similar-artwork-image-box">
                    <h1 className="mini-title">
                      {artwork.title}
                      <br />
                      <p>{artwork.date ? artwork.date : "Date unknown"}</p>
                      {likedIds.includes(artwork.id) ? (
                        <>
                          <img
                            className="liked-icon"
                            src="/images/heart.png"
                            alt="heart"
                          />
                          <br />
                          <Link
                            className="white-button"
                            to={`/artwork/${
                              user.artworksLiked.filter(
                                (work) => work.artworkId === artwork.id
                              )[0]._id
                            }`}
                          >
                            Read more
                          </Link>
                        </>
                      ) : (
                        <button
                          className="like-button-small"
                          onClick={() => this.likeArtwork(artwork, image)}
                        >
                          <img src="/images/heart.png" alt="like-button" />
                        </button>
                      )}
                    </h1>
                    <img
                      className="similar-artwork-image"
                      src={image}
                      alt={artwork.title}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default SimilarWorks;

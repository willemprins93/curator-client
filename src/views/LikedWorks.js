import React, { Component } from "react";
import { getAllWorks } from "../services/curatorService";
import { Link } from "react-router-dom";

export default class LikedWorks extends Component {
  state = {
    artworks: [],
  };
  componentDidMount = () => {
    getAllWorks()
      .then((artworks) => {
        const sorted = artworks.sort((a, b) => {
          return b.usersLiked.length - a.usersLiked.length;
        });
        this.setState({
          artworks: sorted,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="most-liked-list">
        {this.state.artworks.map((artwork, index) => {
          return (
            <div className="mostliked-listing">
              <div>
                <h1 id="rating">{index + 1}.</h1>
              </div>
              <div key={artwork._id} className="mostliked-image-box">
                <Link
                  className="most-liked-link"
                  to={`/artwork/${artwork._id}`}
                >
                  <img src={artwork.img} alt={artwork.title} />
                  <h1>{artwork.title}</h1>
                  <h4>
                    <i>{artwork.artist.name}</i>
                  </h4>
                  <br />
                  <h1>
                    {artwork.usersLiked.length}{" "}
                    {artwork.usersLiked.length > 1 ||
                    artwork.usersLiked.length === 0
                      ? "likes"
                      : "like"}
                  </h1>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

import React, { Component } from "react";
import { getAllWorks } from "../services/curatorService";
import { Link } from "react-router-dom";

export default class LikedWorks extends Component {
  state = {
    works: [],
  };
  componentDidMount = () => {
    getAllWorks()
      .then((works) => {
        const sorted = works.sort((a, b) => {
          return b.usersLiked.length - a.usersLiked.length;
        });
        this.setState({
          works: sorted,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="most-liked-list">
        {this.state.works.map((work, index) => {
          return (
            <div className="mostliked-listing">
              <div>
                <h1 id="rating">{index + 1}.</h1>
              </div>
              <div key={work._id} className="mostliked-image-box">
                <Link className="most-liked-link" to={`/artwork/${work._id}`}>
                  <img src={work.img} alt={work.title} />
                  <h1>{work.title}</h1>
                  <h4>
                    <i>{work.artist}</i>
                  </h4>
                  <br />
                  <h1>
                    {work.usersLiked.length}{" "}
                    {work.usersLiked.length > 1 || work.usersLiked.length === 0
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

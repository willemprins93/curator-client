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
      <div>
        {this.state.works.map((work) => {
          return (
            <div key={work._id} className="img-box">
              <Link to={`/artwork/${work._id}`}>
                <div>
                  <img src={work.img} alt={work.title} />
                  <h1>{work.title}</h1>
                  <h1>
                    {work.usersLiked.length}{" "}
                    {work.usersLiked.length > 1 || work.usersLiked.length === 0
                      ? "likes"
                      : "like"}
                  </h1>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

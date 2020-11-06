import React, { Component, useState, useEffect } from "react";
import { getProfile, logout } from "../services/authService";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const User = (props) => {
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    getProfile(user)
      .then((response) => {
        setUser(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    logout(accessToken)
      .then(() => {
        props.logout();
      })
      .catch((err) => console.log(err));
  };

  function mode(arr) {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  }

  const sortedWorks = [...user.artworksLiked].reverse();
  const favNationality = mode(
    user.artworksLiked
      .map((artwork) => artwork.artistNationality)
      .filter((nationality) => nationality !== "Nationality unknown")
  );
  const favArtist = mode(
    user.artworksLiked
      .map((artwork) => artwork.artist)
      .filter(
        (artist) => artist !== "Artist unknown" || artist !== "Artist Unknown"
      )
  );

  const username =
    user.name.length < 12
      ? user.name
      : [user.name.slice(0, 10) + "-", user.name.slice(10)];

  const isMobile = useMediaQuery({ query: "(max-width: 1200px)" });

  console.log(username);

  return (
    <div className="collection">
      <div className="collection-heading">
        <h1 className="name-heading">
          {isMobile ? (
            <>
              {typeof username === "string" ? (
                username
              ) : (
                <>
                  <span>{username[0]}</span>
                  <br />
                  <span>{username[1]}</span>
                </>
              )}
            </>
          ) : (
            user.name
          )}
          's
          <br />
          Collection
        </h1>
        <div className="analytics-heading">
          <h2 className="data-header">Most liked artist: </h2>
          <h2 className="data-content">{favArtist}</h2>
          <h2 className="data-header">Most liked artist nationality: </h2>
          <h2 className="data-content">{favNationality}</h2>
        </div>
      </div>
      <nav>
        <>
          <Link className="user-nav" to="/user/editprofile">
            Edit Info
          </Link>
        </>
        <>
          <Link className="user-nav" to="/user/editcollection">
            Edit Collection
          </Link>
        </>
        <>
          <Link className="user-nav danger" to="/" onClick={handleLogout}>
            Log Out
          </Link>
        </>
      </nav>
      <div className="image-list">
        {sortedWorks.map((artwork, index) => {
          return (
            <div className="image-box" key={index}>
              <Link to={`/artwork/${artwork._id}`}>
                <h1 className="mini-title">
                  {artwork.title}
                  <br />
                  <h4>
                    <i>{artwork.artist}</i>
                  </h4>
                  <p>{artwork.date}</p>
                </h1>
                <img
                  className="collection-image"
                  src={artwork.img}
                  alt={artwork.title}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default User;

import React, { useState, useEffect } from "react";
import { randomArtwork, addArtwork } from "../services/curatorService";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { useCallback } from "react";

const Curator = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [isMounted, setMount] = useState(true);
  const userId = props.user._id;

  const [artworks, setArtworks] = useState([]);
  const [apiToken, setApiToken] = useState("");

  const getRandom = () => {
    return randomArtwork(apiToken);
  };

  useEffect(() => {
    setApiToken(localStorage.getItem("apiToken"));
  }, []);

  const addArt = (res) => {
    if (isMounted && res !== undefined && artworks.length < 10 && !res.status) {
      setArtworks((a) => [...a, res]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiToken && artworks.length === 0 && isMounted) {
      getRandom()
        .then((res) => addArt(res))
        .catch(console.error);
      setTimeout(() => {
        if (artworks.length === 0)
          getRandom()
            .then((res) => addArt(res))
            .catch(console.error);
      }, 2500);
      setTimeout(() => {
        if (artworks.length === 0)
          getRandom()
            .then((res) => addArt(res))
            .catch(console.error);
      }, 5000);
    }
  }, [apiToken, isMounted]);

  useEffect(() => {
    if (artworks.length < 5) {
      getRandom()
        .then((res) => addArt(res))
        .catch(console.error);
    }
  }, [artworks]);

  useEffect(() => {
    return () => {
      setMount(false);
    };
  }, []);

  // useEffect(() => {
  //   console.log("LENGHT: ", artworks.length, "ISOMOUNTED: ", isMounted);
  //   if (artworks.length === 3 && artworks.length && isMounted) {
  //     const threePromises = [1, 1, 1].map(() => getRandom());
  //     threePromises[0].then((res) => addArt(res)).catch(console.error);
  //     threePromises[1].then((res) => addArt(res)).catch(console.error);
  //     threePromises[2].then((res) => addArt(res)).catch(console.error);
  //   }
  //   // return () => {
  //   //   setMount(false);
  //   // };
  // }, [artworks, isMounted]);

  // useEffect(() => {
  //   if (isLoading) {
  //     setLoading(false);
  //   }
  // }, [artworks[0]]);

  const likeArtwork = function () {
    const likedArtwork = artworks[0];
    setLoading(true);
    const newArr = [...artworks].filter(
      (work) => work.image !== likedArtwork.image
    );
    setArtworks(newArr);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    getRandom()
      .then((res) => addArt(res))
      .catch(console.error);
    addArtwork({
      userId,
      apiToken,
      artwork: likedArtwork.artworkInfo,
      image: likedArtwork.image,
    })
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  };

  const dislikeArtwork = function () {
    const dislikedArtwork = artworks[0];
    setLoading(true);
    const newArr = [...artworks].filter(
      (work) => work.image !== dislikedArtwork.image
    );
    setArtworks(newArr);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    getRandom()
      .then((res) => addArt(res))
      .catch(console.error);
  };

  return (
    <div className="curator-card">
      {artworks.length === 0 || isLoading ? (
        <div className="spinner-card">
          <ReactLoading type={"spinningBubbles"} color={"#205586"} />
          <br />
          <p>
            <i>Loading random artworks...</i>
          </p>
          <br />
          <p>
            <i>One moment please...</i>
          </p>
        </div>
      ) : (
        <div className="artwork-card">
          <img
            className="curator-image"
            src={artworks[0] && artworks[0].image}
            alt={artworks[0] && artworks[0].artworkInfo.title}
          />
          <h1>{artworks[0] && artworks[0].artworkInfo.title}</h1>
          <h3>
            {artworks[0] && artworks[0].artworkInfo.date === ""
              ? "Date unknown"
              : artworks[0] && artworks[0].artworkInfo.date}
          </h3>
          <Link
            className="blue-button like"
            to={{
              pathname: `/${artworks[0] && artworks[0].artworkInfo.id}/similar`,
              state: {
                title: artworks[0] && artworks[0].artworkInfo.title,
              },
            }}
          >
            Similar artworks
          </Link>
          {/* {artworks[0].artworkInfo._links.artists.href && (
            <Link
              className="blue-button like"
              to={{
                pathname: `/artist/${
                  artworks[0].artworkInfo._links.artists.href.split(
                    "artwork_id="
                  )[1]
                }`,
                state: {
                  artistLink: artworks[0].artworkInfo._links.artists.href,
                },
              }}
            >
              More by this artist
            </Link>
          )} */}
        </div>
      )}
      <div className="buttons">
        {isLoading ? (
          <>
            <button className="dislike-button">
              <img src="/images/forward-button.png" alt="forward-button"></img>
            </button>
            <button className="like-button">
              <img src="/images/heart.png" alt="like-button" />
            </button>
          </>
        ) : (
          <>
            <button className="dislike-button" onClick={dislikeArtwork}>
              <img src="/images/forward-button.png" alt="forward-button"></img>
            </button>
            <button className="like-button" onClick={likeArtwork}>
              <img src="/images/heart.png" alt="like-button" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Curator;

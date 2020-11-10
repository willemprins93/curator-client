import React, { useState, useEffect } from "react";
import { randomArtwork, addArtwork } from "../services/curatorService";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

const Curator = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [isMounted, setMount] = useState(true);
  const userId = props.user._id;

  const [artworks, setArtworks] = useState([]);
  const [apiToken, setApiToken] = useState("");

  const getRandom = () => {
    return randomArtwork(localStorage.getItem("apiToken"));
  };

  useEffect(() => {
    setApiToken(localStorage.getItem("apiToken"));
  }, []);

  useEffect(() => {
    if (apiToken && isMounted) {
      const fourPromises = [1, 1, 1, 1].map(() => getRandom());
      fourPromises[0]
        .then((res) => {
          if (isMounted) {
            console.log("RESULTT", res);

            setArtworks((a) => [...a, res]);
            setLoading(false);
          }
        })
        .catch(console.error);
      fourPromises[1]
        .then((res) => {
          console.log("RESULTT", res);

          if (isMounted) {
            setArtworks((a) => [...a, res]);
            setLoading(false);
          }
        })
        .catch(console.error);
      fourPromises[2]
        .then((res) => {
          console.log("RESULTT", res);

          if (isMounted) {
            setArtworks((a) => [...a, res]);
            setLoading(false);
          }
        })
        .catch(console.error);
      fourPromises[3]
        .then((res) => {
          console.log("RESULTT", res);

          if (isMounted) {
            setArtworks((a) => [...a, res]);
            setLoading(false);
          }
        })
        .catch(console.error);
    }
    return () => {
      setMount(false);
    };
  }, [apiToken, artworks]);

  useEffect(() => {
    if (artworks.length < 10 && isMounted) {
      const threePromises = [1, 1, 1].map(() => getRandom());
      threePromises[0]
        .then((res) => {
          console.log("RESULTT", res);
          if (isMounted) {
            setArtworks((a) => [...a, res]);
            setLoading(false);
          }
        })
        .catch(console.error);
      threePromises[1]
        .then((res) => {
          console.log("RESULTT", res);

          if (isMounted) {
            setArtworks((a) => [...a, res]);
            setLoading(false);
          }
        })
        .catch(console.error);
      threePromises[2]
        .then((res) => {
          if (isMounted) {
            console.log("RESULTT", res);

            setArtworks((a) => [...a, res]);
            setLoading(false);
          }
        })
        .catch(console.error);
    }
    return () => {
      setMount(false);
    };
  }, [artworks]);

  const likeArtwork = () => {
    const { artworkInfo, image } = artworks[0];
    setLoading(true);
    setArtworks(artworks.slice(1));
    setTimeout(() => {
      setLoading(false);
    }, 1200);
    addArtwork({
      userId,
      apiToken,
      artwork: artworkInfo,
      image,
    })
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  };

  const dislikeArtwork = () => {
    setLoading(true);
    setArtworks(artworks.slice(1));
    setTimeout(() => {
      setLoading(false);
    }, 1200);
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

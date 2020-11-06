import React, { useState, useEffect } from "react";
import { randomArtwork, addArtwork } from "../services/curatorService";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

const Curator = (props) => {
  const [isLoading, setLoading] = useState(true);
  const userId = props.user._id;

  const [artworks, setArtworks] = useState([]);
  const [apiToken, setApiToken] = useState("");

  const getRandom = () => {
    return randomArtwork(apiToken);
  };

  useEffect(() => {
    setApiToken(localStorage.getItem("apiToken"));
  }, []);

  useEffect(() => {
    if (apiToken && artworks.length === 0) {
      const fourPromises = [1, 1, 1, 1].map(() => getRandom());
      fourPromises[0]
        .then((res) => {
          console.log("1");
          setArtworks((a) => [...a, res]);
          setLoading(false);
        })
        .catch(console.error);
      fourPromises[1]
        .then((res) => {
          console.log("2");
          setArtworks((a) => [...a, res]);
          setLoading(false);
        })
        .catch(console.error);
      fourPromises[2]
        .then((res) => {
          console.log("3");
          setArtworks((a) => [...a, res]);
          setLoading(false);
        })
        .catch(console.error);
      fourPromises[3]
        .then((res) => {
          console.log("3");
          setArtworks((a) => [...a, res]);
          setLoading(false);
        })
        .catch(console.error);
      // Promise.all(threePromises)
      //   .then((res) => {
      //     //array of three promises
      //     console.log(res);
      //     setArtwork(res[0]);
      //     setNext([res[1], res[2]]);
      //     setLoading(false);
      //   })
      //   .catch(console.error);
    }
  }, [apiToken, artworks]);

  useEffect(() => {
    if (artworks.length < 10 && artworks.length !== 0) {
      const threePromises = [1, 1, 1].map(() => getRandom());
      threePromises[0]
        .then((res) => {
          setArtworks((a) => [...a, res]);
          setLoading(false);
        })
        .catch(console.error);
      threePromises[1]
        .then((res) => {
          setArtworks((a) => [...a, res]);
          setLoading(false);
        })
        .catch(console.error);
      threePromises[2]
        .then((res) => {
          setArtworks((a) => [...a, res]);
          setLoading(false);
        })
        .catch(console.error);
    }
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

  // return <></>;

  // likeArtwork = () => {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const { artwork, image, user } = this.state;
  //   const apiToken = localStorage.getItem("apiToken");
  //   addArtwork({ userId: user._id, apiToken, artwork, image })
  //     .then((response) => {
  //       console.log("Success!!", response);
  //       const apiToken = localStorage.getItem("apiToken");
  //       randomArtwork(apiToken).then((response) => {
  //         const { artworkInfo, image } = response;
  //         this.setState({
  //           isLoading: false,
  //           artwork: artworkInfo,
  //           image,
  //         });
  //       });
  //     })
  //     .catch((err) => console.log("Error found: ", err));
  // };

  // dislikeArtwork = () => {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const apiToken = localStorage.getItem("apiToken");
  //   randomArtwork(apiToken)
  //     .then((response) => {
  //       const { artworkInfo, image } = response;
  //       this.setState({
  //         isLoading: false,
  //         artwork: artworkInfo,
  //         image,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const { title, date, id } = artwork.artworkInfo;
  // const { image } = artwork.image;

  return (
    <div className="curator-card">
      {artworks.length === 0 || isLoading ? (
        <div className="spinner-card">
          <ReactLoading type={"spinningBubbles"} color={"#596b40"} />
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

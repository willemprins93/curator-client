import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
});

export const randomArtwork = (apiToken) => {
  return service
    .get(`/artwork/${apiToken}/random`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const similarArtworks = ({ apiToken, id }) => {
  console.log("banana");
  return service
    .get(`artwork/${apiToken}/${id}/similar`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const addArtwork = ({ userId, apiToken, artwork, image }) => {
  return service
    .post(`/artwork/add`, { userId, apiToken, artwork, image })
    .then((response) => response.data)
    .catch((err) => err);
};

export const likeArtwork = ({ userId, artworkId }) => {
  return service
    .post(`artwork/addliked`, { userId, artworkId })
    .then((response) => response.data)
    .catch((err) => err);
};

export const getArtwork = (id) => {
  return service
    .get(`artwork/liked/${id}`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const artworkDetails = (id) => {
  return service
    .get(`artwork/single/${id}`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const editCollection = ({ userId, artworksLiked, artworksRemoved }) => {
  return service
    .post("auth/user/editCollection", {
      userId,
      artworksLiked,
      artworksRemoved,
    })
    .then((response) => response)
    .catch((err) => err);
};

export const getAllWorks = () => {
  return service
    .get(`artwork/liked`)
    .then((response) => response.data)
    .catch((err) => err);
};

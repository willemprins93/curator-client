import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
});

export const searchArt = ({ apiToken, query }) => {
  console.log("query? ", query);
  return service
    .get(`/artwork/${apiToken}/search/${query}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => err.response);
};

export const getArtwork = (id) => {
  console.log("trying to get artwork with id: ", id);
  return service
    .get(`/artwork/liked/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => err.response);
};

export const randomArtwork = (apiToken) => {
  return service
    .get(`/artwork/${apiToken}/random`)
    .then((response) => {
      console.log("RESPONSE on the RandomArtwork", response);
      return response.data;
    })
    .catch((err) => {
      console.log("ERROR on the RandomArtwork", err.response);
      return err.response;
    });
};

export const similarArtworks = ({ apiToken, id }) => {
  return service
    .get(`/artwork/${apiToken}/${id}/similar`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const getArtistWorks = ({ apiToken, id }) => {
  return service
    .get(`/artwork/${apiToken}/artist/${id}`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const getMore = ({ apiToken, url }) => {
  return service
    .post(`/artwork/${apiToken}/more`, { url })
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
    .post(`/artwork/addliked`, { userId, artworkId })
    .then((response) => response.data)
    .catch((err) => err);
};

export const editCollection = ({ userId, artworksLiked, artworksRemoved }) => {
  return service
    .post("/auth/user/editCollection", {
      userId,
      artworksLiked,
      artworksRemoved,
    })
    .then((response) => response)
    .catch((err) => err);
};

export const getAllWorks = () => {
  return service
    .get(`/artwork/liked`)
    .then((response) => response.data)
    .catch((err) => err);
};

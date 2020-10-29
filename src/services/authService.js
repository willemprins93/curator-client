import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
});

export const getProfile = (user) => {
  return service
    .post("/auth/user/profile", { userId: user._id })
    .then((response) => response.data)
    .catch((err) => {
      console.log("The error in the services: ", err);
    });
};

export const editUser = ({ userId, name, email }) => {
  return service
    .post("/auth/user/edit", { userId, name, email })
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};

export const validateSession = (accessToken) => {
  return service
    .get(`/auth/user/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const signup = ({ name, email, password }) => {
  return service
    .post("/auth/signup", { name, email, password })
    .then((response) => response.data)
    .catch((err) => err);
};

export const login = ({ email, password }) => {
  return service
    .post("/auth/login", { email, password })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

export const logout = (accessToken) => {
  return service
    .post("auth/logout", { accessToken })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

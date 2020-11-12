import React from "react";
import { signup } from "../services/authService";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: "",
    isLoading: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    signup({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    })
      .then(
        (response) => (
          this.setState({
            isLoading: false,
          }),
          response.accessToken
            ? (localStorage.setItem("accessToken", response.accessToken),
              localStorage.setItem("apiToken", response.apiToken),
              this.props.authenticate(response.user),
              this.props.history.push("/"))
            : this.setState({
                errorMessage: response.errorMessage,
              })
        )
      )
      .catch(
        (err) => (
          this.setState({
            isLoading: false,
          }),
          console.log(err)
        )
      );
  };

  render() {
    const { name, email, password, errorMessage, isLoading } = this.state;
    return (
      <div className="form-page">
        {isLoading ? (
          <div className="spinner-card">
            <ReactLoading type={"spinningBubbles"} color={"#205586"} />
            <br />
            <p>
              <i>Signing up...</i>
            </p>
            <br />
          </div>
        ) : (
          <>
            <form onSubmit={this.handleSubmit}>
              <label>Name: </label>
              <input
                name="name"
                value={name}
                onChange={this.handleChange}
                required={true}
                type="text"
              />
              <label>Email: </label>
              <input
                name="email"
                value={email}
                onChange={this.handleChange}
                required={true}
                type="email"
              />
              <label>Password: </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
                required={true}
              />
              <button type="submit"> Sign Up </button>
            </form>
            <div className="auth-mini-nav">
              <Link className="auth-nav" to="/">
                {"Home"}
              </Link>
              <Link className="auth-nav" to="/login">
                {"Log In"}
              </Link>
            </div>
            {errorMessage !== "" && (
              <h4 className="error-message">
                <i>{errorMessage}</i>
              </h4>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Signup;

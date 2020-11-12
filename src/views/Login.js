import React from "react";
import { login } from "../services/authService";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
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
    this.setState({ isLoading: true });
    login({
      email: this.state.email,
      password: this.state.password,
    })
      .then(
        (response) => (
          this.setState({ isLoading: false }),
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
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log("in the error");
        console.log(err);
      });
  };

  render() {
    const { email, password, errorMessage, isLoading } = this.state;
    return (
      <div className="form-page">
        {isLoading ? (
          <div className="spinner-card">
            <ReactLoading type={"spinningBubbles"} color={"#205586"} />
            <br />
            <p>
              <i>Logging in...</i>
            </p>
            <br />
          </div>
        ) : (
          <>
            <form onSubmit={this.handleSubmit}>
              <label>Email: </label>
              <input
                name="email"
                value={email}
                onChange={this.handleChange}
                required={true}
                type="email"
                autoComplete="off"
              />
              <label>Password: </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
                required={true}
                autoComplete="off"
              />
              <button type="submit"> Log In </button>
            </form>
            <div className="auth-mini-nav">
              <Link className="auth-nav" to="/">
                {"Home"}
              </Link>
              <Link className="auth-nav" to="/signup">
                {"Sign Up"}
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

export default Login;

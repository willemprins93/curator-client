import React from "react";
import { signup } from "../services/authService";

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    signup({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) =>
        response.accessToken
          ? (localStorage.setItem("accessToken", response.accessToken),
            localStorage.setItem("apiToken", response.apiToken),
            this.props.authenticate(response.user),
            this.props.history.push("/"))
          : this.setState({
              errorMessage: response.errorMessage,
            })
      )
      .catch((err) => console.log(err));
  };

  render() {
    const { name, email, password, errorMessage } = this.state;
    return (
      <div>
        {errorMessage !== "" && errorMessage}
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
          <button type="submit"> Sign up </button>
        </form>
      </div>
    );
  }
}

export default Signup;

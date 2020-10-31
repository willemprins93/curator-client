import React, { Component } from "react";
import { editUser } from "../services/authService";

export default class EditUser extends Component {
  state = {
    name: this.props.user.name,
    email: this.props.user.email,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    editUser({
      userId: this.props.user._id,
      name: this.state.name,
      email: this.state.email,
    })
      .then((response) => {
        this.props.authenticate(response.data.user);
        this.props.history.push("/user");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { name, email } = this.state;
    return (
      <div className="form-page">
        <form onSubmit={this.handleSubmit}>
          <label>Edit name: </label>
          <input
            name="name"
            value={name}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <label>Edit email: </label>
          <input
            name="email"
            value={email}
            onChange={this.handleChange}
            required={true}
            type="email"
          />
          <button type="submit"> Save </button>
        </form>
      </div>
    );
  }
}

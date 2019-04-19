import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { email, password },
      url: '/api/users/login'
    };
    try {
      const result = await axios(options);
      if (result.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(result.error);
        throw error;
      }
    } catch (error) {
      console.error(error);
      alert('Error logging in please try again');
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login;

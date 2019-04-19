import React, { Component } from 'react';
import axios from 'axios';

class Verification extends Component {
  state = {
    code: '',
    to: ''
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    const { to, code } = this.state;
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: { to, code },
      url: '/api/users/verification'
    };
    try {
      const result = await axios(options);
      if (result.status === 200) {
        alert('Verification success');
        console.log(result);
      } else {
        const error = new Error(result.error);
        throw error;
      }
    } catch (error) {
      console.error(error);
      alert('Incorrect verification, try again');
    }
  };

  componentDidMount() {
    const to = this.props.location.pathname.split('/')[2];
    this.setState({
      to
    });
  }

  render() {
    console.log(this.props.location.pathname.split('/')[2]);
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Send a verification Message</h1>
        <label htmlFor="code">Type the verification code sent.</label>
        <input
          type="number"
          name="code"
          placeholder="Enter code"
          value={this.state.code}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Verification;

import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class MyInput extends Component {
  state = {
    to: '',
    loading: false,
    redirect: false
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    const { to } = this.state;

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { to },
      url: 'api/users/sendsms'
    };
    let result;
    try {
      this.setState({
        loading: true
      });
      result = await axios(options);
      if (result.status === 201) {
        console.log(result);
        alert(result.data.message);
        this.setState({
          loading: false,
          redirect: true
        });
      } else {
        console.log(result);
        alert(`Error sending the message, try again ${result.message}`);
      }
    } catch (error) {
      this.setState({
        loading: false,
        redirect: false
      });
      console.error(error);
      console.error(result);
      alert(`Error in request, try again`);
    }
  };

  render() {
    const { loading, redirect } = this.state;
    if (loading) {
      return <div>Working ...</div>;
    }
    if (redirect) {
      return <Redirect to={`/verification/${this.state.to}`} />;
    }

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Send a verification Message</h1>
        <label htmlFor="email">
          Type the cell number to send the verification code
        </label>
        <input
          type="tel"
          name="to"
          placeholder="Enter a cell number"
          value={this.state.to}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default MyInput;

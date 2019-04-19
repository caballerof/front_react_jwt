import React, { Component } from 'react';
import axios from 'axios';

export class Private extends Component {
  state = {
    numbers: ''
  };

  async componentDidMount() {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      url: '/api/users/numbers'
    };
    try {
      const result = await axios(options);
      if (result.status === 200) {
        alert('Verification success');
        this.setState({
          numbers: String(result.data.result)
        });
        console.log(result.data.result);
      } else {
        const error = new Error(result.error);
        throw error;
      }
    } catch (error) {
      console.error(error);
      alert('We can not get the info');
    }
  }

  render() {
    const { numbers } = this.state;
    return (
      <div>
        <div>Private page, you have a login!</div>
        <br />
        <br />
        <div>{numbers}</div>
        <br />
        <button onClick={this.props.logoutHandler}>Logout</button>
      </div>
    );
  }
}

export default Private;

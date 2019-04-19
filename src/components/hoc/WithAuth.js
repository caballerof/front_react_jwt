import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const WithAuth = ComponentToProtect => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }

    logoutHandler = async () => {
      try {
        const result = await axios.get('api/users/logout');
        console.log(result);
      } catch (error) {
        console.error(error);
        alert('Error on logout =(');
      } finally {
        this.setState({ loading: false, redirect: true });
      }
    };

    componentDidMount() {
      fetch('/api/users/login')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect
            logoutHandler={this.logoutHandler}
            {...this.props}
          />
        </React.Fragment>
      );
    }
  };
};

export default WithAuth;

import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import Private from './components/Private';
import WithAuth from './components/hoc/WithAuth';
import Verification from './components/verificationSMS/Verification';

class App extends Component {
  state = {
    message: ''
  };

  async componentDidMount() {
    const result = await axios('/api/users/test');
    this.setState({
      message: result.data.message
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          Your do not tell your dreams, show them <p>{this.state.message}</p>{' '}
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/private">Private</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/private" component={WithAuth(Private)} />
          <Route path="/verification" component={Verification} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

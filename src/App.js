import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import api from './services/api';

import NavBar from './NavBar';
import Login from './Login';
import NewUser from './NewUser'
import Main from './Main'

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      cases: []
    }
  }
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      api.auth.getCurrentUser()
        .then(resp => {
          this.setState({
            user: {...resp.user}
          })
      })
      fetch('http://localhost:3001/cases', {
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          cases: json
        })
      })
      this.props.history.push('/main')
      //end of IF TOKEN TRUE  
    } else {
      console.log('Nothing in localStorage')
    }
  }

  // setCurrentUser passed to Login & NewUser components 
  setCurrentUser = (user) => { this.setState({user}) }

  //setCases = (cases) => { this.setState({cases}) }

  logOut = () => {
    localStorage.removeItem('token');
    this.setState({ 
      user: null,
    });
    this.props.history.push('/')
  };


  render() {
    const { cases, user } = this.state
    return (
      <Fragment>

        <Route
          path='/'
          render={routerProps => {
            return (
              <Fragment>
                <NavBar {...routerProps} />
              </Fragment>
            );
          }}
        />

        <br /><p />

        <Route
          path="/signup"
          render={routerProps => {
            return (
              <Fragment>
                <NewUser {...routerProps} 
                  setCases={this.setCases}
                  setCurrentUser={this.setCurrentUser} />
              </Fragment>
            );
          }}
        />

        <Route
          path="/login"
          render={routerProps => {
            return (
              <Fragment>
                <Login {...routerProps} 
                  setCases={this.setCases}
                  setCurrentUser={this.setCurrentUser} />
              </Fragment>
            );
          }}
        />

        <Route
          path="/main"
          render={routerProps => {
            return (
              <Fragment>
                <Main cases={cases} {...user} {...routerProps} />
              </Fragment>
            );
          }}
        />

        <button onClick={this.logOut}>LOGOUT</button>
      </Fragment>
    );
  }
}

export default withRouter(App);
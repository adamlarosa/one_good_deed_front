import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import NavBar from './NavBar';
import api from './services/api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }


  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      api.auth.getCurrentUser()
        .then(resp => {
          console.log('LocalStorge thinks user is: ', resp.user.fullname)
          this.setState({
            currentUser: resp.user.id
          })
      })
    } else {
      console.log('Nothing in localStorage')
    }
  }


  setCurrentUser = (user) => {
    this.setState({
      currentUser: user
    })
  }

  render() {
    console.log('Application thinks userId is: ', this.state.currentUser)
    return (
      <div >
        <NavBar /><br />
        <Login setCurrentUser={this.setCurrentUser} />
      </div>
    );
  }
}

export default App;
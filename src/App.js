import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import api from './services/api';
import NavBar from './NavBar';
import Login from './Login';
import NewUser from './NewUser'
import Main from './Main'
import FrontPage from './FrontPage'

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
          console.log('didmountGetCurrentUser:', resp)
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





  setCurrentUser = (user) => {
    console.log('let see what this is',user)
    this.setState({user: user.user, cases: user.cases})
    this.props.history.push('/main')
  }




  // addToCases passed to Main
  addToCases = (newCase) => {
    let newCases = [...this.state.cases, newCase]
    this.setState({cases: newCases}) 
  }

  // passed to Main to DrawCases to CaseCard
  deleteCase = (id) => {
    let newCases = [...this.state.cases]
    let index = newCases.map((newCase) => newCase.id).indexOf(id)
    newCases.splice(index, 1)
    this.setState({cases: newCases})
  }

  logOut = () => {
    localStorage.removeItem('token');
    this.setState({ 
      user: null,
      cases: []
    });
    this.props.history.push('/')
  };

  render() {
    console.log('App.js STATE:', this.state)
    const { cases, user } = this.state

    return (
      <div className='App'>
    

        <Route
          path='/'
          render={routerProps => {
            return (
              <Fragment>
                <NavBar user={this.state.user} logOut={this.logOut} {...routerProps} />
              </Fragment>
            );
          }}
        />

        <br /><p />
        
        <Route
          exact path="/signup"
          render={routerProps => {
            return (
              <Fragment>
                <NewUser {...routerProps} 
                  setCurrentUser={this.setCurrentUser} />
              </Fragment>
            );
          }}
        />

        <Route
          exact path="/login"
          render={routerProps => {
            return (
              <Fragment>
                <Login {...routerProps} 
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
                <Main
                  deleteCase={this.deleteCase}
                  addToCases={this.addToCases} 
                  cases={cases} 
                  {...user} 
                  {...routerProps} 
                />
              </Fragment>
            );
          }}
        />
        { !this.state.user && <FrontPage /> }
      
      </div>    
    );//end of return
  }//end of render()
}

export default withRouter(App);
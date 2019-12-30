import React, { Component, Fragment } from 'react'
import api from './services/api';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.props.history.push('/main')
        }
    }

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitForm = (e) => {
        e.preventDefault();
        const { username, password } = this.state
        api.auth.login(username, password)
        .then(resp => {
            if (!resp.message) {
                console.log('Login: ',resp)
                localStorage.setItem('token', resp.jwt)
                this.props.setCurrentUser(resp) //passed from App.js
                this.props.history.push('/main')
            } else {
                alert(resp.message)
                console.log('Login: ',resp)
            }
        })
    }

    //only used to test login - DERP BUTTON
    fetchUser = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:3001/api/v1/profile', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(json => !json.message ? console.log(json.user) : console.log(json))
    }

    render() {
        const { inputChange } = this
        return (
            <Fragment>
                <form>
                    <label>
                        Username:
                        <input onChange={(e) => inputChange(e)} type="text" name="username" />
                    </label><br />
                    <label>
                        Password:
                        <input onChange={(e) => inputChange(e)} type="password" name="password" />
                    </label><br/>
                    <input onClick={(e) => this.submitForm(e)} type="submit" value="LOGIN" />
                </form>

                {/* BEGIN LOGIN TEST */}
                <button onClick={this.fetchUser}>DERP!</button><br/>
                {/* END LOGIN TEST */}

            </Fragment>
        )
    }
}
export default Login
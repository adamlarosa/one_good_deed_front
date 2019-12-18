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
                console.log(resp)
                localStorage.setItem('token', resp.jwt)
                this.props.setCurrentUser(resp.user.id) //passed from App.js
            })

        // fetch('http://localhost:3001/api/v1/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Accept: 'application/json',
        //     },
        //     body: JSON.stringify({
        //         user: {
        //             username: this.state.username,
        //             password: this.state.password
        //         }
        //     })
        // })
        // .then(resp => resp.json())
        // .then(json => {
        //     if (json.message) {
        //         console.log(json.message)
        //     } else {
        //         localStorage.setItem('token', json.jwt)
        //         this.props.setCurrentUser(json.user.id) //passed from App.js
        //     }
        // })
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
        .then(json => !json.message ? console.log('User: ', json.user.fullname) : console.log(json))
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
                <button onClick={this.fetchUser}>DERP!</button>
                {/* END LOGIN TEST */}

            </Fragment>
        )
    }
}
export default Login
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
                localStorage.setItem('token', resp.jwt)
                console.log('LOGIN', resp)
                this.props.setCurrentUser(resp) //passed from App.js
                this.props.history.push('/main')

            } else {
                alert(resp.message)
            }
        })
    }

    render() {
        const { inputChange, submitForm } = this
        return (
            <Fragment>
                <form className='userLogin'>
                    <label>
                        Username:
                        <input onChange={(e) => inputChange(e)} type="text" name="username" />
                    </label><br />
                    <label>
                        Password:
                        <input onChange={(e) => inputChange(e)} type="password" name="password" />
                    </label><br/>
                    <input onClick={(e) => submitForm(e)} type="submit" value="LOGIN" />
                </form>
            </Fragment>
        )
    }
}
export default Login
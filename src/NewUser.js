import React, { Component } from 'react';
import api from './services/api';
import './NewUser.css'

class NewUser extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            confirmPassword: !null,
            fullname: null,
            about: null
        }
    }

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        const { username, password, fullname, about } = this.state
        api.auth.create(fullname, username, password, about)
            .then(resp => {
                if (resp.error) {
                    alert(resp.messages)
                } else {
                    localStorage.setItem('token', resp.jwt)
                    this.props.setCurrentUser(resp) //passed from App.js
                    this.props.history.push('/main')
                }
            })
    }

    render() {
        
        const { inputChange } = this;
        return (
            <div className='newUser-wrapper'>
                <form className='newUser-form'>

                    <label>
                        Username:
                        <input 
                            onChange={(e) => inputChange(e)} 
                            type="text" 
                            name="username" 
                        />
                    </label><br />

                    <label>
                        Password:
                        <input 
                            onChange={(e) => inputChange(e)} 
                            type="password" 
                            name="password" 
                        />
                    </label><br/>

                    <label>
                        Confirm Password:
                        <input 
                            onChange={(e) => inputChange(e)} 
                            type="password" 
                            name="confirmPassword" 
                        />
                    </label><br/>

                    <label>
                        Full Name:
                        <input 
                            onChange={(e) => inputChange(e)} 
                            type="text" 
                            name="fullname" 
                        />
                    </label><br/>

                    <label>
                        About Yourself:
                        <input 
                            onChange={(e) => inputChange(e)} 
                            type="text" 
                            name="about" 
                        />
                    </label><br/>
                    <p />
                    {this.state.password === this.state.confirmPassword ? 
                        <input 
                            onClick={(e) => this.submitForm(e)} 
                            type="submit" 
                            value="CREATE" 
                        />
                    :
                        'Passwords do not match'
                    }
                </form>

            </div>
        )
    }
}
export default NewUser
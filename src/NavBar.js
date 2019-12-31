import React, { Component } from 'react'
import './NavBar.css'

class NavBar extends Component {

    render() {
        return (
            <div className='navbar'>
                <div className='navbar-left'>
                    {!this.props.user ?
                        <button 
                            onClick={() => this.props.history.push('/signup') }
                        >
                            NEW USER
                        </button>
                    :
                        null
                    }

                </div>
                <div className='navbar-right'>
                    {!this.props.user ?
                        <button 
                            onClick={() => this.props.history.push('/login') }
                        >
                            SIGN IN
                        </button>
                    :
                        <button
                            onClick={() => this.props.logOut()}
                        >
                            LOGOUT
                        </button>
                    }

                </div>
            </div>
        )
    }
}
export default NavBar
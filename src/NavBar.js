import React, { Component } from 'react'
import './NavBar.css'

class NavBar extends Component {

    render() {
        return (
            <div className='navbar'>
                <div className='navbar-left'>
                    <button onClick={() => this.props.history.push('/signup') }>NEW USER</button>
                </div>
                <div className='navbar-right'>
                    <button onClick={() => this.props.history.push('/login') }>SIGN IN</button>
                </div>
            </div>
        )
    }
}
export default NavBar
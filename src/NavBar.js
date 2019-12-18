import React, { Component } from 'react'
import './NavBar.css'

class NavBar extends Component {

    render() {
        return (
            <div className='navbar'>
                <div className='navbar-left'>
                    LEFT!
                </div>
                <div className='navbar-right'>
                    RIGHT!
                </div>
            </div>
        )
    }
}
export default NavBar
import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"


class NavBar extends Component {
    render() {
        return (
            
            <nav >
                <ul >
                    <li >
                        <Link  to="/day">Day</Link>
                    </li>
                    <li >
                        <Link  to="/month">Month</Link>
                    </li>
                    <li >
                        <Link  to="/year">Year</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar
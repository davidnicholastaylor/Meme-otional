import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"


class NavBar extends Component {
    render() {
        return (
            
            <nav >
                <ul >
                    <li >
                        <Link  to="/days">Day</Link>
                    </li>
                    <li >
                        <Link  to="/months">Month</Link>
                    </li>
                    <li >
                        <Link  to="/years">Year</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar
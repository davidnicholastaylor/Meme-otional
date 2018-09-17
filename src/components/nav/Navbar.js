import { Redirect  } from 'react-router-dom'
import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"


class NavBar extends Component {
    // logout = () => {
    //     sessionStorage.removeItem("credentials")
    //     return <Redirect to ="/login" />
    //   }
    state = {
        logout: false
    }

    logoutUser = () => {
        this.setState({logout: true})
        sessionStorage.removeItem("credentials")
    }
    render() {
        return (
            <nav >
                { this.state.logout === false &&
                <ul >
                    <li >
                        <Link  to="/days">Day</Link>
                    </li>
                    <li >
                        <Link  to="/charts">Charts</Link>
                    </li>
                    <button onClick={this.logoutUser}>Logout</button>
                </ul>

            }
            { this.state.logout === true &&
            <div>
                {this.setState({logout: false})}
                <Redirect to="/login" />
                </div>
            }
            </nav>
        )
    }
}

export default NavBar
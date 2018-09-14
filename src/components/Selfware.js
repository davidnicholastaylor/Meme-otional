import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Navbar from "./nav/Navbar"
import AppViews from "./AppViews"
import login from "./Login"


class Selfware extends Component {
    
    render() {
        return (
            <React.Fragment>
                <div>
                    
                    <Navbar />
                    <AppViews />
                </div>
            </React.Fragment>
        )
    }
}

export default Selfware
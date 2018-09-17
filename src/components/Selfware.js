import React, { Component } from "react"
import Navbar from "./nav/Navbar"
import AppViews from "./AppViews"



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
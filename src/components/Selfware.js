import React, { Component } from "react"
import AppViews from "./AppViews"
import { Button, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Link } from "react-router-dom"



export default class Selfware extends Component {


    render() {

        return (
            <React.Fragment>
                <AppViews />
            </React.Fragment>
        )
    }
}

{/* { sessionStorage.key("credentials") !== null &&
<Navbar />
} */}
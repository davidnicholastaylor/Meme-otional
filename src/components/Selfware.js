import React, { Component } from "react"
import AppViews from "./AppViews"
import { Button, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Link } from "react-router-dom"



export default class Selfware extends Component {

    state = { 
        visible: false, 
        logout: false
    }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })

    handleSidebarHide = () => this.setState({ visible: false })

    logoutUser = () => {
                this.setState({logout: true})
                sessionStorage.removeItem("credentials")
                
            }

    render() {
        const { visible } = this.state

        return (
            <React.Fragment>
                <div>
                    {this.state.logout === false &&
                        <div>
                            { sessionStorage.key("credentials") !== null &&
                            <div>
                            <Button circular icon="sidebar" onClick={this.handleButtonClick} />
                            <Button as={Link} to='/login' floated="right" circular  onClick={this.logoutUser}>Logout</Button>
                            </div>
                            }
                            <Sidebar.Pushable as={Segment}>
                                <Sidebar
                                    as={Menu}
                                    animation='overlay'
                                    icon='labeled'
                                    inverted
                                    onHide={this.handleSidebarHide}
                                    vertical
                                    visible={visible}
                                    width='thin'>
                                    <Menu.Item as={Link} to='/days' onClick={this.handleButtonClick}>
                                        <Icon name='calendar' />
                                        Days
                            </Menu.Item>
                                    <Menu.Item as={Link} to='/chart' onClick={this.handleButtonClick}>
                                        <Icon name='chart pie' />Chart
                            </Menu.Item>
                                </Sidebar>

                                <Sidebar.Pusher dimmed={visible}>
                                    <AppViews />
                                </Sidebar.Pusher>
                            </Sidebar.Pushable>
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

{/* { sessionStorage.key("credentials") !== null &&
<Navbar />
} */}
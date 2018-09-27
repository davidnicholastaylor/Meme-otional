import React, { Component } from 'react'
import DaysChart from "./DaysChart"
import { Button, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import "./moodChart.css"

export default class MoodCharts extends Component {

    // Create a variable to hold a filter function
    // filter the days to return the equal of days.moodId to differnt ids of moods 
    // do .length of the variable and set it to state
    radDays = () => {
        let activeUser = JSON.parse(sessionStorage.getItem("credentials"))
        const radArray = this.props.days.filter(day =>
            day.moodId === 1 && activeUser.id === day.userId
        )
        return radArray.length
    }
    tiredDays = () => {
        let activeUser = JSON.parse(sessionStorage.getItem("credentials"))
        const tiredArray = this.props.days.filter(day =>
            day.moodId === 2 && activeUser.id === day.userId
        )
        return tiredArray.length
    }
    sadDays = () => {
        let activeUser = JSON.parse(sessionStorage.getItem("credentials"))
        const sadArray = this.props.days.filter(day =>
            day.moodId === 3 && activeUser.id === day.userId
        )
        return sadArray.length
    }
    stressedDays = () => {
        let activeUser = JSON.parse(sessionStorage.getItem("credentials"))
        const stressedArray = this.props.days.filter(day =>
            day.moodId === 4 && activeUser.id === day.userId
        )
        return stressedArray.length
    }

    state = {
        Rad: this.radDays(),
        Tired: this.tiredDays(),
        Sad: this.sadDays(),
        Stressed: this.stressedDays(),
        visible: false,
        logout: false
    }

    getData = () => {
        let newArray = [];
        newArray.push(this.state.Rad);
        newArray.push(this.state.Tired);
        newArray.push(this.state.Sad);
        newArray.push(this.state.Stressed);
        return newArray;
    };

    handleButtonClick = () => this.setState({ visible: !this.state.visible })

    handleSidebarHide = () => this.setState({ visible: false })

    logoutUser = () => {
        this.setState({ logout: true })
        sessionStorage.removeItem("credentials")
    }

    render() {
        const { visible } = this.state

        return (
            <React.Fragment>
                {this.state.logout === false &&
                    <div>
                        {sessionStorage.key("credentials") !== null &&
                            <div>
                                <Button color="violet" circular icon="sidebar" onClick={this.handleButtonClick} />
                                <Button color="violet" as={Link} to='' floated="right" circular onClick={this.logoutUser}>Logout</Button>
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
                                <div className="daysChart">
                                    <DaysChart data={this.getData()} />
                                </div>
                            </Sidebar.Pusher>
                        </Sidebar.Pushable>
                    </div>
                }
            </React.Fragment >
        )
    }
}
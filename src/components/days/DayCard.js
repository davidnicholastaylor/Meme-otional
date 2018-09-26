import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import "./day.css"




export default class DayCard extends Component {

    state = {
        visible: false,
        logout: false
    }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })

    handleSidebarHide = () => this.setState({ visible: false })

    logoutUser = () => {
        this.setState({ logout: true })
        sessionStorage.removeItem("credentials")
    }

    getCurrentMood = (id) => {
        const currentMood = this.props.moods.find(mood =>
            mood.id === id
        )
        return currentMood
    }
    moodDisplay = (id) => {
        return this.getCurrentMood(id).rating
    }

    labelDisplay = (id) => {
        return this.getCurrentMood(id).desc
    }

    render() {
        const { visible } = this.state
        let activeUser = JSON.parse(sessionStorage.getItem("credentials"))

        return (
            <React.Fragment>
                {this.state.logout === false &&
                    <div>
                        {sessionStorage.key("credentials") !== null &&
                            <div>
                                <Button circular icon="sidebar" onClick={this.handleButtonClick} />
                                <Button as={Link} to='/login' floated="right" circular onClick={this.logoutUser}>Logout</Button>
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


                                <div className="dayTitle">
                                    <h2>
                                        Hello, {activeUser.username}
                                    </h2>
                                </div>
                                <div className="dayButton">
                                    <Button compact size="big" color="violet"
                                        onClick={() => {
                                            this.props.history.push("/days/new")
                                        }}>
                                        How do you feel?
                                    </Button>
                                </div>
                                {
                                    this.props.days.map(day =>
                                        <section key={day.id} className="day">
                                            <div className="card">
                                                {activeUser.id === day.userId &&
                                                    <div className="card-body">
                                                        <h4 className="labelDisplay">{this.labelDisplay(day.moodId)}</h4>

                                                        <img className="rating-display" alt="rating" src={this.moodDisplay(day.moodId)} />
                                                        <h5>
                                                            {day.date}
                                                        </h5>
                                                        <p>
                                                            {day.description}
                                                        </p>
                                                        <Button compact size="big" floated="right" circular icon="edit outline"
                                                            onClick={() =>
                                                                this.props.history.push(`/days/edit/${day.id}`)
                                                            } />
                                                        <Button compact size="big" floated="right" circular icon="trash alternate outline"
                                                            onClick={() =>
                                                                this.props.deleteDay(day.id, "days")
                                                            } />
                                                    </div>
                                                }
                                            </div>
                                        </section>
                                    )
                                }
                            </Sidebar.Pusher>
                        </Sidebar.Pushable>
                    </div>
                }
            </React.Fragment>
        )
    }
}
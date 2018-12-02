import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Login from './Login'
import Register from './Register'
import DataManager from './data/DataManager'
import "./AppViews.css"

import DayCard from "./days/DayCard"
import DayForm from "./days/DayForm"
import DayEdit from "./days/DayEdit"

import MoodCharts from "./moods/MoodCharts"




export default class AppViews extends Component {


    isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    state = {
        users: [],
        days: [],
        moods: []
    }

    addUser = (user, link) => DataManager.post(user, link)
    .then(users => this.setState({
        users: users
    }))

    addDay = (day, link) => DataManager.post(day, link)
        .then(days => this.setState({
            days: days
        }))
    editDay = (day, id, link) => DataManager.patch(day, id, link)
        .then(days => this.setState({
            days: days
        }))
    deleteDay = (id, link) => DataManager.removeAndList(id, link)
        .then(days => this.setState({
            days: days
        }))





    componentDidMount() {
        const _state = {}
        DataManager.getAll("days").then(days => _state.days = days)
            .then(() => DataManager.getUserData("users").then(users => _state.users = users))
            .then(() => DataManager.getAll("moods").then(moods => _state.moods = moods))
            .then(() => {this.setState(_state)})
    }


    render() {
        return (
            <React.Fragment>
                <div className="viewArea">

                    <Route path="" render={(props) => {
                        return <Login {...props}
                        addUser={this.addUser}
                        users={this.state.users}/>
                    }} />

                    <Route path="/register" render={(props) => {
                        return <Register {...props}
                            addUser={this.addUser}
                            users={this.state.users} />
                    }} />

                    <Route exact path="/days" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <DayCard {...props}
                                users={this.state.users} 
                                days={this.state.days}
                                moods={this.state.moods}
                                deleteDay={this.deleteDay} />
                        } else {
                            return <Redirect to="" />
                        }
                    }} />

                    <Route exact path="/chart" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <MoodCharts {...props}
                                users={this.state.users} 
                                days={this.state.days}
                                moods={this.state.moods} />
                        } else {
                            return <Redirect to="" />
                        }
                    }} />

                    <Route exact path="/days/new" render={(props) => {
                        return <DayForm {...props}
                            addDay={this.addDay}
                            moods={this.state.moods} />
                    }} />
                    <Route path="/days/edit/:dayId(\d+)" render={(props) => {
                        return <DayEdit {...props}
                            editDay={this.editDay}
                            days={this.state.days}
                            moods={this.state.moods} />
                    }} />

                </div>
            </React.Fragment>
        )
    }

}
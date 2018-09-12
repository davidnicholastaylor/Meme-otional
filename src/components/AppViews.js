import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Login from './Login'
import Register from './Register'
import DataManager from './data/DataManager'
import "./AppViews.css"

import DayCard from "./days/DayCard"
import DayForm from "./days/DayForm"
import DayEdit from "./days/DayEdit"




export default class AppViews extends Component {


    isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    state = {
        users: [],
        days: []
    }

    addUser = (user, link) => DataManager.post(user, link)
    .then(users => this.setState({
        users: users
    }))


    addDay = (day, link) => DataManager.post(day, link)
        .then(days => this.setState({
            days: days
        }))
    editDay = (day, id, link) => DataManager.put(day, id, link)
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
            .then(() => DataManager.get("users").then(users => _state.users = users))
            .then(() => {this.setState(_state)})
    }


    render() {
        return (
            <React.Fragment>
                <div className="viewArea">

                    <Route path="/login" render={(props) => {
                        return <Login {...props}
                           />
                    }} />

                    <Route path="/register" render={(props) => {
                        return <Register {...props}
                            addUser={this.addUser} />
                    }} />

                    <Route exact path="/days" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <DayCard {...props}
                                users={this.state.users} 
                                days={this.state.days}
                                deleteDay={this.deleteDay} />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }} />

                    <Route exact path="/days/new" render={(props) => {
                        return <DayForm {...props}
                            addDay={this.addDay} />
                    }} />
                    <Route path="/days/edit/:dayId(\d+)" render={(props) => {
                        return <DayEdit {...props}
                            editDay={this.editDay}
                            days={this.state.days} />
                    }} />

                </div>
            </React.Fragment>
        )
    }

}
import React, { Component } from 'react'
import "./day.css"
// import { Link } from "react-router-dom"



export default class DayDisplay extends Component {

    // getUsername = day => {
    //     let user = this.props.users.find(user => {
    //         return user.id === day.userId
    //     })
    //     return user.inputEmail
    // }
    render() {
        return (
            <React.Fragment>
                <div className="dayButton">
                    <button type="button"
                        onClick={() => {
                            this.props.history.push("/days/new")
                        }}>
                        Add day
                    </button>
                </div>
                <section className="day">
                    {
                        this.props.days.map(day =>
                            <div key={day.id} className="card">
                                <div className="card-body">
                                    {/* {this.getUsername(day)} */}
                                    <h5 className="card-title">
                                        {day.date}
                                    </h5>
                                    <p>
                                        {day.rating}
                                        {day.description}
                                    </p>
                                    <div className="card-link">
                                        <button type="button" className="separate-link"
                                            onClick={() => {
                                                this.props.history.push(`/days/edit/${day.id}`)
                                            }}>
                                            Edit day
                                      </button>
                                        <button
                                            onClick={() => this.props.deleteDay(day.id, "days")} className="separate-link"
                                        >Delete day</button>
                                    </div>

                                </div>
                            </div>
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}
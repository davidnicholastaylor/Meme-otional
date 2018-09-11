import React, { Component } from 'react'
import "./day.css"
// import { Link } from "react-router-dom"



export default class DayDisplay extends Component {

    getUsername = day => {
        let user = this.props.users.find(user => {
            return user.id === day.userId
        })
        return user.inputUsername
    }
    render() {
        return (
            <React.Fragment>
                {this.props.days.map(day => 
                <h2> Hello, {this.getUsername(day)}</h2>
                )}
                <div className="dayButton">
                    <button type="button"
                        onClick={() => {
                            this.props.history.push("/days/new")
                        }}>
                        How was your day?
                    </button>
                </div>
                <section className="day">
                    {
                        this.props.days.map(day =>
                            <div key={day.id} className="card">
                                <div className="card-body">
                                       <h3 className="card-title"> {day.rating} </h3>
                                    <h5>
                                        {day.date}
                                    </h5>
                                    <p>
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
import React, { Component } from 'react'
import "./day.css"
// import { Link } from "react-router-dom"


export default class DayDisplay extends Component {

    render() {
        let activeUser = JSON.parse(sessionStorage.getItem("credentials"))

        return (
            <React.Fragment>
                <div className="dayTitle">
                    <h2>
                        Hello, {activeUser.username}
                    </h2>
                </div>
                <div className="dayButton">
                    <button type="button"
                        onClick={() => {
                            this.props.history.push("/days/new")
                        }}>
                        How do you feel?
                    </button>
                </div>
                {
                    this.props.days.map(day =>
                        <section key={day.id} className="day">
                            <div className="card">
                                {activeUser.id === day.userId &&
                                    <div className="card-body">
                                        <img className="card-title" src={day.rating}/>
                                        <h5>
                                            {day.date}
                                        </h5>
                                        <p>
                                            {day.description}
                                        </p>
                                        <div className="card-link">
                                            <button type="button"
                                                onClick={() =>
                                                    this.props.history.push(`/days/edit/${day.id}`)}
                                                className="separate-link">Edit day
                                        </button>
                                            <button
                                                onClick={() =>
                                                    this.props.deleteDay(day.id, "days")}
                                                className="separate-link">Delete day
                                        </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </section>
                    )
                }
            </React.Fragment>
        )
    }
}
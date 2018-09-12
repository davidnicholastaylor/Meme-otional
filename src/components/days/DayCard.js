import React, { Component } from 'react'
import "./day.css"
// import { Link } from "react-router-dom"


export default class DayDisplay extends Component {

    render() {
        let user = JSON.parse(sessionStorage.getItem("credentials"))
        let today = new Date,
        date = ((today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear())

        return (
            <React.Fragment>
                <div className="dayTitle">
                        <h2> 
                        Hello, {user.username}
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
                <section className="day">
                    {
                        this.props.days.map(day =>
                            <div key={day.id} className="card">
                                <div className="card-body">
                                    <h3
                                        className="card-title"> {day.rating}
                                    </h3>
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
                            </div>
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}
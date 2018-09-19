import React, { Component } from 'react'
import "./day.css"



export default class DayCard extends Component {
    getCurrentMood = (id) => {
        const currentMood = this.props.moods.find(mood =>
            mood.id === id
        )
        return currentMood
    }
    moodDisplay = (id) => {
        return this.getCurrentMood(id).rating
    }
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
                                        <h4>{day.moodLabel}</h4>

                                        <img className="rating-display" alt="rating" src={this.moodDisplay(day.moodId)} />
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
                                                className="separate-link">Edit mood
                                        </button>
                                            <button
                                                onClick={() =>
                                                    this.props.deleteDay(day.id, "days")}
                                                className="separate-link">Delete mood
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
import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
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
                    <Button color="violet"
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
                                        <h4>{day.moodLabel}</h4>

                                        <img className="rating-display" alt="rating" src={this.moodDisplay(day.moodId)} />
                                        <h5>
                                            {day.date}
                                        </h5>
                                        <p>
                                            {day.description}
                                        </p>
                                            <Button floated="right" circular icon="edit outline"
                                                onClick={() =>
                                                    this.props.history.push(`/days/edit/${day.id}`)
                                                    }/>
                                            <Button floated="right" circular icon="trash alternate outline"
                                                onClick={() =>
                                                    this.props.deleteDay(day.id, "days")
                                                }/>
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